import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { useState } from "react";
import ModelDashBoard from "../../components/ModelDashBoard";
import { useGetAllProvince } from "../../features/cinema/useGetAllProvince";
import { useForm } from "react-hook-form";
import { useGetCinemaByProvince } from "../../features/DashboardScreen/useGetCinemaByProvince";
import { useSearchParams } from "react-router-dom";
import RowChairs from "../../components/RowChairs";
import { toast } from "react-toastify";
import { useAddScreen } from "../../features/DashboardScreen/useAddScreen";
import Loader from "../../components/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllScreen } from "../../features/DashboardScreen/useGetAllScreen";
import InputDashboard from "../../components/InputDashboard";
import { useEditScreen } from "../../features/DashboardScreen/useEditScreen";
import { useDeleteScreen } from "../../features/DashboardScreen/useDeleteScreen";
import ModelConfirm from "../../components/ModelConfirm";

import { useDuplicateScreen } from "../../features/DashboardScreen/useDuplicateScreen";
import { useGetAllSeatTypes } from "../../features/DashboardSeatTypes/useGetAllSeatTypes";
import imageManHinh from "../../assets/images/man-hinh.png";

const Screens = () => {
  
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [isOpenModelConfirm, setIsOpenModelConfirm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [numChair, setNumChair] = useState(0);
  const [arrayNumChairARow, setArrayNumChairARow] = useState([]);
  const [arraySeatTypes, setArraySeatTypes] = useState([]);

  const [isAddRowChair, setIsAddRowChair] = useState(false);
  const [isOpenChairEmpty, setIsOpenChairEmpty] = useState(false);
  const [positionAddChairEmpty, setPositionAddChairEmpty] = useState(-1);
  const [positionNumRowColChairEmpty, setPositionNumRowColChairEmpty] =
    useState({
      row: 0,
      col: 0,
    });

  const [editScreen, setEditScreen] = useState(null);
  const [idDeleteScreen, setIdDeleteScreen] = useState(0);

  const queryClient = useQueryClient();

  const { isErrorAllProvince, provinces } = useGetAllProvince();

  const { isLoadingAdd, isErrorAdd, handleAddScreen } = useAddScreen();

  const { isLoadingGetAll, isErrorGetAll, screens } = useGetAllScreen();

  const { isLoadingEdit, isErrorEdit, handleEditScreen } = useEditScreen();

  const { isLoadingDelete, isErrorDelete, handleDeleteScreen } =
    useDeleteScreen();

  const { handleDuplicateScreen } = useDuplicateScreen();

  const { cinemaByProvince } = useGetCinemaByProvince();

  const {
    isLoadingGetAll: isLoadingGetAllSeatType,
    isErrorGetAll: isErrorGetAllSeatType,
    data: seat_types,
  } = useGetAllSeatTypes();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const onAddNumChair = () => {
    if (numChair === 0) {
      return;
    }
    const arraySeatTypeCopy = [...arraySeatTypes];
    arraySeatTypeCopy.push(seat_types.seat_types[0].id);

    const arrayNum = [...arrayNumChairARow];
    const arrayChair = Array.from({ length: numChair }).map(() => 1);
    arrayNum.push(arrayChair);

    setArraySeatTypes(arraySeatTypeCopy);
    setArrayNumChairARow(arrayNum);
    setIsAddRowChair(false);
    setNumChair(0);
  };

  const onOpenFormRowChair = () => {
    setIsAddRowChair(true);
  };

  const onOpenModelConfirmDelete = (id) => {
    setIdDeleteScreen(id);
    setIsOpenModelConfirm(true);
  };

  const onDeleteScreenById = () => {
    handleDeleteScreen(idDeleteScreen, {
      onSuccess: () => {
        toast.success("Delete success");
        setIsOpenModelConfirm(false);
        queryClient.invalidateQueries({ queryKey: ["screens"] });
      },
    });
  };

  const handleCloseModel = () => {
    setEditScreen(null);
    reset();
    setArrayNumChairARow([]);
    setArraySeatTypes([]);
    setIsOpenModel(false);
    setIsOpenChairEmpty(false);
  };

  const handleOpenModel = () => {
    searchParams.set("idProvince", provinces[0].id);
    setSearchParams(searchParams);
    setIsOpenModel(true);
  };

  const handleOpenModelEdit = (screen) => {
    searchParams.set("idProvince", screen.province_id);
    setSearchParams(searchParams);
    setIsOpenModel(true);
    setValue("name", screen.name);
    setValue("province_id", screen.province_id);
    setValue("cinema_id", screen.cinema_id.toString());
    setArrayNumChairARow(screen.arrayNumRowChair);
    setArraySeatTypes(screen.arraySeatTypes.map((val) => Number(val)));
    setEditScreen(screen);
  };

  const onChangeProvince = (e) => {
    if (!e.target.value) return;
    searchParams.set("idProvince", e.target.value);
    setSearchParams(searchParams);
  };

  const onSubmit = (data) => {
    if (arrayNumChairARow.length === 0) {
      return toast.error("Please add least a row chair");
    }
    if (editScreen) {
      return handleEditScreen(
        {
          ...data,
          id: editScreen.id,
          arrayNumRowChair: arrayNumChairARow,
          arraySeatTypes,
        },
        {
          onSuccess: () => {
            toast.success("Edit success");
            queryClient.invalidateQueries({ queryKey: ["screens"] });
            reset();
            handleCloseModel();
          },
        }
      );
    }
    handleAddScreen(
      { ...data, arrayNumRowChair: arrayNumChairARow, arraySeatTypes },
      {
        onSuccess: () => {
          toast.success("Add success");
          queryClient.invalidateQueries({ queryKey: ["screens"] });
          reset();
          handleCloseModel();
        },
      }
    );
  };

  const onDuplicateScreenById = (id) => {
    handleDuplicateScreen(id, {
      onSuccess: () => {
        toast.success("Duplicate success");
        queryClient.invalidateQueries({ queryKey: ["screens"] });
      },
    });
  };

  const onChangeNumChair = (e) => {
    const num = Number(e.target.value);
    setNumChair(num);
  };

  const handleDeleteRow = (index) => {
    const arrayNum = [...arrayNumChairARow];
    arrayNum.splice(index, 1);
    const arraySeatTypeCopy = [...arraySeatTypes];
    arraySeatTypeCopy.splice(index, 1);
    setArraySeatTypes(arraySeatTypeCopy);
    setArrayNumChairARow(arrayNum);
  };

  const handleChangeSeatType = (index, value) => {
    const arraySeatTypeCopy = [...arraySeatTypes];
    arraySeatTypeCopy[index] = value;
    setArraySeatTypes(arraySeatTypeCopy);
  };

  const handleOpenAddSpace = () => {
    const numChair = arrayNumChairARow[0].reduce((acc, cur) => {
      if (cur === 1) {
        return (acc += 1);
      }
      return acc;
    }, 0);
    setIsOpenChairEmpty(true);
    setPositionAddChairEmpty(numChair);
  };

  const onChangeRowChairEmpty = (e) => {
    const numChair = arrayNumChairARow[e.target.value].reduce((acc, cur) => {
      if (cur === 1) {
        return (acc += 1);
      }
      return acc;
    }, 0);
    setPositionAddChairEmpty(numChair);
    setPositionNumRowColChairEmpty((cur) => ({
      ...cur,
      row: Number(e.target.value),
    }));
  };

  const handleDeleteEmptyChair = (indexRow, indexEmptyChair) => {
    const arrayNumChairRowCopy = [...arrayNumChairARow];
    arrayNumChairRowCopy[indexRow] = [...arrayNumChairRowCopy[indexRow]];
    arrayNumChairRowCopy[indexRow].splice(indexEmptyChair, 1);
    setArrayNumChairARow(arrayNumChairRowCopy);
  };
  const addSpaceEmptyChair = () => {
    const row = positionNumRowColChairEmpty.row;
    const col = positionNumRowColChairEmpty.col;

    const arrayNumChairRowCopy = [...arrayNumChairARow];
    arrayNumChairRowCopy[row] = [...arrayNumChairRowCopy[row]];

    let total = 0;
    let i = 0;
    while (total < col) {
      total += arrayNumChairRowCopy[row][i];
      i++;
    }
    arrayNumChairRowCopy[row].splice(i, 0, 0);

    setArrayNumChairARow(arrayNumChairRowCopy);
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
          {(isErrorAdd || isErrorEdit) && (
            <p className="w-full py-3 rounded-lg bg-red-500 text-white">
              Some thing went wrong upload
            </p>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 text-black p-4 w-[800px]"
          >
            <InputDashboard
              title="name"
              register={{
                ...register("name", { required: "Name is required" }),
              }}
              error={errors.name}
            />
            <div className="grid grid-cols-12">
              <label className="col-span-4 font-semibold text-slate-900/90">
                Province:
              </label>
              {/* <input className="col-span-8 outline-none border-[1px] border-slate-600/30 py-1 px-1" /> */}
              <select
                id="select_genre_movie"
                {...register("province_id", {
                  required: "Province is required",
                })}
                onChange={onChangeProvince}
                className={`${
                  errors.province_id ? "border-red-500" : "border-slate-600/30 "
                } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
              >
                {provinces?.map((cur) => (
                  <option
                    className="checked:bg-blue-600"
                    key={cur.id}
                    value={cur.id}
                  >
                    {cur.name}
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
              {/* <input className="col-span-8 outline-none border-[1px] border-slate-600/30 py-1 px-1" /> */}
              <select
                id="select_genre_movie"
                {...register("cinema_id", {
                  required: "Cinema is required",
                })}
                // onChange={onChangeProvince}
                className={`${
                  errors.province_id ? "border-red-500" : "border-slate-600/30 "
                } checked:bg-blue-600 col-span-8 outline-none border-[1px]  py-1 px-1`}
              >
                {cinemaByProvince?.map((cur) => (
                  <option
                    className="checked:bg-blue-600"
                    key={cur.id}
                    value={cur.id}
                  >
                    {cur.name}
                  </option>
                ))}
              </select>
              {errors.cinema_id && (
                <>
                  <div className="col-span-4"></div>
                  <p className="text-red-600 italic text-sm col-span-8">
                    {" "}
                    {errors.cinema_id.message}
                  </p>
                </>
              )}
            </div>
            <div className="w-full bg-slate-600/20 flex flex-col gap-3 items-center p-3 rounded-lg">
              <div className="w-full flex flex-col items-center h-5 mb-12">
                <h1 className="text-2xl font-bold">Screen</h1>
                <img src={imageManHinh} className="h-10" alt="img_man_hinh" />
              </div>
              {arrayNumChairARow.length > 0 &&
                arrayNumChairARow.map((num, index) => (
                  <RowChairs
                    handleDeleteEmptyChair={handleDeleteEmptyChair}
                    arrayTypeChair={num}
                    handleDeleteRow={() => handleDeleteRow(index)}
                    key={index}
                    indexArray={index}
                  >
                    {" "}
                    <select
                      defaultValue={editScreen && arraySeatTypes[index]}
                      onChange={(e) =>
                        handleChangeSeatType(index, Number(e.target.value))
                      }
                      className="absolute left-0"
                    >
                      {seat_types?.seat_types.map((cur) => (
                        <option key={cur.id} value={cur.id}>
                          {cur.type_name}
                        </option>
                      ))}
                    </select>
                  </RowChairs>
                ))}

              {isAddRowChair ? (
                <div className="flex gap-2 items-center">
                  <input
                    value={numChair}
                    type="number"
                    onChange={onChangeNumChair}
                    placeholder="Enter num chair this row"
                    className="pt-2 py-1 outline-none"
                  />
                  <button
                    onClick={onAddNumChair}
                    type="button"
                    className="p-2 bg-orange-500 rounded-lg font-medium text-white hover:bg-orange-700
                duration-300 transition-all"
                  >
                    Add row chair
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={onOpenFormRowChair}
                  className="p-2 bg-orange-500 rounded-lg font-medium text-white hover:bg-orange-700
                duration-300 transition-all"
                >
                  Add row chair
                </button>
              )}
              {isOpenChairEmpty && arrayNumChairARow.length > 0 ? (
                <div className="flex gap-2 items-center">
                  <label>Set row:</label>
                  <select
                    className="py-1 px-1"
                    onChange={onChangeRowChairEmpty}
                  >
                    {Array.from({ length: arrayNumChairARow.length }).map(
                      (_, index) => (
                        <option key={index} value={index}>
                          {index + 1}
                        </option>
                      )
                    )}
                  </select>
                  {positionAddChairEmpty > 0 && (
                    <>
                      <label>Set position</label>
                      <select
                        onChange={(e) => {
                          setPositionNumRowColChairEmpty((cur) => ({
                            ...cur,
                            col: Number(e.target.value),
                          }));
                        }}
                        className="py-1 px-1"
                      >
                        {Array.from({ length: positionAddChairEmpty }).map(
                          (_, index) => (
                            <option key={index} value={index}>
                              {index + 1}
                            </option>
                          )
                        )}
                      </select>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={addSpaceEmptyChair}
                    className="p-2 bg-orange-500 rounded-lg font-medium text-white hover:bg-orange-700
                duration-300 transition-all"
                  >
                    Add space row
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleOpenAddSpace}
                  className="p-2 bg-orange-500 rounded-lg font-medium text-white hover:bg-orange-700
                duration-300 transition-all"
                >
                  Add space row
                </button>
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
                {editScreen ? "Edit screen" : "Add new screen"}
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
        {(isErrorAllProvince || isErrorGetAll) && (
          <p className="w-full rounded-xl py-3 text-center bg-red-600/60 text-white">
            Some thing went wrong!
          </p>
        )}
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-slate-600/40  rounded-lg text-left">
              <th className="py-3 font-medium">Name</th>
              <th className="py-3 font-medium">Name Cinema</th>
              <th className="py-3 font-medium">Province</th>
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
            ) : (
              screens?.screens.map((item) => (
                <tr key={item.id}>
                  <td className="pr-2 py-3">{item.name}</td>
                  <td>{item.cinemas.name}</td>
                  <td>{item.provinces.name}</td>

                  <td className="">
                    <button
                      onClick={() => onDuplicateScreenById(item.id)}
                      className="bg-blue-600 p-1 rounded-lg"
                    >
                      <HiOutlineDuplicate />
                    </button>
                    <button
                      onClick={() => handleOpenModelEdit(item)}
                      className="bg-yellow-600 p-1 rounded-lg"
                    >
                      <CiEdit />
                    </button>

                    <button
                      onClick={() => onOpenModelConfirmDelete(item.id)}
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
        <button
          onClick={() => handleOpenModel()}
          className="w-full mt-6 hover:bg-blue-600 transition-all duration-300 py-4 bg-blue-400 rounded-xl font-semibold"
        >
          Add new
        </button>
      </div>
    </div>
  );
};

export default Screens;
