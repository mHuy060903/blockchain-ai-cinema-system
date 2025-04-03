import { useState } from "react";
import { useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { HiOutlineDuplicate } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import InputDashboard from "../../components/InputDashboard";
import { useGetAllProvince } from "../../features/cinema/useGetAllProvince";
import ModelDashBoard from "../../components/ModelDashBoard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast } from "react-toastify";
import ChangMapCenter from "../../components/ChangMapCenter";
import LocationMarket from "../../components/LocationMarket";
import { useAddCinema } from "../../features/cinema/useAddCinema";
import { useQueryClient } from "@tanstack/react-query";
import Loader from "../../components/Loader";
import { useGetAllCinema } from "../../features/cinema/useGetAllCinema";
import L from "leaflet";
import { useEditCinema } from "../../features/cinema/useEditCinema";
import { useDeleteCinema } from "../../features/cinema/useDeleteCinema";
import ModelConfirm from "../../components/ModelConfirm";
import { useDuplicateCinema } from "../../features/cinema/useDuplicateCinema";
import Pagination from "../../components/Pagination";
import { useGetFullCinemas } from "../../features/cinema/useGetFullCinemas";
const customIcon = L.divIcon({
  html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-blue-500">
           <path fill-rule="evenodd" d="M12 2C8.14 2 5 5.14 5 9c0 3.74 3.04 8.36 6.32 12.58.35.44.99.44 1.34 0C15.96 17.36 19 12.74 19 9c0-3.86-3.14-7-7-7zm0 3a2 2 0 110 4 2 2 0 010-4z" clip-rule="evenodd" />
         </svg>`,
  className: "text-center ", // Áp dụng lớp Tailwind CSS
  iconSize: [30, 30],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24],
});
const Cinema = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [position, setPosition] = useState([50, 50]);
  const [isOpenModelConfirm, setIsOpenModelConfirm] = useState(false);
  const [editCinema, setEditCinema] = useState(null);
  const [deleteCinemaId, setDeleteCinemaId] = useState(0);
  const queryClient = useQueryClient();

  const { isErrorAllProvince, provinces } = useGetAllProvince();

  const { isLoadingAdd, isErrorAdd, handleAddCinema } = useAddCinema();

  const { isLoadingGetAll, isErrorGetAll, cinemas } = useGetAllCinema();
  const { isLoadingGetFull, isErrorGetFull, cinemasFull } = useGetFullCinemas();

  const { isLoadingEdit, isErrorEdit, handleEditCinema } = useEditCinema();

  const { isLoadingDelete, isErrorDelete, handleDeleteCinema } =
    useDeleteCinema();

  const { isErrorDuplicate, handleDuplicateCinema } = useDuplicateCinema();

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const handleOpenModel = () => {
    setIsOpenModel(true);
  };

  const handleCloseModel = () => {
    setIsOpenModel(false);
    reset();
    setEditCinema(null);
    setPosition([50, 50]);
  };
  const handleOpenModelEdit = (cinema) => {
    setValue("name", cinema.name);
    setValue(
      "province_id",
      `${cinema.province_id},${cinema.provinces.lat},${cinema.provinces.lng}`
    );
    setValue("address", cinema.address);
    setEditCinema(cinema);
    setPosition([cinema.lat, cinema.lng]);
    handleOpenModel();
  };

  const onChangeProvince = (e) => {
    const arrayProvince = e.target.value.split(",");
    setPosition([arrayProvince[1], arrayProvince[2]]);
  };

  const onDeleteCinemaById = () => {
    handleDeleteCinema(deleteCinemaId, {
      onSuccess: () => {
        toast.success("Delete success");
        queryClient.invalidateQueries({ queryKey: "cinemas" });
        setDeleteCinemaId(0);
        setIsOpenModelConfirm(false);
      },
    });
  };

  const handleOpenModelDeleteConfirm = (id) => {
    setDeleteCinemaId(id);
    setIsOpenModelConfirm(true);
  };

  const onHandleDuplicateCinemaId = (id) => {
    handleDuplicateCinema(id, {
      onSuccess: () => {
        toast.success("Duplicate success");
        queryClient.invalidateQueries({ queryKey: ["cinemas"] });
      },
    });
  };

  const onSubmit = (data) => {
    const idProvince = data.province_id.split(",")[0];

    const lat = position[0] || position.lat;
    const lng = position[1] || position.lng;

    if (editCinema) {
      return handleEditCinema(
        {
          ...data,
          province_id: idProvince,
          lat: parseFloat(lat),
          lng: parseFloat(lng),
          id: editCinema.id,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cinemas"] });
            toast.success("Update success");
            handleCloseModel();
          },
        }
      );
    }

    handleAddCinema(
      {
        ...data,
        province_id: idProvince,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["cinemas"] }),
            toast.success("Add success"),
            handleCloseModel();
        },
      }
    );
  };

  return (
    <div className="text-white w-full flex flex-col gap-5 overflow-y-auto">
      {isOpenModelConfirm && (
        <ModelConfirm
          text={"Are you sure want to delete this cinema?"}
          heading={"Delete Confirmation"}
          onClose={() => setIsOpenModelConfirm(false)}
          onSubmit={onDeleteCinemaById}
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
                    value={[cur.id, cur.lat, cur.lng]}
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
            <InputDashboard
              title="address"
              type="text"
              register={{
                ...register("address", {
                  required: "Address is required",
                }),
              }}
              error={errors.address}
            />
            <div className="h-[250px] ">
              <MapContainer
                className="h-[230px] "
                center={position}
                zoom={13}
                scrollWheelZoom={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!isLoadingGetFull &&
                  cinemasFull?.length !== 0 &&
                  cinemasFull?.map((cur) => {
                    if (cur.id !== editCinema?.id) {
                      return (
                        <Marker key={cur.id} position={[cur.lat, cur.lng]}>
                          <Popup>{cur.name}</Popup>
                        </Marker>
                      );
                    }
                    return null;
                  })}
                <Marker position={position} icon={customIcon}>
                  <Popup>This position here</Popup>
                </Marker>
                <LocationMarket setPosition={setPosition} />
                <ChangMapCenter position={position} />
              </MapContainer>
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
                {/* {editMovie ? "Edit movie" : "Add new movie"} */}
                {editCinema ? "Edit cinema" : "Add new cinema"}
              </button>
            </div>
          </form>
        </ModelDashBoard>
      )}
      <div className="flex justify-between items-center">
        <h className="text-xl font-semibold">All Cinemas</h>
        <span>Filter / Sort</span>
      </div>
      {(isErrorAllProvince || isErrorGetAll || isErrorDuplicate) && (
        <p className="w-full rounded-xl py-3 text-center bg-red-600/60 text-white">
          Some thing went wrong!
        </p>
      )}
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-slate-600/40  rounded-lg text-left">
            <th className="py-3 font-medium">Id</th>
            <th className="py-3 font-medium">Name</th>
            <th className="py-3 font-medium">Address</th>
            <th className="py-3 font-medium">Province</th>
            <th className="py-3 font-medium"></th>
          </tr>
        </thead>
        <tbody>
          {isLoadingGetAll ? (
            <tr>
              <td colSpan={5} className="text-center py-10">
                <Loader size={120} />
              </td>
            </tr>
          ) : cinemas?.cinemas.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-10">
                No data this table
              </td>
            </tr>
          ) : (
            cinemas?.cinemas.map((cur) => (
              <tr key={cur.id}>
                <td className="pr-2 py-3">{cur.id}</td>
                <td>{cur.name}</td>
                <td>{cur.address}</td>
                <td>{cur.provinces.name}</td>
                <td className="">
                  <button
                    onClick={() => onHandleDuplicateCinemaId(cur.id)}
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
                    onClick={() => handleOpenModelDeleteConfirm(cur.id)}
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
      <Pagination count={cinemas?.count} />
      <button
        onClick={() => handleOpenModel()}
        className="w-full mt-6 hover:bg-blue-600 transition-all duration-300 py-4 bg-blue-400 rounded-xl font-semibold"
      >
        Add new Screen
      </button>
    </div>
  );
};

export default Cinema;
