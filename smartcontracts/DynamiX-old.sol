// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DynamiX is ERC721, Ownable {
    struct PlayerStats {
        string name;
        string team;
        string nationality;
        string position;
        uint goals;
        uint worldcupwon;
        uint matchesplayed;
    }

    // Mappings to store player data and token URIs
    mapping(uint256 => PlayerStats) public playerData;
    mapping(uint256 => string) private _tokenURIs;

    event StatsUpdated(uint256 indexed tokenId, uint goals, uint worldcupwon, uint matchesplayed);

    constructor(address initialOwner) ERC721("DynamiX", "DYMX") Ownable(initialOwner) {
    }

    // Mint function for creating a new NFT
    function mintNFT(
        address to,
        uint256 tokenId,
        string memory name,
        string memory team,
        string memory nationality,
        string memory position,
        uint goals,
        uint worldcupwon,
        uint matchesplayed,
        string memory _tokenURI
    ) public onlyOwner {
        _safeMint(to, tokenId);
        playerData[tokenId] = PlayerStats(name, team, nationality, position, goals, worldcupwon, matchesplayed);
        _setTokenURI(tokenId, _tokenURI);
    }

    // Update function for changing player stats dynamically
    function updatePlayerStats(
        uint256 tokenId,
        uint goals,
        uint worldcupwon,
        uint matchesplayed
    ) public onlyOwner {
        require(_ownerOf(tokenId) != address(0), "Token does not exist"); // Check if token exists
        playerData[tokenId].goals = goals;
        playerData[tokenId].worldcupwon = worldcupwon;
        playerData[tokenId].matchesplayed = matchesplayed;
        emit StatsUpdated(tokenId, goals, worldcupwon, matchesplayed);
    }

    // Override the tokenURI function to fetch the stored token URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist"); // Ensure the token exists
        return _tokenURIs[tokenId];
    }

    // Internal function to set token URI
    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        _tokenURIs[tokenId] = uri;
    }
}