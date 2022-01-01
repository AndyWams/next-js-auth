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
function RegisterForm(props) {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    fullname: Yup.string().required("fullname is required"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(isAddMode ? Yup.string().required("Password is required") : null)
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const [serverError, setServerError] = useState(false);

  function onSubmit(data) {
    return isAddMode ? createUser(data) : updateUser(user.id, data);
  }

  function createUser(data) {
    return userService
      .register(data)
      .then(() => {
        alertService.success("User added", { keepAfterRouteChange: true });
        router.push("/");
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
            name="email"
            {...register("email")}
          />
        </div>
        <div className={inputstyles.input}>
          <label htmlFor="fullname">Full name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            name="fullname"
            {...register("fullname")}
          />
        </div>
        <div className={inputstyles.input}>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Type to create a password"
            name="password"
            {...register("password")}
          />
        </div>
        <div className={inputstyles.inputcheck}>
          <input type="checkbox" id="checkbox" />
          <label htmlFor="checkbox">
            Get updates and notification about our products
          </label>
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className={buttonstyles.btnprimary}
            disabled={formState.isSubmitting}
          >
            Create Profile
          </button>
        </div>
        <div className="d-flex justify-content-center my-3">
          Already have an account?
          <Link href="/auth/login">
            <a className="mx-1">
              Login here!{" "}
              {formState.isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-1"></span>
              )}
            </a>
          </Link>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
