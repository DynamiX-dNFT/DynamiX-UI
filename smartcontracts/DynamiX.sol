// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DynamiX is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct PlayerStats {
        string name;
        string team;
        string nationality;
        string position;
        uint256 goals;
        uint256 worldcupwon;
        uint256 matchesplayed;
    }

    // Mappings to store player data and token URIs
    mapping(uint256 => PlayerStats) public playerData;
    mapping(uint256 => string) private _tokenURIs;

    event StatsUpdated(uint256 indexed tokenId, uint256 goals, uint256 worldcupwon, uint256 matchesplayed);

    constructor(address initialOwner) ERC721("DynamiX", "DYMX") Ownable(initialOwner) {}

    // Mint function for creating a new NFT
    function mintNFT(
        address to,
        string memory name,
        string memory team,
        string memory nationality,
        string memory position,
        uint256 goals,
        uint256 worldcupwon,
        uint256 matchesplayed,
        string memory metadataURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(to, newTokenId);
        playerData[newTokenId] = PlayerStats(name, team, nationality, position, goals, worldcupwon, matchesplayed);
        _setTokenURI(newTokenId, metadataURI);

        return newTokenId;
    }

    // Update function for changing player stats dynamically
    function updatePlayerStats(
        uint256 tokenId,
        uint256 goals,
        uint256 worldcupwon,
        uint256 matchesplayed
    ) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        
        PlayerStats storage stats = playerData[tokenId];
        stats.goals = goals;
        stats.worldcupwon = worldcupwon;
        stats.matchesplayed = matchesplayed;
        
        emit StatsUpdated(tokenId, goals, worldcupwon, matchesplayed);
    }

    // Override the tokenURI function to fetch the stored token URI
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        return _tokenURIs[tokenId];
    }

    // Internal function to set token URI
    function _setTokenURI(uint256 tokenId, string memory uri) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        
        _tokenURIs[tokenId] = uri;
    }

    // Function to check if a token exists
    function _exists(uint256 tokenId) internal view returns (bool) {
        return ownerOf(tokenId) != address(0);
    }

    // Function to get player data
    function getPlayerData(uint256 tokenId) public view returns (PlayerStats memory) {
        require(_exists(tokenId), "Token does not exist");
        
        return playerData[tokenId];
    }

    // Function to update metadata URI (in case you need to update the off-chain metadata)
    function updateMetadataURI(uint256 tokenId, string memory newURI) public onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        
        _setTokenURI(tokenId, newURI);
    }
}