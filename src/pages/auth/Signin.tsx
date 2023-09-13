import { Link, useNavigate, useParams } from "react-router-dom";
import {
  AiFillFacebook,
  AiFillGoogleSquare,
  AiFillTwitterSquare,
  AiFillLinkedin,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingScreen from "../../utils/LoadingScreen";
import { SignInAPI, VerifiedAPI } from "../../api/authAPI";
import Swal from "sweetalert2";
import { userState } from "../../global/GlobalState";
import { useRecoilState, useRecoilValue } from "recoil";

const SignIn = () => {
  const { token } = useParams();
  const naviage = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [state, setState] = useRecoilState(userState);
  const value = useRecoilValue(userState);

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
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

    SignInAPI(data).then((res) => {
      setLoading(false);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Welcome Back",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        setState(res);
        naviage("/");
      });
    });
  });

  useEffect(() => {
    if (token) {
      VerifiedAPI(token);
    }
  }, []);

  return (
    <div className="flex items-center justify-center h-[100vh] ">
      {loading && <LoadingScreen />}
      <form className="w-[350px] border rounded p-4 " onSubmit={handleRegister}>
        <div className="uppercase font-[900] text-[20px]">Sign In Screen</div>

        <div className="mt-8">
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

        {!token && (
          <div className="text-[13px] w-full flex justify-end text-blue-400 ">
            <Link to="/reset-password">Forget Password</Link>
          </div>
        )}
        <button
          className="w-full flex items-center justify-center p-3 bg-red-400  text-white mt-4 rounded transition-all duration-300 hover:cursor-pointer hover:scale-[1.02]"
          type="submit"
        >
          Sign In
        </button>
        <br />
        <hr />
        <div className="flex flex-col items-center text-[13px] text-[silver] my-4 ">
          <div>Don't have an Account?</div>
          <Link to="/register" className="text-red-400">
            Sign Up here
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

export default SignIn;
