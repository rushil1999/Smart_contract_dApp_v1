import {requestAccount} from '../utils/eWallet';

export const payProject = async (contract, index, amount, userAccount) => {
  try{
    console.log(userAccount, contract,amount,  index);
    const transactionResponse = await contract.methods.donate(index, "eth").send({from: userAccount[0], value: amount});
    console.log(transactionResponse);
    return{
      success: true,
      transactionResponse
    }
  }
  catch(err){
    console.log('In service', err);
    return{
      success: false,
      message: "Project Payment Service Error",
      err
    }
  }
}