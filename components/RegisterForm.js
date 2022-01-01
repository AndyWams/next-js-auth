import inputstyles from "../styles/Input.module.scss";
import buttonstyles from "../styles/Button.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { userService, alertService } from "../services";
import { toast } from "react-toastify";

const RegisterForm = (props) => {
  const user = props?.user;
  const isAddMode = !user;
  const router = useRouter();

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string().required().label("Email"),
    fullname: Yup.string().required().label("Fullname"),
    password: Yup.string()
      .transform((x) => (x === "" ? undefined : x))
      .concat(isAddMode ? Yup.string().required().label("Password") : null)
      .min(6, "Password must be at least 6 characters"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // set default form values if in edit mode
  if (!isAddMode) {
    formOptions.defaultValues = props.user;
  }

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors, isDirty } = formState;
  const formData = (data) => {
    return isAddMode ? createUser(data) : updateUser(user.id, data);
  };

  const createUser = async (data) => {
    try {
      await userService.register(data);
      toast.success("User created successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1500,
        progress: 0,
      });
      router.push("/auth/login");
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
          name="email"
          {...register("email")}
        />
        <div className={inputstyles.invalidfeedback}>
          {errors.email?.message}
        </div>
      </div>

      <div className={inputstyles.input}>
        <label htmlFor="fullname">Full name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          name="fullname"
          {...register("fullname")}
        />
        <div className={inputstyles.invalidfeedback}>
          {errors.fullname?.message}
        </div>
      </div>
      <div className={inputstyles.input}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          placeholder="Type to create a password"
          name="password"
          {...register("password")}
        />
        <div className={inputstyles.invalidfeedback}>
          {errors.password?.message}
        </div>
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
          disabled={!isDirty}
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
  );
};

export default RegisterForm;
