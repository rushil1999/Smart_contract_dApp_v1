import {requestAccount} from '../utils/eWallet';

export const payProject = async (contract, index, unit) => {
  try{
    const userAccount = await requestAccount();
    console.log(userAccount, contract, unit, index);
    const transactionResponse = await contract.methods.donate(index, unit).send({from: userAccount[0], value: 1000});
    console.log(transactionResponse);
  }
  catch(e){
    console.log('In service', e);
  }
}