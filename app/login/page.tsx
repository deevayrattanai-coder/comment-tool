import React from "react";
import LoginContent from "./LoginContent";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent next={"/profile"} />
    </Suspense>
  );
};

export default LoginPage;
