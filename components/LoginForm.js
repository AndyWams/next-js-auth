import { useState } from "react";
import inputstyles from "../styles/Input.module.scss";
import buttonstyles from "../styles/Button.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { userService, alertService } from "../services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const router = useRouter();
  const [disable, setDisable] = useState(true);

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });
  const formOptions = {
    resolver: yupResolver(validationSchema),
  };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isDirty } = formState;

  const formData = async ({ email, password }) => {
    try {
      await userService.login(email, password);
      // get return url from query parameters or default to '/'
      const returnUrl = router.query.returnUrl || "/";
      router.push(returnUrl);
      toast.success("Login success", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        progress: 0,
      });
    } catch (err) {
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        progress: 0,
      });
      alertService.error;
    }
  };

  return (
    <form onSubmit={handleSubmit(formData)}>
      <div className={inputstyles.input}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          placeholder="Enter your email address"
          {...register("email")}
        />
        <div className={inputstyles.invalidfeedback}>
          {errors.email?.message}
        </div>
      </div>
      <div className={inputstyles.input}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Type to create a password"
          {...register("password")}
        />
        <div className={inputstyles.invalidfeedback}>
          {errors.password?.message}
        </div>
      </div>
      <div className={inputstyles.inputcheck}>
        <input type="checkbox" id="checkbox" />
        <label htmlFor="checkbox">Remember me</label>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className={buttonstyles.btnprimary}
          disabled={!isDirty}
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
  );
};

export default LoginForm;
