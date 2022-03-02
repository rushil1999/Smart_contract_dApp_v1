import Web3 from 'web3';
export const requestAccount = async () => {
  console.log('Running Meta Mask');
  // var userAccount;
  let provider = window.ethereum;
  if(typeof provider !== 'undefined'){
    try{
      console.log(provider);
      const userAccount = await window.ethereum.request({method:'eth_requestAccounts'})
      const web3 = new Web3(provider);
      return {userAccount, web3};
    }
    catch(err){
      console.log(err);
    }
    // provider
    //   .request({method:'eth_requestAccounts'})
    //   .then((account)=>{
    //     console.log('Accounts', account);
    //     userAccount = account;
    //     const web3 = new Web3(provider);
    //     return (userAccount, web3);
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   });
  }
}