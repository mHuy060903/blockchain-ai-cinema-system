import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEditUser } from "../features/user/useEditUser";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { login } from "../reducers/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const hasShownToast = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isLoading, isError, handleEditUser } = useEditUser();

  const [image, setImage] = useState(user?.image);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data) => {
    handleEditUser(
      { ...data, userPath: user.image, idUser: user.id },
      {
        onSuccess: (data) => {
          const { token, ...dataUser } = data;
          toast.success("Update success");
          dispatch(login({ user: dataUser, token: token }));
          setValue("image", null);
        },
      }
    );
  };

  useEffect(() => {
    if (!user && !hasShownToast.current) {
      toast.error("Please login before edit your profile");
      hasShownToast.current = true;
      return navigate("/login");
    }

    setValue("email", user?.email);
    setValue("address", user?.address);
    setValue("phone", user?.phone);
  }, [user, setValue, navigate]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white my-8 flex flex-col rounded-lg px-3 py-4 gap-2"
    >
      <h1 className="text-lg font-semibold">Edit Profile</h1>
      {isError && (
        <p className="w-full text-center">Somethings wrong went update</p>
      )}
      <div className="flex items-center gap-4 justify-start">
        <div className="w-20 h-20 rounded-full overflow-hidden">
          <img src={image} />
        </div>
        <label className="block">
          <span className="sr-only">Choose profile photo</span>
          <input
            disabled={isLoading}
            {...register("image")}
            onChange={handleChangeImage}
            type="file"
            className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
          />
        </label>
      </div>
      <div className="flex flex-col items-start gap-3">
        <label className="font-normal">Email</label>
        <input
          disabled={true}
          className="w-full py-2 px-3 disabled:bg-slate-300 text-slate-800 rounded-lg border-2 border-slate-200 outline-none"
          {...register("email")}
        />
      </div>
      <div className="flex flex-col items-start gap-3">
        <label className="font-normal">Phone</label>
        <input
          disabled={isLoading}
          className={` w-full py-2 px-3 disabled:bg-slate-300 text-slate-800 rounded-lg border-2 outline-none ${
            errors?.phone?.message ? "border-red-400" : " border-slate-200"
          }`}
          {...register("phone", {
            required: user?.phone || "Please enter your phone number",
            validate: (data) => {
              const phoneNumberPattern = /^(0[3-9][0-9]{8})$/;
              return phoneNumberPattern.test(data) || "Invalid phone number";
            },
          })}
        />
      </div>
      {errors?.phone?.message && (
        <p className="text-red-400">{errors.phone.message}</p>
      )}
      <div className="flex flex-col items-start gap-3">
        <label className="font-normal">Address</label>
        <input
          disabled={isLoading}
          className={` w-full py-2 px-3 disabled:bg-slate-300 text-slate-800 rounded-lg border-2 outline-none ${
            errors?.address?.message ? "border-red-400" : " border-slate-200"
          }`}
          {...register("address", {
            required: user?.address || "Please enter your address",
            minLength: {
              value: 15,
              message: "Your address must be greater than 15",
            },
          })}
        />
      </div>
      {errors?.address?.message && (
        <p className="text-red-400">{errors.address.message}</p>
      )}
      <div className="w-full flex justify-end">
        <button
          disabled={isLoading}
          className="bg-[#da821b] flex items-center gap-1 text-white px-10 py-3 rounded-xl font-semibold text-lg"
        >
          {isLoading && <Loader size={25} />} Save
        </button>
      </div>
    </form>
  );
};

export default Profile;
