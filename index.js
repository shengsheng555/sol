const Web3 = require("web3");

const web3 = new Web3('http://localhost:8545');

// You can then use the unlocked account by directly reading it from your web3 instance like this:

// async function get_account(){
    const ganacheAccounts = web3.eth.getAccounts()
    .then(console.log);
    // const myWalletAddress = ganacheAccounts[0];
//     return myWalletAddress
// }
