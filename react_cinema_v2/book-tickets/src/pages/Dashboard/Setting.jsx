import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { useGetAllMovieSettings } from "../../features/DashboardSettings/useGetAllMovieSettings";
import Loader from "../../components/Loader";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import ModelDashBoard from "../../components/ModelDashBoard";
import { useForm } from "react-hook-form";
import { useGetAllMovieByDate } from "../../features/DashboardSettings/useGetAllMovieByDate";
import { changeDateToString } from "../../fetchApi/gerne/getAll";
import { useAddMovieSeting } from "../../features/DashboardSettings/useAddMovieSetting";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useDeleteMovieSetting } from "../../features/DashboardSettings/useDeleteMovieSetting";
import ModelConfirm from "../../components/ModelConfirm";
const Settings = () => {
  const [isAddNow, setIsAddNow] = useState(true);
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [idSettingMovieDelete, setIdSettingMovieDelete] = useState(null);
  const [isOpenModelConfirm, setIsOpenModelConfirm] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },

    reset,
  } = useForm();

  const {
    isLoading: isLoadingNow,
    isError: isErrorNow,
    data: dataNow,
  } = useGetAllMovieSettings("now");

  const {
    isLoading: isLoadingComing,
    isError: isErrorComing,
    data: dataComing,
  } = useGetAllMovieSettings("coming");

  const {
    isLoading: isLoadingMovieByDate,
    isError: isErrorMovieByDate,
    data: movieByDate,
  } = useGetAllMovieByDate();

  const { isLoadingAdd, isErrorAdd, handleAddMovieSetting } =
    useAddMovieSeting();

  const { isLoadingDelete, isErrorDelete, handleDeleteMovieSetting } =
    useDeleteMovieSetting();

  const onSubmit = (data) => {
    const dataInsert = { ...data, type: isAddNow ? "now" : "coming" };

    handleAddMovieSetting(dataInsert, {
      onSuccess: () => {
        toast.success("Add success");
        handleCloseModel();
        queryClient.invalidateQueries({
          queryKey: ["movie_settings"],
        });
      },
    });
  };

  const handleCloseModel = () => {
    reset();
    setIsOpenModel(false);
  };

  const handleOpenModelAdd = (type) => {
    if (type === "now") {
      setIsAddNow(true);
    } else {
      setIsAddNow(false);
    }
    setIsOpenModel(true);
  };

  const handleOpenModelConfirm = (id) => {
    setIsOpenModelConfirm(true);
    setIdSettingMovieDelete(id);
  };

  const onDeleteScreenById = () => {
    handleDeleteMovieSetting(idSettingMovieDelete, {
      onSuccess: () => {
        toast.success("Delete success");
        queryClient.invalidateQueries({ queryKey: ["movie_settings"] });
        setIsOpenModelConfirm(false);
      },
    });
    console.log(idSettingMovieDelete);
  };

  return (
    <div className="text-white w-full grid grid-cols-2 gap-5 overflow-y-auto">
      {isOpenModelConfirm && (
        <ModelConfirm
          text={"Are you sure want to delete this cinema?"}
          heading={"Delete Confirmation"}
          onClose={() => setIsOpenModelConfirm(false)}
          onSubmit={onDeleteScreenById}
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
            {(isErrorMovieByDate || isErrorAdd) && (
              <p className="py-3 rounded-lg bg-red-600/70 text-white text-center ">
                Some thing went wrong
              </p>
            )}
            {isLoadingMovieByDate ? (
              <div className="flex-1 text-center">
                <Loader size={60} color="blue" />
              </div>
            ) : (
              <div className="grid grid-cols-12">
                <label className="col-span-4 font-semibold text-slate-900/90">
                  Province:
                </label>

                <select
                  defaultValue={
                    isAddNow
                      ? movieByDate?.arrayMovieNow[0]?.id
                      : movieByDate?.arrayMovieComing[0]?.id
                  }
                  // disabled={editShowTime}
                  id="select_genre_movie"
                  {...register("movie_id", {
                    required: "Movie is required",
                  })}
                  // onChange={handleChangeProvinceId}
                  className={`${
                    errors.movie_id ? "border-red-500" : "border-slate-600/30 "
                  } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
                >
                  {isAddNow
                    ? movieByDate?.arrayMovieNow.map((cur) => (
                        <option
                          className="checked:bg-blue-600"
                          key={cur.id}
                          value={cur.id}
                        >
                          {cur.title}
                        </option>
                      ))
                    : movieByDate?.arrayMovieComing.map((cur) => (
                        <option
                          className="checked:bg-blue-600"
                          key={cur.id}
                          value={cur.id}
                        >
                          {cur.title}
                        </option>
                      ))}
                </select>
                {errors.movie_id && (
                  <>
                    <div className="col-span-4"></div>
                    <p className="text-red-600 italic text-sm col-span-8">
                      {" "}
                      {errors.movie_id.message}
                    </p>
                  </>
                )}
              </div>
            )}

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
                {isLoadingAdd && <Loader size={30} />}
                Add movie {isAddNow ? "now" : "coming"}
                {/* {" "}
                {editGerne ? "Edit genre" : "Add new genre"} */}
              </button>
            </div>
          </form>
        </ModelDashBoard>
      )}
      <div className="col-span-1 flex flex-col gap-3">
        <p className="text-xl font-semibold">Now</p>
        {isErrorNow && (
          <p className="text-center w-full bg-red-500 rounded-xl text-xl py-2">
            Wrong went get data
          </p>
        )}

        <table className="table w-full">
          <thead>
            <tr className="bg-slate-600/40  rounded-lg text-left">
              <th className="py-3 font-medium">Name</th>
              <th className="py-3 font-medium">Create At</th>
              <th className="py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoadingNow ? (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  <Loader size={120} />
                </td>
              </tr>
            ) : (
              Array.from({ length: 4 }).map((_, index) => {
                if (index < dataNow?.count) {
                  return (
                    <tr key={index}>
                      <td className="pr-2 py-3">
                        {dataNow.featured_movies[index].movies.title}
                      </td>
                      <td className="pr-2 py-3">
                        {changeDateToString(
                          dataNow.featured_movies[index].created_at
                        )}
                      </td>
                      <td className="">
                        <button
                          onClick={() =>
                            handleOpenModelConfirm(
                              dataNow.featured_movies[index].id
                            )
                          }
                          className="bg-red-600 p-1 rounded-lg"
                        >
                          <MdDeleteOutline />
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={index}>
                      <td className="pr-2 py-3">---</td>
                      <td className="pr-2 py-3">---</td>
                      <td className="">
                        <button
                          onClick={() => handleOpenModelAdd("now")}
                          className="bg-blue-600 p-1 rounded-lg"
                        >
                          <FaPlus />
                        </button>
                      </td>
                    </tr>
                  );
                }
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="col-span-1 ">
        <div className="col-span-1 flex flex-col gap-3">
          <p className="text-xl font-semibold">Coming soon</p>
          {isErrorComing && (
            <p className="text-center w-full bg-red-500 rounded-xl text-xl py-2">
              Wrong went get data
            </p>
          )}
          <table className="table w-full">
            <thead>
              <tr className="bg-slate-600/40  rounded-lg text-left">
                <th className="py-3 font-medium">Name</th>
                <th className="py-3 font-medium">Create At</th>
                <th className="py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {isLoadingComing ? (
                <tr>
                  <td colSpan={4} className="text-center py-10">
                    <Loader size={120} />
                  </td>
                </tr>
              ) : (
                Array.from({ length: 4 }).map((_, index) => {
                  if (index < dataComing?.count) {
                    return (
                      <tr key={index}>
                        <td className="pr-2 py-3">
                          {dataComing.featured_movies[index].movies.title}
                        </td>
                        <td className="pr-2 py-3">
                          {changeDateToString(
                            dataComing.featured_movies[index].created_at
                          )}
                        </td>
                        <td className="">
                          <button
                            onClick={() =>
                              handleOpenModelConfirm(
                                dataComing.featured_movies[index].id
                              )
                            }
                            className="bg-red-600 p-1 rounded-lg"
                          >
                            <MdDeleteOutline />
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr key={index}>
                        <td className="pr-2 py-3">---</td>
                        <td className="pr-2 py-3">---</td>
                        <td className="">
                          <button
                            onClick={() => handleOpenModelAdd("coming")}
                            className="bg-blue-600 p-1 rounded-lg"
                          >
                            <FaPlus />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Settings;
