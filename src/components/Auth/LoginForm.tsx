import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm: React.FC = () => {
  const { signIn } = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };

  const { register, handleSubmit, setError, formState } = useForm(formOptions);

  const { errors } = formState;

  const handleSignIn = async (data: any) => {
    try {
      await signIn(data.email);
    } catch (error: any) {
      setError("apiError", { message: error.message });
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleSignIn)}>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            type="email"
            autoComplete="email"
            {...register("email")}
            required
            className={`form-control ${
              errors.email ? "border-rose-500 focus:border-rose-500" : ""
            } appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
            placeholder="Email address"
          />
          {errors.email && (
            <p className="text-rose-500">{(errors.email as any).message}</p>
          )}
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
