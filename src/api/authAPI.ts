import axios from "axios";

const url: string = "https://set07superproject.onrender.com";
// const url: string = "http://localhost:1122";

export const RegisterAPI = async (data: any) => {
  try {
    return await axios.post(`${url}/api/create-account`, data);
  } catch (error) {
    console.log(error);
  }
};

export const VerifiedAPI = async (token: any) => {
  try {
    return await axios.post(`${url}/api/${token}/verify-account`);
  } catch (error) {
    console.log(error);
  }
};

export const ResetPasswordAPI = async (data: any) => {
  try {
    return await axios.patch(`${url}/api/reset-account-password`, data);
  } catch (error) {
    console.log(error);
  }
};

export const ChangePasswordAPI = async (token: any, data: any) => {
  try {
    return await axios.patch(
      `${url}/api/${token}/change-account-password`,
      data
    );
  } catch (error) {
    console.log(error);
  }
};

export const SignInAPI = async (data: any) => {
  try {
    return await axios
      .post(`${url}/api/sign-in-account`, data)
      .then((res: any) => {
        return res.data.user;
      });
  } catch (error) {
    console.log(error);
  }
};
