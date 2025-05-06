import { shortenEthereumAddress } from "../../../utils/generateToken";
import Loader from "../../components/Loader";
import Pagination from "../../components/Pagination";
import { useGetAllDataPayment } from "../../features/blockchain/useGetAllDataPayment";

const PayByBlockChain = () => {
  const { isLoading, isError, data } = useGetAllDataPayment();

  console.log(data);
  return (
    <div className="text-white w-full flex flex-col gap-5 overflow-y-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Payments</h1>
      </div>
      <div className="w-full h-[300px] overflow-y-auto">
        {isError && (
          <p className="w-full rounded-xl py-3 text-center bg-red-600/60 text-white">
            Some thing went wrong!
          </p>
        )}
        <table className="table-auto w-full h-[300px] overflow-y-auto">
          <thead className="">
            <tr className="bg-slate-600/40  rounded-lg text-left">
              <th className="py-3 font-medium">Movie</th>
              <th className="py-3 font-medium">Cinema</th>
              <th className="py-3 font-medium">From</th>
              <th className="py-3 font-medium">Seat</th>
              <th className="py-3 font-medium">Time</th>
              <th className="py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody className="h-[300px] overflow-y-auto">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="text-center py-10">
                  <Loader size={120} />
                </td>
              </tr>
            ) : (
              data?.map((payment) => (
                <tr key={payment.id}>
                  <td className="pr-2 py-3">{payment["nameCinema"]}</td>
                  <td>{payment["nameCinema"]}</td>
                  <td>{shortenEthereumAddress(payment["from"])}</td>
                  <td>{payment["numChair"]}</td>
                  <td>{payment["time"]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayByBlockChain;
