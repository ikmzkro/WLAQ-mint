
## Introduction

## Quick start
1. Clone this repository: `git clone git@github.com:ikmzkRo/WLAQ-mint.gitt`
2. Install packages: `npm i` or `yarn`
3. Add `.env` file
```
PRIVATE_KEY = ""
ALCHEMY_API_KEY = ""
ETHERSCAN_API_KEY = ""
COINMARKETCAP_API_KEY = ""
REPORT_GAS = "true"
```
4. Compile solidity code: `yarn run compile`
```
yarn run v1.22.21
$ hardhat compile
Nothing to compile
Done in 0.78s.
```
5. Debug testcode: `yarn run test test/IkmzERC721WLAQ.test.ts`
```
yarn run v1.22.21
$ hardhat test


  WLAQ
    Deployment
inputs [
  {
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    quantity: 1
  },
  {
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    quantity: 2
  },
  {
    address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    quantity: 1
  }
]
leaves {
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': '0x3f68e79174daf15b50e15833babc8eb7743e730bb9606f922c48e95314c3905c',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC': '0xd0583fe73ce94e513e73539afcb4db4c1ed1834a418c3f0ef2d5cff7c8bb1dee',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906': '0xb783e75c6c50486379cdb997f72be5bb2b6faae5b2251999cae874bc1b040af7'
}
leavesValue [
  '0x3f68e79174daf15b50e15833babc8eb7743e730bb9606f922c48e95314c3905c',
  '0xd0583fe73ce94e513e73539afcb4db4c1ed1834a418c3f0ef2d5cff7c8bb1dee',
  '0xb783e75c6c50486379cdb997f72be5bb2b6faae5b2251999cae874bc1b040af7'
]
      ✔ Should return correct name and symbol
    setMerkleRoot check
      ✔ [S] Should set the Merkle Root correctly by Contract deployer
The initial Merkle root at the time of contract deployment undefined
inputs [
  {
    address: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
    quantity: 1
  },
  {
    address: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
    quantity: 2
  },
  {
    address: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
    quantity: 3
  },
  {
    address: '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
    quantity: 4
  }
]
leaves {
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': '0x3f68e79174daf15b50e15833babc8eb7743e730bb9606f922c48e95314c3905c',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC': '0xd0583fe73ce94e513e73539afcb4db4c1ed1834a418c3f0ef2d5cff7c8bb1dee',
  '0x90F79bf6EB2c4f870365E785982E1f101E93b906': '0x8d1187a2c5d69d9d0f6e6c8baf49c9549b9573585daef9b8634509e0cb8d99ae',
  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc': '0x9995999b4cf3fbeb689e3cc965ed87e72ff5cb0c750b5e16639e60ac50a9bdd4'
}
leavesValue [
  '0x3f68e79174daf15b50e15833babc8eb7743e730bb9606f922c48e95314c3905c',
  '0xd0583fe73ce94e513e73539afcb4db4c1ed1834a418c3f0ef2d5cff7c8bb1dee',
  '0x8d1187a2c5d69d9d0f6e6c8baf49c9549b9573585daef9b8634509e0cb8d99ae',
  '0x9995999b4cf3fbeb689e3cc965ed87e72ff5cb0c750b5e16639e60ac50a9bdd4'
]
      ✔ [R] Should not allow setting Merkle Root by Owner
      ✔ [R] Should not allow setting Merkle Root by notOwner
    mint
      ✔ Should allow whitelisted users to mint
      ✔ Should revert when users try to mint over allowed quantity
      ✔ Should revert when non-whitelisted users try to mint
```
6. Deploy contracts code: `npx hardhat run scripts/deploy/ikmzERC721WLAQ.ts --network goerli`
7. Verify contracts code: `npx hardhat verify --network goerli ${6.CA}`

## Success Code
- https://dev.to/peterblockman/understand-merkle-tree-by-making-a-nft-minting-whitelist-1148#step-4--verify-users--address-and-quantity
- https://github.com/peterblockman/merkle-tree-nft-whitelist/tree/feat/simple

## Ref List
| Ref | Title |
| ---- | ---- |
| https://github.com/OpenZeppelin/merkle-tree | OpenZeppelin/merkle-tree |
| https://zenn.dev/sakuracase/articles/4f58609f3da6e8 | ゼロ知識でふんわり理解するマークルツリー |
| https://zenn.dev/mizuneko4345/articles/f0b7efe1eedd28 | Pythonで作るマークルツリー |
| https://zenn.dev/microverse_dev/articles/how-to-allowlist-mint | AllowList を用いた NFT の mint |
| https://zenn.dev/ryo_takahashi/scraps/ff70f43eb45856#comment-40095f6a46ae37 | META KAWAII 🍭 を支える技術 |
| https://zenn.dev/serinuntius/articles/35c1b6a042174e847766?redirected=1 | Uniswapが1200ものアドレスにトークン配布した方法が賢すぎるのでメモ |
| https://zenn.dev/serinuntius/articles/f56b3dc2871a03?redirected=1 | zkRollupの回路内で計算してること |
| https://zenn.dev/no_plan/articles/581be4ad731a79#merkle-proof%E3%82%92%E7%94%A8%E6%84%8F%E3%81%99%E3%82%8B | NFTを用いたCTFを開催したので問題作成者が解説してみる |
| https://zenn.dev/0xywzx/articles/bdb6c991f3fc8b | ZKP（zkSNARKs）の使い方と活用事例 |
|  |  |
|  |  |
|  |  |
|  |  |
|  |  |