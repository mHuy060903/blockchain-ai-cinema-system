export const getAllDataPayment = async (contract) => {
  console.log("contract: " + contract);
  if (!contract) return [];
  const arrBlockchain = await contract.getTickets();

  return arrBlockchain ?? [];
};
