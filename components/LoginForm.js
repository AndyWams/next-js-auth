import { useState } from "react";
import inputstyles from "../styles/Input.module.scss";
import buttonstyles from "../styles/Button.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { userService, alertService } from "../services";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginForm() {
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const [serverError, setServerError] = useState(false);

  function onSubmit({ email, password }) {
    return userService
      .login(email, password)
      .then(() => {
        // get return url from query parameters or default to '/'
        const returnUrl = router.query.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((err) => {
        setServerError(true);
        toast.error(err, {
          position: toast.POSITION.TOP_RIGHT,
        });
        alertService.error;
      });
  }

  return (
    <>
      {serverError && (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={inputstyles.input}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter your email address"
            {...register("email")}
          />
        </div>

        <div className={inputstyles.input}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Type to create a password"
            {...register("password")}
          />
        </div>
        <div className={inputstyles.inputcheck}>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">Remember me</label>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={buttonstyles.btnprimary}
            disabled={formState.isSubmitting}
          >
            Login
          </button>
        </div>
        <div className="d-flex justify-content-center my-4">
          Don't have an account?{" "}
          <Link href="/auth/register">
            <a className="mx-1">Create account!</a>
          </Link>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
