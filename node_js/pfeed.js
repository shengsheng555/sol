const BigNumber = require('bignumber.js');
const Web3 = require("web3");
const {PerformanceObserver, performance} = require('perf_hooks');

const web3 = new Web3('https://mainnet.infura.io/v3/ed07e65b44354a48aa1f5547369fb513');
// const web3 = new Web3('https://cloudflare-eth.com');

/// mainnet addresses
const addresses = {
    // wallet address
    'wallet':                  '0xC0DcE374F9aC0607B432Be0b3439c5Dc84c8f985',

    // token
    'WETH':                    '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    'DAI':                     '0x6b175474e89094c44da98b954eedeac495271d0f',
    'USDT':                    '0xdac17f958d2ee523a2206206994597c13d831ec7',
    'LINK':                    '0x514910771af9ca656af840dff83e8264ecf986ca',
    'USDC':                    '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    'PAX':                     '0x8e870d67f660d95d5be530380d0ec0bd388289e1',
    'ZB':                      '0xbd0793332e9fb844a52a205a233ef27a5b34b927',
    'VEN':                     '0xd850942ef8811f2a866692a623011bde52a462c1',
    'BNB':                     '0xB8c77482e45F1F44dE1745F52C74426C631bDD52',
    'STROJ':                   '0xb64ef51c888972c908cfacf59b47c1afbc0ab8ac',
    'OKB':                     '0x75231f58b43240c9718dd58b4967c5114342a86c',
    'TUSD':                    '0x0000000000085d4780B73119b644AE5ecd22b376',
    'HT':                      '0x6f259637dcd74c767781e37bc6133cd6a68aa161',
    'ZIL':                     '0x05f4a42e251f2d52b8ed15e9fedaacfcef1fad27',
    'OMG':                     '0xd26114cd6EE289AccF82350c8d8487fedB8A0C07',
    'ONG':                     '0x8207c1ffc5b6804f6024322ccf34f29c3541ae26',
    'BUSD':                    '0x4fabb145d64652a948d72533023f6e7a623c7c53',
    'IOST':                    '0xfa1a856cfa3409cfa145fa4e20eb270df3eb21ab',
    'KNC':                     '0xdd974d5c2e2928dea5f71b9825b8b646686bd200',
    'BAT':                     '0x0d8775f648430679a709e98d2b0cb6250d2887ef',
    'LAMB':                    '0x8971f9fd7196e5cee2c1032b50f656855af7dd26',
    'ZRX':                     '0xe41d2489571d322189246dafa5ebde1f4699f498',

    // venue interface
    'KyberNetworkProxy':     '0x818E6FECD516Ecc3849DAf6845e3EC868087B755',
    'OneSplitAudit':         '0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E',
    'uniswapv2':             '0x0'
}

const abis = {
  // venue interface
  'KyberNetworkProxy'  :

  [{"constant":false,"inputs":[{"name":"alerter","type":"address"}],"name":"removeAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"enabled","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"pendingAdmin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getOperators","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"},{"name":"hint","type":"bytes"}],"name":"tradeWithHint","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToEther","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawToken","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"maxGasPrice","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newAlerter","type":"address"}],"name":"addAlerter","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"kyberNetworkContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"}],"name":"getUserCapInWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapTokenToToken","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claimAdmin","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"token","type":"address"},{"name":"minConversionRate","type":"uint256"}],"name":"swapEtherToToken","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdminQuickly","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAlerters","outputs":[{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"src","type":"address"},{"name":"dest","type":"address"},{"name":"srcQty","type":"uint256"}],"name":"getExpectedRate","outputs":[{"name":"expectedRate","type":"uint256"},{"name":"slippageRate","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"user","type":"address"},{"name":"token","type":"address"}],"name":"getUserCapInTokenWei","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOperator","type":"address"}],"name":"addOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_kyberNetworkContract","type":"address"}],"name":"setKyberNetworkContract","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"operator","type":"address"}],"name":"removeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"field","type":"bytes32"}],"name":"info","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"srcAmount","type":"uint256"},{"name":"dest","type":"address"},{"name":"destAddress","type":"address"},{"name":"maxDestAmount","type":"uint256"},{"name":"minConversionRate","type":"uint256"},{"name":"walletId","type":"address"}],"name":"trade","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"},{"name":"sendTo","type":"address"}],"name":"withdrawEther","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"token","type":"address"},{"name":"user","type":"address"}],"name":"getBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_admin","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"trader","type":"address"},{"indexed":false,"name":"src","type":"address"},{"indexed":false,"name":"dest","type":"address"},{"indexed":false,"name":"actualSrcAmount","type":"uint256"},{"indexed":false,"name":"actualDestAmount","type":"uint256"}],"name":"ExecuteTrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newNetworkContract","type":"address"},{"indexed":false,"name":"oldNetworkContract","type":"address"}],"name":"KyberNetworkSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"token","type":"address"},{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"TokenWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"},{"indexed":false,"name":"sendTo","type":"address"}],"name":"EtherWithdraw","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pendingAdmin","type":"address"}],"name":"TransferAdminPending","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAdmin","type":"address"},{"indexed":false,"name":"previousAdmin","type":"address"}],"name":"AdminClaimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAlerter","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"AlerterAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newOperator","type":"address"},{"indexed":false,"name":"isAdd","type":"bool"}],"name":"OperatorAdded","type":"event"}],

  'OneSplitAudit':

  [{"inputs":[{"internalType":"contract IOneSplit","name":"impl","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"newImpl","type":"address"}],"name":"ImplementationUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_AAVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_BANCOR","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_BDAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CHAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_BINANCE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_SYNTHETIX","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_USDT","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_CURVE_Y","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_FULCRUM","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_IEARN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_KYBER","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_OASIS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_SMART_TOKEN","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_UNISWAP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_DISABLE_WETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_BANCOR_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_OASIS_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_KYBER_UNISWAP_RESERVE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_MULTI_PATH_DAI","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_MULTI_PATH_ETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_MULTI_PATH_USDC","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"FLAG_ENABLE_UNISWAP_COMPOUND","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"asset","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"claimAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"contract IERC20","name":"fromToken","type":"address"},{"internalType":"contract IERC20","name":"toToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"parts","type":"uint256"},{"internalType":"uint256","name":"featureFlags","type":"uint256"}],"name":"getExpectedReturn","outputs":[{"internalType":"uint256","name":"returnAmount","type":"uint256"},{"internalType":"uint256[]","name":"distribution","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"oneSplitImpl","outputs":[{"internalType":"contract IOneSplit","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IOneSplit","name":"impl","type":"address"}],"name":"setNewImpl","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"contract IERC20","name":"fromToken","type":"address"},{"internalType":"contract IERC20","name":"toToken","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"minReturn","type":"uint256"},{"internalType":"uint256[]","name":"distribution","type":"uint256[]"},{"internalType":"uint256","name":"featureFlags","type":"uint256"}],"name":"swap","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}]

}

// const oneSplitABI = require('./abis/onesplit.json');
// const onesplitAddress = "0xC586BeF4a0992C495Cf22e1aeEE4E446CECDee0E"; // 1plit contract address on Main net
//
// const fromToken = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'; // ETHEREUM
// const fromTokenDecimals = 18;
//
// const toToken = '0x6b175474e89094c44da98b954eedeac495271d0f'; // DAI Token
// const toTokenDecimals = 18;
//
// const amountToExchange = 1
//
// const onesplitContract = new web3.eth.Contract(oneSplitABI, onesplitAddress);
//
// const oneSplitDexes = [
//     "Uniswap",
//     "Kyber",
//     "Bancor",
//     "Oasis",
//     "CurveCompound",
//     "CurveUsdt",
//     "CurveY",
//     "Binance",
//     "Synthetix",
//     "UniswapCompound",
//     "UniswapChai",
//     "UniswapAave"
// ]


// onesplitContract.methods.getExpectedReturn(fromToken, toToken, new BigNumber(amountToExchange).shiftedBy(fromTokenDecimals).toString(), 100, 0).call({ from: '0x9759A6Ac90977b93B58547b4A71c78317f391A28' }, function (error, result) {
//     if (error) {
//         console.log(error)
//         return;
//     }
//     console.log("Trade From: " + fromToken)
//     console.log("Trade To: " + toToken);
//     console.log("Trade Amount: " + amountToExchange);
//     console.log(new BigNumber(result.returnAmount).shiftedBy(-fromTokenDecimals).toString());
//     console.log("Using Dexes:");
//     for (let index = 0; index < result.distribution.length; index++) {
//         console.log(oneSplitDexes[index] + ": " + result.distribution[index] + "%");
//     }
// });

async function get_kyber_feed(feed){

    // init contract object
    const contract_addr = addresses.KyberNetworkProxy;
    const abi = abis.KyberNetworkProxy;
    const  ki = new web3.eth.Contract(abi, contract_addr);

    // read contract to get prices
    const src = feed.from_asset_addr;
    const dest = feed.to_asset_addr;
    const srcQty = feed.amount.toFixed();;


    const data = await ki.methods.getExpectedRate(src, dest, srcQty).call();
    const expectedRate = BigNumber(data.expectedRate);
    const slippageRate = BigNumber(data.slippageRate);
    const oneEther = BigNumber('1').shiftedBy(18);
    feed.expected_return = expectedRate.dividedBy(oneEther).times(feed.amount);
    feed.worst_return = slippageRate.dividedBy(oneEther).times(feed.amount);
    feed.datetime = new Date().toLocaleString();

    return feed;
}


async function get_oneinch_feed(feed){

    // init contract object
    const contract_addr = addresses.OneSplitAudit;
    const abi = abis.OneSplitAudit;
    const  onei = new web3.eth.Contract(abi, contract_addr);

    // read contract to get prices
    const fromToken = feed.from_asset_addr;
    const toToken = feed.to_asset_addr;
    const amount = feed.amount.toFixed();
    const parts = 100;
    const featureFlags = 0;

    // var t0 = performance.now();

    const data = await onei.methods.getExpectedReturn
                            (fromToken, toToken, amount, parts, featureFlags).call();
    // var t1 = performance.now();
    // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

    feed.expected_return = BigNumber(data.returnAmount);
    feed.worst_return = 'N/A';
    feed.datetime = new Date().toLocaleString();
    return feed;
}

///get feed of form (venue, from_asset, to_asset, expected_return, worst_return)
async function get_feed(venue, from_asset, to_asset, amount){
    var expected_return, worst_return;
    var feed = {
        venue: venue,
        from_asset: from_asset,
        from_asset_addr: addresses[from_asset],
        to_asset: to_asset,
        to_asset_addr: addresses[to_asset],
        amount: amount
    }

    switch (venue){
        case 'kyber':     feed = await get_kyber_feed(feed);
                          break;
        case 'uniswapv2':
                          break;
        case 'oneinch':   feed = await get_oneinch_feed(feed);
                          break;
        default:          console.log("Unknown");
    }
    // output (venue, from_asset, to_asset, expected_return, worst_return)
    return feed;
}

/// arb: amount assetA -(venueA)-> assetB -(venueB)-> assetA
async function get_arbABA_result(assetA, venueA, assetB, venueB, amount){
    // var t0 = performance.now();

    let feed = await get_feed(venueA, assetA, assetB, amount);
    const outcomeB = feed.expected_return;

    // var t1 = performance.now();
    // console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

    let feed2 = await get_feed(venueB, assetB, assetA, outcomeB);
    const dt = new Date().toLocaleString();
    const arbABA_result = {
        assetA: assetA,
        venueA: venueA,
        assetB: assetB,
        venueB: venueB,
        amount: amount,
        mid_return: outcomeB,
        expected_return: feed2.expected_return,
        datetime: dt
    }

    // output (venue, from_asset, to_asset, expected_return, worst_return)
    return arbABA_result;
}

async function update_arbABA_result(arb){

    let feed = await get_feed(arb.venueA, arb.assetA, arb.assetB, arb.amount);
    const outcomeB = feed.expected_return;
    let feed2 = await get_feed(arb.venueB, arb.assetB, arb.assetA, outcomeB);
    const dt = new Date().toLocaleString();

    arb.mid_return = outcomeB;
    arb.expected_return = feed2.expected_return;
    arb.datetime = dt;
    arb.profit = arb.expected_return.minus(arb.amount)
                    .dividedBy(assetBaseAmount[arb.assetA]);

}

const assetBaseAmount = {
    USDT: BigNumber(1).shiftedBy(6),
    USDC: BigNumber(1).shiftedBy(6),
    DAI:  BigNumber(1).shiftedBy(18),
    WETH: BigNumber(1).shiftedBy(18).times(0.0043)
}

var arb_proto = {
    assetA: 'N/A' ,
    venueA: 'oneinch',
    assetB: 'N/A',
    venueB: 'oneinch',
    amount: 'N/A',// e.g. BigNumber(1000).shiftedBy(6)
    expected_return: 'N/A',
    mid_return: 'N/A',
    datetime: 'N/A',
    profit: 'N/A' // profit in terms of USDT not considering gas
};

function change_arb_amount(_arb, _amount){
    var arb = {..._arb};
    arb.amount = _amount;
    return arb;
}

function change_arb_assetA(_arb, _assetA){
    var arb = {..._arb};
    arb.assetA = _assetA;
    return arb;
}

function change_arb_assetB(_arb, _assetB){
    var arb = {..._arb};
    arb.assetB = _assetB;
    return arb;
}

function get_arbs_cand(){

    const amount_factors = [300, 1000, 3000, 10000, 30000, 100000, 300000];
    const assetAs = ['USDT', 'USDC', 'DAI', 'WETH'];
    const assetBs = [
              'WETH', 'DAI', 'USDT', 'LINK', 'USDC', 'PAX', 'ZB', 'VEN', 'BNB', 'STROJ',
              'OKB', 'TUSD', 'HT', 'ZIL', 'OMG', 'ONG', 'BUSD', 'IOST', 'KNC', 'LAMB', 'ZRX'
          ];
    // must match assetAs

    var arbs =[];
    //generate arbs
    //loop for filling assetA
    for (var i = 0; i < assetAs.length; i++) {
        var arb = arb_proto;
        arb = change_arb_assetA(arb, assetAs[i]);
        //loop for filling amount
        for (var j = 0; j < amount_factors.length; j++) {
            // get start amount based on USDT value for assetA
            var amount = assetBaseAmount[assetAs[i]].times(amount_factors[j]);
            // if (assetAs[i] == 'USDT') {
            //     amount = BigNumber(1).shiftedBy(6).times(amount_factors[j]);
            // } else {
            //     // assume no impact for starting amount
            //     const in_amount = BigNumber(1).shiftedBy(6);
            //     const feed = await get_feed('oneinch', 'USDT', assetAs[i], in_amount);
            //     amount = feed.expected_return.times(amount_factors[j]);
            // }
            arb = change_arb_amount(arb, amount);
            //loop for filling assetB
            for (var k = 0; k < assetBs.length; k++) {
                if (assetAs[i] != assetBs[k]){
                    arb = change_arb_assetB(arb, assetBs[k]);
                    arbs.push(arb);
                }
            }
        }
    }
    return arbs;
}


function main(){

    var arbs = get_arbs_cand();
    console.log(arbs.length, arbs[80]);
    setInterval(function(){
        // var amount = BigNumber(5000).shiftedBy(6);
        var t0 = performance.now();

        var best_arb = arb_proto;
        best_arb.profit = BigNumber(0);
        for (var i = 0; i < arbs.length; i++){
            update_arbABA_result(arbs[i]);
            if (BigNumber.isBigNumber(arbs[i].profit)
                  && arbs[i].profit.gt(best_arb.profit)){
                best_arb = arbs[i];
            }
            // console.log("arb", i, arbs[i].expected_return, arbs[i].mid_return, arbs[i].datetime);
        }
        var t1 = performance.now();
        console.log("Took " + (t1 - t0) + " milliseconds.");
        console.log(best_arb);
        // console.log(arbs[80]);
        // update_arbABA_result(arb1);
        // console.log("arb1", arb1.expected_return);
    }, 5000);
}

main();

// var t0 = performance.now();
//
//
// var t1 = performance.now();
// console.log("Took " + (t1 - t0) + " milliseconds.");
