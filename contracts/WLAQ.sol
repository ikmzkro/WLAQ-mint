// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import {MerkleProof} from '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';

contract WLAQ is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    bytes32 public merkleRoot;

    // デプロイ時に計算結果のマークルルートをデプロイする
    constructor(bytes32 merkleRoot_) ERC721('Zutto Mayonakade Iinoni', 'ZTMY') {
        merkleRoot = merkleRoot_;
    }

    function mint(uint256 quantity, bytes32[] calldata merkleProof) public {
        bytes32 node = keccak256(abi.encodePacked(msg.sender, quantity));
        require(MerkleProof.verify(merkleProof, merkleRoot, node), 'invalid proof');

        for (uint256 i = 0; i < quantity; i++) {
            uint256 tokenId = _tokenIds.current();
            _mint(msg.sender, tokenId);

            _tokenIds.increment();
        }
    }

    function setMerkleRoot(bytes32 _merkleRoot) public onlyOwner {
        merkleRoot = _merkleRoot;
    }

    function getMerkleRoot() external view returns (bytes32) {
        return merkleRoot;
    }
}
