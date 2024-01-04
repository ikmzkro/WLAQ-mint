import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { makeMerkleTree } from '../utils/merkletree';
import { makeUsers, usersQuantity } from '../utils/data';

// https://github.com/peterblockman/merkle-tree-nft-whitelist/tree/feat/simple
// https://dev.to/peterblockman/understand-merkle-tree-by-making-a-nft-minting-whitelist-1148#step-4--verify-users--address-and-quantity

describe('WLAQ', function () {
  async function createTestFixture() {
    const merkleTreeData = await makeMerkleTree();
    const users = await makeUsers();
    const { root } = merkleTreeData;

    const WLAQ = await ethers.getContractFactory(
      'WLAQ'
    );
    const wLAQ = await WLAQ.deploy(root);

    return { wLAQ, merkleTreeData, users };
  }
  beforeEach(async function () {
    const { wLAQ, users, merkleTreeData } = await loadFixture(
      createTestFixture
    );
    this.wLAQ = wLAQ;
    this.users = users;
    this.merkleTreeData = merkleTreeData;
  });

  describe('Deployment', function () {
    it('Should return correct name and symbol', async function () {
      expect(await this.wLAQ.name()).to.equal(
        'Zutto Mayonakade Iinoni'
      );
      expect(await this.wLAQ.symbol()).to.equal('ZTMY');
    });
  });

  // TODO: setMerkleRoot, getMerkleRoot, onlyOwner
  // https://github.com/ikmzkRo/whitelist-address-quantity-mint/blob/main/test/IkmzERC721WLAQ.test.ts
  describe("setMerkleRoot check", () => {
    it("[S] Should set the Merkle Root correctly by Contract deployer", async function () {
      // Verify if the Merkle Root is set correctly
      const { root } = this.merkleTreeData;
      console.log('root', root);
      expect(await this.wLAQ.getMerkleRoot()).to.equal(root);
    });

    it("[R] Should not allow setting Merkle Root by Owner", async function () {
      // Attempt to set the Merkle Root by a notOwner
      const { root } = this.merkleTreeData;
      // If the root value changes during operation

      // const res1 = await this.wLAQ.getMerkleRoot()
      // console.log('res1', res1);

      await
        this.wLAQ
          .connect(this.users.owner)
          .setMerkleRoot(root)

      // const res2 = await this.wLAQ.getMerkleRoot()
      // console.log('res2', res2);
      expect(await this.wLAQ.getMerkleRoot()).to.equal(root);
    });

    it("[R] Should not allow setting Merkle Root by notOwner", async function () {
      // Attempt to set the Merkle Root by a notOwner
      const { root } = this.merkleTreeData;
      await expect(
        this.wLAQ
          .connect(this.users.alice)
          .setMerkleRoot(root)
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe('mint', function () {
    beforeEach(async function () {
      await this.wLAQ
        .connect(this.users.alice)
        .mint(
          usersQuantity.alice,
          this.merkleTreeData.proofs[await this.users.alice.getAddress()]
        );

      await this.wLAQ
        .connect(this.users.bob)
        .mint(
          usersQuantity.bob,
          this.merkleTreeData.proofs[await this.users.bob.getAddress()]
        );
    });

    it('Should allow whitelisted users to mint', async function () {
      const aliceBalance = await this.wLAQ.balanceOf(
        await this.users.alice.getAddress()
      );

      expect(aliceBalance).to.equal(1);

      const bobBalance = await this.wLAQ.balanceOf(
        await this.users.bob.getAddress()
      );

      expect(bobBalance).to.equal(2);
    });

    it('Should revert when users try to mint over allowed quantity', async function () {
      try {
        await this.wLAQ
          .connect(this.users.alice)
          .mint(
            2,
            this.merkleTreeData.proofs[await this.users.alice.getAddress()]
          );
      } catch (error: any) {
        expect(error.message).to.contains('invalid proof');
      }
    });

    it('Should revert when non-whitelisted users try to mint', async function () {
      try {
        await this.wLAQ.connect(this.users.david).mint(
          1,
          // david stole alice proofs
          this.merkleTreeData.proofs[await this.users.alice.getAddress()]
        );
      } catch (error: any) {
        expect(error.message).to.contains('invalid proof');
      }
    });
  });
});
