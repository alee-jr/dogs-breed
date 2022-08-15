/* eslint-disable @next/next/no-img-element */
import { NextPage } from "next";
import LoginForm from "../components/Auth/LoginForm";

const Login: NextPage = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-20 w-auto rounded-full"
            src="https://img.freepik.com/premium-vector/design-bigol-animated-dog-sitting_469988-3.jpg"
            alt="dog"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
