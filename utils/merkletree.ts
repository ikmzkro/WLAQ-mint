import { ethers } from 'hardhat';
import keccak256 from 'keccak256';
import { MerkleTree } from 'merkletreejs';
import { makeInputs, usernames, usernamesOperation, usersQuantity, usersQuantityOperation } from './data';

import { Leaves, MerkleTreeData, Input, Inputs, Proofs } from './interfaces';

const makeLeaves = (users: Inputs): Leaves => {
  const leaves = users.reduce((acc: Leaves, x: Input) => {
    const leaf = ethers.utils.solidityKeccak256(
      ['address', 'uint256'],
      [x.address, x.quantity]
    );
    return {
      ...acc,
      [x.address]: leaf,
    };
  }, {} as Leaves);

  return leaves;
};

const makeProofs = (merkleTree: MerkleTree, users: Inputs, leaves: Leaves) => {
  return users.reduce((acc: Proofs, user: Input) => {
    const { address } = user;
    const leaf = leaves[address];
    if (!leaf) throw new Error(`Leaf not found: ${address}`);
    const proof = merkleTree.getHexProof(leaf);
    return {
      ...acc,
      [address]: proof,
    };
  }, {} as Proofs);
};


export const makeMerkleTree = async (flug: string): Promise<MerkleTreeData> => {
  // default or operation
  const inputs = flug === 'default'
    ? await makeInputs(usernames, usersQuantity)
    : await makeInputs(usernamesOperation, usersQuantityOperation);
  console.log('inputs', inputs);

  const leaves = makeLeaves(inputs);
  console.log('leaves', leaves);

  const leavesValue = Object.values(leaves);
  console.log('leavesValue', leavesValue);

  const merkleTree = new MerkleTree(leavesValue, keccak256, { sort: true });

  const root = merkleTree.getHexRoot();

  const proofs = makeProofs(merkleTree, inputs, leaves);

  return {
    root,
    proofs,
  };
};
