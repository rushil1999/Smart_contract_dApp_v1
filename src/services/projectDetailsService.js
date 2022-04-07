import { converWeiToEth } from "./tokenConversionService";

export const getProjectDetails = async (contract, projectIndex) => {
  try{
    const project = await contract.methods.getProjectDetails(projectIndex).call();
    const currentContractBalance = await contract.methods.getProjectBalance(projectIndex).call();
    const {name, link, description, unit, valueRequired} = project;
    return {
      name, 
      link, 
      description,
      unit,
      valueRequired,
      currentBalance: converWeiToEth(currentContractBalance),
      success: true,
    }
  }
  catch(err){
    console.log(err);
    return{
      success: false,
      message: "Project Details Service Error",
      err,
    }
  }
}