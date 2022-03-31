import { converWeiToEth } from "./tokenConversionService";

export const getProjectDetails = async (contract, projectIndex) => {
  try{
    const project = await contract.methods.getProjectDetails(projectIndex).call();
    const currentContractBalance = await contract.methods.getProjectBalance();
    const {name, link, description, unit, valueRequired} = project;
    return {
      name, 
      link, 
      description,
      unit,
      valueRequired,
      currentBalance: converWeiToEth(currentContractBalance)
    }
  }
  catch(err){
    console.log(err);
  }
}