import { useState } from "react";
import ModelDashBoard from "../../components/ModelDashBoard";

import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { useQueryClient } from "@tanstack/react-query";
import { changeDateToString } from "../../fetchApi/gerne/getAll";
import Loader from "../../components/Loader";

import { toast } from "react-toastify";

import ModelConfirm from "../../components/ModelConfirm";

import { useGetAllGerne } from "../../features/DashboardGerne/useGetAllGerne";
import { useAddGerne } from "../../features/DashboardGerne/useAddGerne";
import { useDeleteGerne } from "../../features/DashboardGerne/useDeleteGerne";
import { useUpdateGerne } from "../../features/DashboardGerne/useUpdateGerne";
import { useDuplicateGerne } from "../../features/DashboardGerne/useDuplicateGerne";

import Pagination from "../../components/Pagination";
const Genre = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpenModelConfirm, setIsOpenModelConfirm] = useState(false);
  const [editGerne, setEditGerne] = useState(null);
  const [isDeleteId, setIsDeleteId] = useState(null);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, data } = useGetAllGerne();

  const { isErrorAdd, isLoadingAdd, handleAddNewGenre } = useAddGerne();
  const { isErrorDelete, isLoadingDelete, handleDeleteGerne } =
    useDeleteGerne();
  const { isErrorUpdate, isLoadingUpdate, handleUpdateGenre } =
    useUpdateGerne();

  const { handleDuplicateGerne } = useDuplicateGerne();

  const handleOpenEdit = (gerneEdit) => {
    setValue("name", gerneEdit.name);
    setEditGerne(gerneEdit);
    handleOpenModel();
  };

  const onSubmit = (data) => {
    if (editGerne) {
      handleUpdateGenre(
        { ...editGerne, name: data.name },
        {
          onSuccess: () => {
            toast.success("Update success");
            handleCloseModel();
            queryClient.invalidateQueries({ queryKey: ["genres"] });
          },
        }
      );
      return reset();
    }
    handleAddNewGenre(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["genres"] });
        toast.success("Add success");
        reset();
        handleCloseModel();
      },
    });
  };

  const handleCloseModel = () => {
    setIsOpenModel(false);
    setEditGerne(null);
    reset();
  };

  const handleOpenModel = () => {
    setIsOpenModel(true);
  };

  const handleDelteGerne = (id) => {
    setIsOpenModelConfirm(true);
    setIsDeleteId(id);
  };

  const onDeleteGerneById = () => {
    handleDeleteGerne(isDeleteId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["genres"] });
        toast.success("Delete success");
        setIsOpenModelConfirm(false);
      },
    });
  };

  const onDuplicateGerneById = (id) => {
    handleDuplicateGerne(id, {
      onSuccess: () => {
        toast.success("Duplicate success");
        queryClient.invalidateQueries({ queryKey: ["genres"] });
      },
    });
  };

  return (
    <div className="text-white w-full flex flex-col gap-5 overflow-y-auto">
      {isOpenModelConfirm && (
        <ModelConfirm
          text={"Are you sure want to delete this gerne?"}
          heading={"Delete Confirmation"}
          onClose={() => setIsOpenModelConfirm(false)}
          onSubmit={onDeleteGerneById}
          isLoading={isLoadingDelete}
          isError={isErrorDelete}
        />
      )}
      {isOpenModel && (
        <ModelDashBoard onClose={handleCloseModel}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-black p-4 w-[800px]"
          >
            {(isErrorAdd || isErrorUpdate) && (
              <p className="py-3 rounded-lg bg-red-600/70 text-white text-center ">
                Some thing went wrong
              </p>
            )}
            <div className="grid grid-cols-12">
              <label className="col-span-4 font-semibold text-slate-900/90">
                Name:
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className={`${
                  errors.name ? "border-red-600" : "border-slate-600/30"
                } col-span-8 outline-none border-[1px]  py-1 px-1`}
              />
              {errors.name && (
                <>
                  <div className="col-span-4"></div>
                  <p className="text-red-600 italic text-sm col-span-8">
                    {" "}
                    {errors.name.message}
                  </p>
                </>
              )}
            </div>

            <div className="flex w-full items-center justify-end gap-3">
              <button
                onClick={() => handleCloseModel()}
                className="border-[1px] border-slate-300 shadow-sm rounded-lg font-medium text-slate-800/90  px-4 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="border-[1px] rounded-lg font-medium bg-blue-800/90 text-white px-4 py-2 flex items-center gap-4"
              >
                {(isLoadingAdd || isLoadingUpdate) && <Loader size={30} />}{" "}
                {editGerne ? "Edit genre" : "Add new genre"}
              </button>
            </div>
          </form>
        </ModelDashBoard>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Movies</h1>
        <span>Filter / Sort</span>
      </div>
      <div className="w-full">
        {isError && (
          <p className="text-center py-3 rounded-lg bg-red-600/60">
            Some thing went wrong!
          </p>
        )}
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-slate-600/40  rounded-lg text-left">
              <th className="py-3 font-medium">Id</th>
              <th className="py-3 font-medium">Name</th>
              <th className="py-3 font-medium">Create At</th>
              <th className="py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  <Loader size={120} />
                </td>
              </tr>
            ) : (
              data?.gernes.map((genre) => (
                <tr key={genre.id}>
                  <td className="pr-2 py-3">{genre.id}</td>
                  <td>{genre.name}</td>
                  <td>{changeDateToString(genre.created_at)}</td>

                  <td className="">
                    <button
                      onClick={() => onDuplicateGerneById(genre.id)}
                      className="bg-blue-600 p-1 rounded-lg"
                    >
                      <HiOutlineDuplicate />
                    </button>
                    <button
                      onClick={() => handleOpenEdit(genre)}
                      className="bg-yellow-600 p-1 rounded-lg"
                    >
                      <CiEdit />
                    </button>

                    <button
                      onClick={() => handleDelteGerne(genre.id)}
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
          onClick={() => handleOpenModel()}
          className="w-full mt-6 hover:bg-blue-600 transition-all duration-300 py-4 bg-blue-400 rounded-xl font-semibold"
        >
          Add Gerne
        </button>
      </div>
    </div>
  );
};

export default Genre;
