import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { useState } from "react";
import ModelDashBoard from "../../components/ModelDashBoard";
import { useForm } from "react-hook-form";
import InputDashboard from "../../components/InputDashboard";
import { useGetAllSeatTypes } from "../../features/DashboardSeatTypes/useGetAllSeatTypes";
import { useAddSeatTypes } from "../../features/DashboardSeatTypes/useAddSeatTypes";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { colors, formatCurrency } from "../../../utils/constant";
import { useDeleteSeatTypes } from "../../features/DashboardSeatTypes/useDeleteSeatTypes";
import { useDuplicateSeatTypes } from "../../features/DashboardSeatTypes/useDuplicateSeatTypes";
import ModelConfirm from "../../components/ModelConfirm";
import { useEditSeatTypes } from "../../features/DashboardSeatTypes/useEditSeatTypes";
import SortBy from "../../components/SortBy";
import Pagination from "../../components/Pagination";

const SeatTypes = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpenModelConfirm, setIsOpenModelConfirm] = useState(false);
  const [idDeleteSeatType, setIdDeleteSeatType] = useState(0);
  const [editSeatType, setEditSeatType] = useState(null);

  const queryClient = useQueryClient();

  const { isLoadingGetAll, isErrorGetAll, data } = useGetAllSeatTypes();
  const { isLoadingAdd, isErrorAdd, handleAddSeatTypes } = useAddSeatTypes();
  const { isLoadingDelete, isErrorDelete, handleDeleteSeatTypes } =
    useDeleteSeatTypes();

  const { isLoadingDuplicate, isErrorDuplicate, handleDuplicateSeatTypes } =
    useDuplicateSeatTypes();

  const { isLoadingEdit, isErrorEdit, handleEditSeatTypes } =
    useEditSeatTypes();

  const handleCloseModel = () => {
    setEditSeatType(null);
    setIsOpenModel(false);
    reset();
  };

  const handleOpenModelAdd = () => {
    setIsOpenModel(true);
  };

  const handleOpenModelEdit = (seat) => {
    setEditSeatType(seat);
    setValue("type_name", seat.type_name);
    setValue("price", seat.price);
    setValue("color", seat.color);
    setIsOpenModel(true);
  };

  const onOpenModelConfirmDelete = (id) => {
    setIdDeleteSeatType(id);
    setIsOpenModelConfirm(true);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (editSeatType) {
      return handleEditSeatTypes(
        { ...data, id: editSeatType.id },
        {
          onSuccess: () => {
            toast.success("Edit success");
            reset();
            handleCloseModel();
            queryClient.invalidateQueries({ queryKey: ["seat_types"] });
          },
        }
      );
    }

    handleAddSeatTypes(data, {
      onSuccess: () => {
        toast.success("Add success");
        reset();
        handleCloseModel();
        queryClient.invalidateQueries({ queryKey: ["seat_types"] });
      },
    });
  };

  const onDeleteSeatTypeById = () => {
    handleDeleteSeatTypes(idDeleteSeatType, {
      onSuccess: () => {
        toast.success("Delete success");
        setIdDeleteSeatType(0);
        queryClient.invalidateQueries({ queryKey: ["seat_types"] });
        setIsOpenModelConfirm(false);
      },
    });
  };

  const onDuplicateSeatType = (id) => {
    handleDuplicateSeatTypes(id, {
      onSuccess: () => {
        toast.success("Duplicate success");
        queryClient.invalidateQueries({ queryKey: ["seat_types"] });
      },
    });
  };

  return (
    <div className="text-white w-full flex flex-col gap-5 overflow-y-auto">
      {isOpenModelConfirm && (
        <ModelConfirm
          text={"Are you sure want to delete this seat type?"}
          heading={"Delete Confirmation"}
          onClose={() => setIsOpenModelConfirm(false)}
          onSubmit={onDeleteSeatTypeById}
          isLoading={isLoadingDelete}
          isError={isErrorDelete}
        />
      )}
      {isOpenModel && (
        <ModelDashBoard onClose={handleCloseModel}>
          {(isErrorAdd || isErrorEdit) && (
            <p className="w-full py-3 rounded-lg bg-red-500 text-white">
              Somethings went wrong
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-black p-4 w-[800px]"
          >
            <InputDashboard
              title="name"
              register={{
                ...register("type_name", { required: "Type name is required" }),
              }}
              error={errors.type_name}
            />
            <InputDashboard
              title="price"
              type="number"
              register={{
                ...register("price", { required: "Price is required" }),
              }}
              error={errors.price}
            />
            <div className="grid grid-cols-12">
              <label className="col-span-4 font-semibold text-slate-900/90">
                Movie:
              </label>

              <select
                id="select_genre_movie"
                {...register("color", {
                  required: "Color is required",
                })}
                onChange={() => {}}
                className={`${
                  errors.province_id ? "border-red-500" : "border-slate-600/30 "
                } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
              >
                {colors.map((cur, index) => (
                  <option
                    className="checked:bg-blue-600"
                    key={cur.hex}
                    value={cur.hex}
                  >
                    {cur.name}
                  </option>
                ))}
              </select>
              {errors.color && (
                <>
                  <div className="col-span-4"></div>
                  <p className="text-red-600 italic text-sm col-span-8">
                    {" "}
                    {errors.color.message}
                  </p>
                </>
              )}
            </div>
            <div className="flex w-full items-center justify-end gap-3">
              <button
                onClick={handleCloseModel}
                className="border-[1px] border-slate-300 shadow-sm rounded-lg font-medium text-slate-800/90  px-4 py-2"
              >
                Cancel
              </button>
              <button className="items-center flex gap-1 border-[1px] rounded-lg font-medium bg-blue-800/90 text-white px-4 py-2">
                {(isLoadingAdd || isLoadingEdit) && <Loader size={20} />}{" "}
                {editSeatType ? "Edit type seat" : "  Add new type seat"}
              </button>
            </div>
          </form>
        </ModelDashBoard>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Seat Types</h1>
        <SortBy
          options={[
            { value: "price-asc", label: "Sort by price (low first)" },
            { value: "price-desc", label: "Sort by price (high  first)" },
          ]}
        />
      </div>
      <div className="w-full">
        {isErrorGetAll && (
          <p className="w-full rounded-xl py-3 text-center bg-red-600/60 text-white">
            Some thing went wrong!
          </p>
        )}
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-slate-600/40  rounded-lg text-left">
              <th className="py-3 font-medium">Id</th>
              <th className="py-3 font-medium">Name type</th>
              <th className="py-3 font-medium">Price</th>
              <th className="py-3 font-medium">Color</th>
              <th className="py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoadingGetAll ? (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  <Loader size={120} />
                </td>
              </tr>
            ) : data?.seat_types.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  No data this table
                </td>
              </tr>
            ) : (
              data?.seat_types.map((seat) => (
                <tr key={seat.id}>
                  <td className="pr-2 py-3">{seat.id}</td>
                  <td>{seat.type_name}</td>
                  <td>{`${formatCurrency(seat.price)} vnđ`}</td>
                  <td>
                    <div
                      style={{ backgroundColor: seat.color }}
                      className={`w-8 h-4  `}
                    ></div>
                  </td>

                  <td className="">
                    <button
                      onClick={() => onDuplicateSeatType(seat.id)}
                      className="bg-blue-600 p-1 rounded-lg"
                    >
                      <HiOutlineDuplicate />
                    </button>
                    <button
                      onClick={() => handleOpenModelEdit(seat)}
                      className="bg-yellow-600 p-1 rounded-lg"
                    >
                      <CiEdit />
                    </button>

                    <button
                      onClick={() => onOpenModelConfirmDelete(seat.id)}
                      className="bg-red-600 p-1 rounded-lg"
                    >
                      <MdDeleteOutline />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Pagination count={data?.count} />
        <button
          onClick={handleOpenModelAdd}
          className="w-full mt-6 hover:bg-blue-600 transition-all duration-300 py-4 bg-blue-400 rounded-xl font-semibold"
        >
          Add new
        </button>
      </div>
    </div>
  );
};

export default SeatTypes;
