import React from "react";
import LoginContent from "./LoginContent";
import { Suspense } from "react";

const LoginPage = ({ searchParams }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent next={searchParams?.next || "/profile"} />
    </Suspense>
  );
};

export default LoginPage;
