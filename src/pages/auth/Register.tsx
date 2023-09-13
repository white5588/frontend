import { Link, useNavigate } from "react-router-dom";
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
import { RegisterAPI } from "../../api/authAPI";
import Swal from "sweetalert2";

const Register = () => {
  const naviage = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const schema = yup.object({
    userName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
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
    const { userName, email, password, confirm } = data;

    setLoading(true);

    RegisterAPI({ userName, email, password, confirm }).then(() => {
      setLoading(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "A mail has been sent to your email",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        naviage("/message");
      });
    });
  });

  return (
    <div className="flex items-center justify-center h-[100vh] ">
      {loading && <LoadingScreen />}
      <form className="w-[350px] border rounded p-4 " onSubmit={handleRegister}>
        <div className="uppercase font-[900] text-[20px]">Register Screen</div>

        <div className="mt-6">
          <div className="text-[13px]">userName</div>
          <input
            className="w-full p-2 border outline-none rounded placeholder:text-[13px] "
            placeholder="user Name"
            {...register("userName")}
          />

          {errors.userName?.message && (
            <div className="text-[13px] w-full flex justify-end text-red-400 ">
              error
            </div>
          )}
        </div>

        <div className="mt-2">
          <div className="text-[13px]">Email</div>
          <input
            className="w-full p-2 border outline-none rounded placeholder:text-[13px] "
            placeholder="Email"
            {...register("email")}
          />

          {errors.email?.message && (
            <div className="text-[13px] w-full flex justify-end text-red-400 ">
              error
            </div>
          )}
        </div>

        <div className="mt-2">
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

        <div className="mt-2">
          <div className="text-[13px]">confirm</div>
          <input
            className="w-full p-2 border outline-none rounded placeholder:text-[13px] "
            placeholder="confirm"
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
          Register
        </button>
        <br />
        <hr />
        <div className="flex flex-col items-center text-[13px] text-[silver] my-4 ">
          <div>Already have an Account?</div>
          <Link to="/sign-in" className="text-red-400">
            Sign in here
          </Link>
        </div>

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

export default Register;
