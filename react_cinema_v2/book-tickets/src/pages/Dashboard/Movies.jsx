import { CiEdit } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";

import ModelDashBoard from "../../components/ModelDashBoard";
import { useState } from "react";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { useGetNameGerne } from "../../features/DashboardMovie/useGetNameGerne";
import InputDashboard from "../../components/InputDashboard";
import { useAddMovie } from "../../features/DashboardMovie/useAddMovie";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { useGetAllMovie } from "../../features/DashboardMovie/useGetAllMovie";
import { useQueryClient } from "@tanstack/react-query";
import { changeDateToString } from "../../fetchApi/gerne/getAll";
import { useEditMovie } from "../../features/DashboardMovie/useEditMovie";
import ModelConfirm from "../../components/ModelConfirm";
import { useDeleteMovie } from "../../features/DashboardMovie/useDeleteMovie";
import { useDulicateMovie } from "../../features/DashboardMovie/useDuplicateMovie";
import Pagination from "../../components/Pagination";
const Movies = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpenModelConfirm, setIsOpenModelConfirm] = useState(false);
  const queryClient = useQueryClient();
  const [editMovie, setEditMovie] = useState(null);
  const [idMovieDelete, setIdMovieDelete] = useState(null);
  const {
    isLoading: isLoadingGenre,
    isError: isErrorGenre,
    data,
  } = useGetNameGerne();

  const {
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    handleAddMovie,
  } = useAddMovie();

  const { isLoadingEdit, isErrorUpdate, handleEditMovie } = useEditMovie();

  const {
    isLoading: isLoadingGetAll,
    isError: isErrorGetAll,
    data: movies,
  } = useGetAllMovie();

  const { isLoadingDelete, isErrorDelete, handleDeleteMovie } =
    useDeleteMovie();

  const { isErrorDuplicate, handleDuplicateMovie } = useDulicateMovie();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,

    setValue,
  } = useForm();

  const handleCloseModel = () => {
    setIsOpenModel(false);
    reset();
    setEditMovie(null);
  };

  const handleOpenModel = () => {
    setIsOpenModel(true);
  };

  const handleOpenModelEdit = (movie) => {
    console.log(movie.genreId);
    setValue("title", movie.title);
    setValue("description", movie.description);
    setValue("duration", movie.duration);
    // const date = new Date(movie.release_date);
    // const formattedDate = date.toISOString().slice(0, 16);
    // console.log(formattedDate);
    // console.log(movie.release_date);
    setValue("release_date", movie.release_date);
    setValue("actor", movie.actor);
    setValue("director", movie.director);
    setValue(
      "genre",
      movie.genreId.map((cur) => cur.toString())
    );
    setEditMovie(movie);

    handleOpenModel();
  };

  const onSubmit = (data) => {
    if (editMovie) {
      return handleEditMovie(
        { id: editMovie.id, path: editMovie.image, ...data },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["movies"] });
            toast.success("Update Success");
            handleCloseModel();
          },
        }
      );
    }
    handleAddMovie(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        handleCloseModel();
        toast.success("Add movie success");
      },
    });
  };

  const onDeleteMovieById = () => {
    if (!idMovieDelete) {
      return;
    }
    handleDeleteMovie(idMovieDelete, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        setIsOpenModelConfirm(false);
        setIdMovieDelete(null);
        toast.success("Delete success");
      },
    });
  };

  const onDuplicateMovieById = (movie) => {
    handleDuplicateMovie(movie, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movies"] });
        toast.success("Duplicate success");
      },
    });
  };

  const openModelConfirm = (id) => {
    setIdMovieDelete(id);
    setIsOpenModelConfirm(true);
  };

  return (
    <div className="text-white w-full flex flex-col gap-5 overflow-y-auto">
      {isOpenModelConfirm && (
        <ModelConfirm
          text={"Are you sure want to delete this movie?"}
          heading={"Delete Confirmation"}
          onClose={() => setIsOpenModelConfirm(false)}
          onSubmit={onDeleteMovieById}
          isLoading={isLoadingDelete}
          isError={isErrorDelete}
        />
      )}
      {isOpenModel && (
        <ModelDashBoard onClose={handleCloseModel}>
          {(isErrorAdd || isErrorUpdate) && (
            <p className="w-full py-3 rounded-lg bg-red-500 text-white">
              Some thing went wrong upload
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-black p-4 w-[800px]"
          >
            <InputDashboard
              title="title"
              register={{
                ...register("title", { required: "Title is required" }),
              }}
              error={errors.title}
            />
            <div className="grid grid-cols-12">
              <label className="col-span-4 font-semibold text-slate-900/90">
                Description:
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className={`${
                  errors.description ? "border-red-500" : "border-slate-600/30 "
                } col-span-8 outline-none border-[1px]  py-1 px-1`}
              />
              {errors.description && (
                <>
                  <div className="col-span-4"></div>
                  <p className="text-red-600 italic text-sm col-span-8">
                    {" "}
                    {errors.description.message}
                  </p>
                </>
              )}
            </div>
            <div className="grid grid-cols-12">
              <label className="col-span-4 font-semibold text-slate-900/90">
                Genre:
              </label>
              {/* <input className="col-span-8 outline-none border-[1px] border-slate-600/30 py-1 px-1" /> */}
              <select
                multiple
                id="select_genre_movie"
                {...register("genre", { required: "Genre is required" })}
                className={`${
                  errors.genre ? "border-red-500" : "border-slate-600/30 "
                } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
              >
                {data?.gernes.map((cur) => (
                  <option
                    className="checked:bg-blue-600"
                    key={cur.id}
                    value={cur.id}
                  >
                    {cur.name}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <>
                  <div className="col-span-4"></div>
                  <p className="text-red-600 italic text-sm col-span-8">
                    {" "}
                    {errors.genre.message}
                  </p>
                </>
              )}
            </div>
            <InputDashboard
              title="duration"
              type="number"
              register={{
                ...register("duration", {
                  required: "Duration is required",
                  validate: (data) => data > 0 || "Duration is great than 0",
                }),
              }}
              error={errors.duration}
            />
            <InputDashboard
              title="actor"
              type="text"
              register={{
                ...register("actor", {
                  required: "Actor is required",
                  minLength: {
                    value: 10,
                    message: "Actor greater than 10 character",
                  },
                }),
              }}
              error={errors.duration}
            />
            <InputDashboard
              type="date"
              title="date"
              register={{
                ...register("release_date", {
                  required: "Date is required",
                  validate: (data) =>
                    editMovie ||
                    new Date(data).getTime() > new Date().getTime() + 1 ||
                    "Date is great than today",
                }),
              }}
              error={errors.release_date}
            />
            <InputDashboard
              title="director"
              register={{
                ...register("director", { required: "Director is required" }),
              }}
              error={errors.director}
            />

            <InputDashboard
              type="file"
              title="image"
              register={{
                ...register("image", {
                  required: editMovie ? false : "Image is required",
                }),
              }}
              error={errors.image}
            />
            <div className="flex w-full items-center justify-end gap-3">
              <button
                onClick={handleCloseModel}
                className="border-[1px] border-slate-300 shadow-sm rounded-lg font-medium text-slate-800/90  px-4 py-2"
              >
                Cancel
              </button>
              <button className="items-center flex gap-1 border-[1px] rounded-lg font-medium bg-blue-800/90 text-white px-4 py-2">
                {(isLoadingAdd || isLoadingEdit) && <Loader size={20} />}{" "}
                {editMovie ? "Edit movie" : "Add new movie"}
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
        {(isErrorGetAll || isErrorGenre || isErrorDuplicate) && (
          <p className="w-full rounded-xl py-3 text-center bg-red-600/60 text-white">
            Some thing went wrong!
          </p>
        )}
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-slate-600/40  rounded-lg text-left">
              <th className="py-3 font-medium"></th>
              <th className="py-3 font-medium">Title</th>
              <th className="py-3 font-medium">Description</th>
              <th className="py-3 font-medium">Genre</th>
              <th className="py-3 font-medium">Duration</th>
              <th className="py-3 font-medium">Release Date</th>
              <th className="py-3 font-medium">Director</th>
              <th className="py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoadingGetAll || isLoadingGenre ? (
              <tr>
                <td colSpan={8} className="text-center py-10">
                  <Loader size={120} />
                </td>
              </tr>
            ) : (
              movies?.movies.map((cur) => (
                <tr key={cur.id}>
                  <td className="w-[50px] pr-2 py-3">
                    <img className=" object-cover" src={cur.image} />
                  </td>
                  <td className="">
                    <p className="w-[100px] truncate">{cur.title}</p>
                  </td>
                  <td>
                    <p className="w-[150px] truncate">{cur.description}</p>
                  </td>
                  <td className="">
                    <p className="w-[100px] truncate">{cur.genre.join(" ,")}</p>
                  </td>
                  <td>{cur.duration} mins</td>
                  <td>{changeDateToString(cur.release_date).slice(0, -9)}</td>
                  <td>{cur.director}</td>
                  <td className="">
                    <button
                      onClick={() => onDuplicateMovieById(cur)}
                      className="bg-blue-600 p-1 rounded-lg"
                    >
                      <HiOutlineDuplicate />
                    </button>
                    <button
                      onClick={() => handleOpenModelEdit(cur)}
                      className="bg-yellow-600 p-1 rounded-lg"
                    >
                      <CiEdit />
                    </button>

                    <button
                      onClick={() => openModelConfirm(cur.id)}
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

        <Pagination count={movies?.count} />
        <button
          onClick={() => handleOpenModel()}
          className="w-full mt-6 hover:bg-blue-600 transition-all duration-300 py-4 bg-blue-400 rounded-xl font-semibold"
        >
          Add Movie
        </button>
      </div>
    </div>
  );
};

export default Movies;
