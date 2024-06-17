import { axios } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { InputHTMLAttributes, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { IoWarning } from "react-icons/io5";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps & FieldProps> = ({
  field,
  form,
  ...props
}) => {
  return (
    <input
      autoComplete="off"
      {...field}
      {...props}
      className="w-full bg-transparent rounded-2xl border text-white border-gray-600 pl-3 py-3 outline-none focus:border-accent transition-all"
    />
  );
};

const Error = ({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`${show ? "opacity-100 h-4" : "opacity-0 h-0"} transition-all mt-1 text-xs text-red-500`}
    >
      {children}
    </div>
  );
};

const Signup = () => {
  const router = useRouter();

  const [globalError, setGlobalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    username: Yup.string()
      .matches(/^[a-zA-Z0-9]*$/, "Username can't contain special characters")
      .notOneOf(
        [...Array(10).keys()].map(String),
        "Username cannot contain only numbers"
      )
      .min(4, "Username must be at least 4 characters long")
      .max(16, "Username cannot exceed 16 characters")
      .required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Password is too long (max 50 characters)")
      .required("Password is required"),
  });

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center text-sm min-h-screen max-w-[360px] mx-auto px-2">
      <div className="w-full">
        <img src="sooner-logo.svg" alt="Sooner logo" className="w-12 my-3" />
        <h1 className="font-semibold text-2xl text-white">
          Create an account with Sooner
        </h1>
        <p className="text-gray-400">
          {`Already have an account?`}{" "}
          <Link href="/login" className="text-accent font-medium">
            Sign in
          </Link>
        </p>
      </div>

      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setGlobalError("");
            await axios.post("/auth/signup", values);
            router.push("/verify");
          } catch (error: any) {
            setGlobalError(
              error?.response?.data.message ||
                "Something went wrong. Please try again."
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="w-full flex flex-col gap-y-4">
            <div>
              <Field
                component={Input}
                type="email"
                name="email"
                placeholder="Email"
              />
              <Error show={!!errors.email && touched.email!}>
                {errors.email}
              </Error>
            </div>

            <div>
              <Field
                component={Input}
                type="text"
                name="username"
                placeholder="Username"
              />
              <Error show={!!errors.username && touched.username!}>
                {errors.username}
              </Error>
            </div>

            <div className="relative">
              <Field
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                component={Input}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
              <Error show={!!errors.password && touched.password!}>
                {errors.password}
              </Error>
            </div>

            <button
              type="submit"
              className="bg-accent text-white rounded-2xl flex items-center justify-center h-11 font-medium disabled:bg-gray-500 disabled:cursor-not-allowed w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <CgSpinner className="animate-spin" size={20} />
              ) : (
                "Continue"
              )}
            </button>
            <Error show={!!globalError}>
              <div className="flex items-center gap-x-1">
                <IoWarning /> {globalError}
              </div>
            </Error>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
