export const registerProject = async (contract, project, userAccount) => {
  const {name, description, link, unit, value} = project; 
  try{  
    console.log('In Service', contract, userAccount);
    const transactionResponse = await contract.methods.addNewProject(userAccount, name, description, link, unit, value).send({ from: userAccount });
    console.log(transactionResponse);
    return transactionResponse;
  }
  catch(err){
    console.log('Error', err);
  }
}