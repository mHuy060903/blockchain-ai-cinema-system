import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

import { useGetAllProvinceHaveCinema } from "../../features/DashboardShowtime/useGetAllProvinceHaveCinema";
import { useGetAllMovieForShowTime } from "../../features/DashboardShowtime/useGetAllMovieForShowTime";
import { useState } from "react";
import ModelDashBoard from "../../components/ModelDashBoard";
import { useForm } from "react-hook-form";
import Loader from "../../components/Loader";
import InputDashboard from "../../components/InputDashboard";
import RowChairs from "../../components/RowChairs";
import { useAddShowTime } from "../../features/DashboardShowtime/useAddShowTime";
import { useGetAllSeatTypes } from "../../features/DashboardSeatTypes/useGetAllSeatTypes";
import { arrayLetters } from "../../../utils/constant";
import { toast } from "react-toastify";
import { useGetAllShowTime } from "../../features/DashboardShowtime/useGetAllShowTime";
import { useQueryClient } from "@tanstack/react-query";
import { useEditShowTime } from "../../features/DashboardShowtime/useEditShowTime";
import { useDeleteShowTime } from "../../features/DashboardShowtime/useDeleteShowTime";
import ModelConfirm from "../../components/ModelConfirm";
import imageManHinh from "../../assets/images/man-hinh.png";
import Pagination from "../../components/Pagination";
import SortBy from "../../components/SortBy";

const Showtimes = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpenModelConfirm, setIsOpenModelConfirm] = useState(false);

  const [cinemaByProvinceId, setCinemaByProvinceId] = useState(0);
  const [screenByCinemaId, setScreenByCinemaId] = useState(0);
  const [arrayChairByScreenId, setArrayChairByScreenId] = useState(0);

  const [editShowTime, setEditShowTime] = useState(null);
  const [deleteIdShowTime, setDeleteIdShowTime] = useState(0);

  const { isLoadingGetAllPHC, isErrorPHC, provincesHaveCinema } =
    useGetAllProvinceHaveCinema();
  const { isLoadingAllMovieForShowTime, isErrorAllMovieForShowTime, movies } =
    useGetAllMovieForShowTime();

  const {
    isLoadingGetAll: isLoadingGetAllSeatType,
    isErrorGetAll: isErrorGetAllSeatType,
    data: seat_types,
  } = useGetAllSeatTypes();

  const { isLoadingAdd, isErrorAdd, handleAddShowTime, errorAddShowTime } =
    useAddShowTime();
  const { isLoadingGetAll, isErrorGetAll, data } = useGetAllShowTime();
  const { isLoadingEdit, isErrorEdit, handleEditShowTime, errorShowTimeEdit } =
    useEditShowTime();
  const { isLoadingDelete, isErrorDelete, handleDeleteShowTime } =
    useDeleteShowTime();

  const onSubmit = (data) => {
    const [movie, ...arr] = movies.filter(
      (movie) => Number(movie.id) === Number(data.movie_id)
    );

    // const endOfDay = new Date(`${data.show_date} 23:59:59.999`).getTime();

    const minute = movie.duration % 60;
    const hour = (movie.duration - minute) / 60;

    const show_time_end = new Date(`${data.show_date} ${data.show_time_start}`);

    show_time_end.setMinutes(show_time_end.getMinutes() + minute);
    show_time_end.setHours(show_time_end.getHours() + hour);

    // if (show_time_end.getTime() >= endOfDay) {
    //   return toast.error("Time end movie not in next day");
    // }

    const arrayNumRowChair =
      provincesHaveCinema[cinemaByProvinceId].cinemas[screenByCinemaId].screens[
        arrayChairByScreenId
      ].arrayNumRowChair;
    const arraySeatTypes =
      provincesHaveCinema[cinemaByProvinceId].cinemas[screenByCinemaId].screens[
        arrayChairByScreenId
      ].arraySeatTypes;
    const arrTrue = [];

    const status_seat = arrayNumRowChair.map((numChair, index) => {
      const seatType = seat_types.seat_types.find(
        (type) => Number(type.id) === Number(arraySeatTypes[index])
      );
      let indexChair = 0;
      const arr = numChair.map((val, indexArr) => {
        if (val === 1) {
          indexChair += 1;
          const object = {
            name: `${arrayLetters[index]}${indexChair}`,
            price: seatType.price,
            status: "available",
            type: seatType.type_name,
          };
          arrTrue.push(object);
          return object;
        }
        return null;
      });

      return [...arr];
    });

    const { cinema_id, province_id, ...dataNeed } = data;
    const newData = {
      ...dataNeed,
      show_time_end: `${show_time_end.getHours()}:${show_time_end.getMinutes()}`,
      date_end: `${show_time_end.getFullYear()}-${
        show_time_end.getMonth() + 1
      }-${show_time_end.getDate()}`,
      status_seat: arrTrue,
    };

    if (editShowTime) {
      return handleEditShowTime(
        {
          ...newData,
          id: editShowTime.id,
          status_seat: editShowTime.status_seat,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["showtimes"] });
            toast.success("Edit success");
            handleCloseModel();
          },
        }
      );
    }

    handleAddShowTime(newData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["showtimes"] });
        toast.success("Add success");
        handleCloseModel();
      },
    });
  };

  const handleCloseModel = () => {
    setArrayChairByScreenId(0);
    setCinemaByProvinceId(0);
    setScreenByCinemaId(0);
    setIsOpenModel(false);
    reset();
    setEditShowTime(null);
  };

  const handleOpenModel = () => {
    setIsOpenModel(true);
  };

  const handleOpenModelEdit = (showtime) => {
    const indexProvince = provincesHaveCinema.findIndex(
      (cur) => cur.province.id === showtime.screens.provinces.id
    );

    const indexCinema = provincesHaveCinema[indexProvince].cinemas.findIndex(
      (cinema) => cinema.id === showtime.screens.cinemas.id
    );

    const indexScreen = provincesHaveCinema[indexProvince].cinemas[
      indexCinema
    ].screens.findIndex((screen) => screen.id === showtime.screen_id);
    setCinemaByProvinceId(indexProvince);
    setScreenByCinemaId(indexCinema);
    setArrayChairByScreenId(indexScreen);

    setEditShowTime(showtime);
    setValue("movie_id", showtime.movie_id);
    setValue("province_id", showtime.screens.provinces.id);
    setValue("cinema_id", showtime.screens.cinemas.id);
    setValue("screen_id", showtime.screen_id);
    setValue("show_date", showtime.show_date);
    setValue("show_time_start", showtime.show_time_start);
    setIsOpenModel(true);
  };

  const handleChangeProvinceId = (e) => {
    const index = provincesHaveCinema.findIndex(
      (cur) => cur.province.id === Number(e.target.value)
    );
    setCinemaByProvinceId(index);
    setScreenByCinemaId(0);
    setValue("cinema_id", provincesHaveCinema[index].cinemas[0].id);
    setValue("screen_id", provincesHaveCinema[index].cinemas[0].screens[0].id);
  };

  const handleChangeCinemaId = (e) => {
    const index = provincesHaveCinema[cinemaByProvinceId].cinemas.findIndex(
      (cinema) => cinema.id === Number(e.target.value)
    );
    setScreenByCinemaId(index);
    setArrayChairByScreenId(0);
    setValue(
      "screen_id",
      provincesHaveCinema[cinemaByProvinceId].cinemas[index].screens[0]?.id
    );
  };

  const handleChangeScreenId = (e) => {
    const index = provincesHaveCinema[cinemaByProvinceId].cinemas[
      screenByCinemaId
    ].screens.findIndex((screen) => screen.id === Number(e.target.value));
    setArrayChairByScreenId(index);
  };

  const onDeleteScreenById = () => {
    handleDeleteShowTime(deleteIdShowTime, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["showtimes"] });
        toast.success("Delete success");
        setIsOpenModelConfirm(false);
        setDeleteIdShowTime(0);
      },
    });
  };

  const onHandleOpenModelConfirm = (id) => {
    setDeleteIdShowTime(id);
    setIsOpenModelConfirm(true);
  };

  return (
    <div className="text-white w-full flex flex-col gap-5 overflow-y-auto">
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
          {isErrorAdd && (
            <p className="w-full py-3 rounded-lg bg-red-500 text-white my-2 ">
              {errorAddShowTime.message}
            </p>
          )}
          {isErrorEdit && (
            <p className="w-full py-3 rounded-lg bg-red-500 text-white my-2 ">
              {errorShowTimeEdit.message}
            </p>
          )}
          {(isErrorPHC ||
            isErrorAllMovieForShowTime ||
            isErrorGetAllSeatType) && (
            <p className="w-full py-3 rounded-lg bg-red-500 text-white">
              Some thing went wrong upload
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-black p-4 w-[800px]"
          >
            {isLoadingAllMovieForShowTime ||
            isLoadingGetAllPHC ||
            isLoadingGetAllSeatType ? (
              <div className="flex-1 text-center">
                <Loader size={38} color="blue" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-12">
                  <label className="col-span-4 font-semibold text-slate-900/90">
                    Movie:
                  </label>

                  <select
                    id="select_genre_movie"
                    {...register("movie_id", {
                      required: "Movie is required",
                    })}
                    onChange={() => {}}
                    className={`${
                      errors.province_id
                        ? "border-red-500"
                        : "border-slate-600/30 "
                    } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
                  >
                    {movies?.map((cur, index) => (
                      <option
                        selected={index === 0}
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
                        {errors.province_id.message}
                      </p>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-12">
                  <label className="col-span-4 font-semibold text-slate-900/90">
                    Province:
                  </label>

                  <select
                    disabled={editShowTime}
                    id="select_genre_movie"
                    {...register("province_id", {
                      required: "Province is required",
                    })}
                    onChange={handleChangeProvinceId}
                    className={`${
                      errors.province_id
                        ? "border-red-500"
                        : "border-slate-600/30 "
                    } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
                  >
                    {provincesHaveCinema?.map((cur, index) => (
                      <option
                        selected={index === 0}
                        className="checked:bg-blue-600"
                        key={cur.province.id}
                        value={cur.province.id}
                      >
                        {cur.province.name}
                      </option>
                    ))}
                  </select>
                  {errors.province_id && (
                    <>
                      <div className="col-span-4"></div>
                      <p className="text-red-600 italic text-sm col-span-8">
                        {" "}
                        {errors.province_id.message}
                      </p>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-12">
                  <label className="col-span-4 font-semibold text-slate-900/90">
                    Cinema:
                  </label>

                  <select
                    disabled={editShowTime}
                    id="select_genre_movie"
                    {...register("cinema_id", {
                      required: "Cinema is required",
                    })}
                    onChange={handleChangeCinemaId}
                    className={`${
                      errors.province_id
                        ? "border-red-500"
                        : "border-slate-600/30 "
                    } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
                  >
                    {provincesHaveCinema[cinemaByProvinceId]?.cinemas.map(
                      (cur, index) => (
                        <option
                          selected={index === 0}
                          className="checked:bg-blue-600"
                          key={cur.id}
                          value={cur.id}
                        >
                          {cur.name}
                        </option>
                      )
                    )}
                  </select>
                  {errors.movie_id && (
                    <>
                      <div className="col-span-4"></div>
                      <p className="text-red-600 italic text-sm col-span-8">
                        {" "}
                        {errors.province_id.message}
                      </p>
                    </>
                  )}
                </div>
                <div className="grid grid-cols-12">
                  <label className="col-span-4 font-semibold text-slate-900/90">
                    Screen:
                  </label>

                  <select
                    disabled={editShowTime}
                    defaultValue={
                      provincesHaveCinema[cinemaByProvinceId]?.cinemas[
                        screenByCinemaId
                      ]?.screens[0]?.id
                    }
                    id="select_genre_movie"
                    {...register("screen_id", {
                      required: "Screen is required",
                    })}
                    onChange={handleChangeScreenId}
                    className={`${
                      errors.province_id
                        ? "border-red-500"
                        : "border-slate-600/30 "
                    } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
                  >
                    {provincesHaveCinema[cinemaByProvinceId]?.cinemas[
                      screenByCinemaId
                    ]?.screens.length > 0 &&
                      provincesHaveCinema[cinemaByProvinceId]?.cinemas[
                        screenByCinemaId
                      ]?.screens.map((cur, index) => (
                        <option
                          selected={index === 0}
                          className="checked:bg-blue-600"
                          key={cur.id}
                          value={cur.id}
                        >
                          {cur.name}
                        </option>
                      ))}
                  </select>
                  {errors.screen_id && (
                    <>
                      <div className="col-span-4"></div>
                      <p className="text-red-600 italic text-sm col-span-8">
                        {" "}
                        {errors.province_id.message}
                      </p>
                    </>
                  )}
                </div>

                <InputDashboard
                  title="Show date"
                  type="date"
                  register={{
                    ...register("show_date", {
                      required: "Show date is required",
                    }),
                  }}
                  error={errors.type_name}
                />
                <InputDashboard
                  title="Show time start"
                  type="time"
                  register={{
                    ...register("show_time_start", {
                      required: "Show date is required",
                    }),
                  }}
                  error={errors.type_name}
                />
              </>
            )}
            <div className="w-full bg-slate-600/20 flex flex-col gap-3 items-center p-3 rounded-lg">
              <div className="w-full flex flex-col items-center h-5 mb-12">
                <h1 className="text-2xl font-bold">Screen</h1>
                <img src={imageManHinh} className="h-10" alt="img_man_hinh" />
              </div>
              {provincesHaveCinema[cinemaByProvinceId].cinemas[screenByCinemaId]
                .screens.length > 0 &&
                provincesHaveCinema[cinemaByProvinceId].cinemas[
                  screenByCinemaId
                ].screens[arrayChairByScreenId].arrayNumRowChair.map(
                  (num, index) => (
                    <RowChairs
                      arrayTypeChair={
                        provincesHaveCinema[cinemaByProvinceId].cinemas[
                          screenByCinemaId
                        ].screens[arrayChairByScreenId].arrayNumRowChair[index]
                      }
                      isDelete={false}
                      handleDeleteRow={() => {}}
                      key={index}
                      num={num}
                      indexArray={index}
                    />
                  )
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
                {editShowTime ? "Edit show time" : "Add new show time"}
              </button>
            </div>
          </form>
        </ModelDashBoard>
      )}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">All Showtimes</h1>
        <SortBy
          options={[
            { value: "created_at-asc", label: "Sort by created (new first)" },
            { value: "created_at-desc", label: "Sort by created (old first)" },
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
              <th className="py-3 font-medium">Movie</th>
              <th className="py-3 font-medium">Cinema</th>
              <th className="py-3 font-medium">Province</th>
              <th className="py-3 font-medium">Screen</th>
              <th className="py-3 font-medium">Show date</th>
              <th className="py-3 font-medium">Time start</th>
              <th className="py-3 font-medium">Capacity</th>
              <th className="py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {isLoadingGetAll ? (
              <tr>
                <td colSpan={8} className="text-center py-10">
                  <Loader size={120} />
                </td>
              </tr>
            ) : (
              data?.showtimes.map((showtime) => (
                <tr key={showtime.id}>
                  <td className="pr-2 py-3">{showtime.movies.title}</td>
                  <td>{showtime.screens.cinemas.name}</td>
                  <td>{showtime.screens.provinces.name}</td>
                  <td>{showtime.screens.name}</td>
                  <td>{showtime.show_date}</td>
                  <td>{showtime.show_time_start.toString().slice(0, -3)}</td>
                  <td>
                    {showtime.status_seat.reduce((acc, cur) => {
                      if (cur.status === "available") {
                        acc += 1;
                      }
                      return acc;
                    }, 0)}{" "}
                    /
                    {showtime.status_seat.reduce((acc) => {
                      return (acc += 1);
                    }, 0)}
                  </td>

                  <td className="">
                    <button
                      onClick={() => handleOpenModelEdit(showtime)}
                      className="bg-yellow-600 p-1 rounded-lg"
                    >
                      <CiEdit />
                    </button>

                    <button
                      onClick={() => onHandleOpenModelConfirm(showtime.id)}
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
          onClick={handleOpenModel}
          className="w-full mt-6 hover:bg-blue-600 transition-all duration-300 py-4 bg-blue-400 rounded-xl font-semibold"
        >
          Add new
        </button>
      </div>
    </div>
  );
};

export default Showtimes;
