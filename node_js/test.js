const BigNumber = require('bignumber.js');
const Web3 = require("web3");
const bn = BigNumber(10000000000000000000000000).toFixed();


var arb = {
    assetA: 'USDT' ,
    venueA: 'oneinch',
    assetB: 'N/A',
    venueB: 'oneinch',
    amount: BigNumber(5000).shiftedBy(6),
    expected_return: 'N/A',
    datetime: 'N/A'
};

function change_arb_assetB(_arb, _assetB){
    var arb = {..._arb};
    arb.assetB = _assetB;
    return arb;
}

var arbs = [
  change_arb_assetB(arb, 'USDC'),
  change_arb_assetB(arb, 'DAI'),
  change_arb_assetB(arb, 'WETH'),
  change_arb_assetB(arb, 'PAX'),
  change_arb_assetB(arb, 'OMG'),
  change_arb_assetB(arb, 'ONG'),
 ];

console.log(arbs);
