
## Introduction
This is the github repo for my blog post: *Understand Merkle tree by making an NFT minting whitelist*. Read it [here](https://peterblockman.hashnode.dev/understand-merkle-tree-by-making-an-nft-minting-whitelist)

You can reuse the code in your project. Simplified codes that I use in the article:  [feat/simple](https://github.com/peterblockman/merkle-tree-nft-whitelist/tree/feat/simple)

## Quick start 
```shell
npm i
npx hardhat test
```

## Test
1. Clone this repository: `git@github.com:ikmzkRo/whitelist-address-quantity-mint.git`
2. Install packages: `yarn`
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