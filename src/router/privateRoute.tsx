import React, { PropsWithChildren } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../global/GlobalState";
import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateRoute: React.FC<PropsWithChildren> = ({ children }) => {
  //   const [state, setState] = useRecoilState(userState);
  const value: any = useRecoilValue(userState);
  const [state, setState] = useRecoilState(userState);
  let myToken: any = {};
  let token: string = value;

  if (token) {
    myToken = jwt_decode(token);
    setState(myToken.id);
  }

  console.log("show me State: ", jwt_decode(token));

  return (
    <div>{value ? <div>{children}</div> : <Navigate to="/sign-in" />}</div>
  );
};

export default PrivateRoute;
