const BigNumber = require('bignumber.js');
const Web3 = require("web3");
const bn = BigNumber(10000000000000000000000000).toFixed();



const assetBaseAmount = {
    USDT: BigNumber(1).shiftedBy(6),
    USDC: BigNumber(1).shiftedBy(6),
    DAI:  BigNumber(1).shiftedBy(18),
    WETH: BigNumber(1).shiftedBy(18)
}


a = 'USDC';
console.log(assetBaseAmount[a]);
