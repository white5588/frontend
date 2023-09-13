import { useNavigate, useParams } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillGoogleSquare,
  AiFillTwitterSquare,
  AiFillLinkedin,
} from "react-icons/ai";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingScreen from "../../utils/LoadingScreen";
import { ChangePasswordAPI, ResetPasswordAPI } from "../../api/authAPI";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const { token } = useParams();
  const naviage = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup.object({
    password: yup.string().email().required(),
    confirm: yup.string().oneOf([yup.ref("password")]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = handleSubmit(async (data) => {
    setLoading(true);

    ChangePasswordAPI(token, data).then(() => {
      setLoading(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your password has been changed SUCCESSFULLY!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        naviage("/sign-in");
      });
    });
  });

  return (
    <div className="flex items-center justify-center h-[100vh] ">
      {loading && <LoadingScreen />}
      <form className="w-[350px] border rounded p-4 " onSubmit={handleRegister}>
        <div className="uppercase font-[900] text-[20px]">
          Change Password Screen
        </div>

        <div className="mt-8">
          <div className="text-[13px]">Password</div>
          <input
            className="w-full p-2 border outline-none rounded placeholder:text-[13px] "
            placeholder="Password"
            {...register("password")}
          />

          {errors.password?.message && (
            <div className="text-[13px] w-full flex justify-end text-red-400 ">
              error
            </div>
          )}
        </div>
        <div className="mt-8">
          <div className="text-[13px]">Confirm</div>
          <input
            className="w-full p-2 border outline-none rounded placeholder:text-[13px] "
            placeholder="Confirm"
            {...register("confirm")}
          />

          {errors.confirm?.message && (
            <div className="text-[13px] w-full flex justify-end text-red-400 ">
              error
            </div>
          )}
        </div>

        <button
          className="w-full flex items-center justify-center p-3 bg-red-400  text-white mt-4 rounded transition-all duration-300 hover:cursor-pointer hover:scale-[1.02]"
          type="submit"
        >
          Change Password
        </button>
        <br />
        <hr />

        <div className="flex justify-center  text-[silver] my-4 text-[45px] ">
          <div className=" transition-all duration-300 hover:cursor-pointer hover:scale-[1.05] hover:text-red-500 ">
            <AiFillGoogleSquare />
          </div>
          <div className=" transition-all duration-300 hover:cursor-pointer hover:scale-[1.05] hover:text-blue-400 ">
            <AiFillTwitterSquare />
          </div>
          <div className=" transition-all duration-300 hover:cursor-pointer hover:scale-[1.05] hover:text-blue-700 ">
            <AiFillFacebook />
          </div>
          <div className=" transition-all duration-300 hover:cursor-pointer hover:scale-[1.05] hover:text-blue-500 ">
            <AiFillLinkedin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
