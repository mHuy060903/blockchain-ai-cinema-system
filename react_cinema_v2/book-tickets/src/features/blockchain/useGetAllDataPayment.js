import { useQuery } from "@tanstack/react-query";

import { getAllDataPayment } from "../../fetchApi/blockchain/getAllDataPayment";
import abi from "../../contractJson/chai.json";
import { ethers } from "ethers";
export const useGetAllDataPayment = () => {
  let contractGlobal;
  const contractAddress = "0x9Fb436559323f8289667981Bc1A7Facf2F4cfE96";
  const contractABI = abi.abi;

  const { ethereum } = window;

  const provider = new ethers.providers.Web3Provider(ethereum); //read the Blockchain
  const signer = provider.getSigner(); // write the blockchain

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  contractGlobal = contract;

  const { isLoading, isError, data } = useQuery({
    queryFn: () => getAllDataPayment(contractGlobal),
    queryKey: ["payment_blockchain"],
  });

  return { isLoading, isError, data };
};
