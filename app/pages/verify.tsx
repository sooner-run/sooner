import { axios } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { InputHTMLAttributes, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { FieldProps } from "formik";
import OTPInput from "react-otp-input";

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

const Verify = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [otp, setOtp] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center text-sm min-h-screen max-w-[360px] mx-auto">
      <div className="w-full">
        <img src="sooner-logo.svg" alt="Sooner logo" className="w-12 my-3" />
        <h1 className="font-semibold text-2xl text-white">
          Verify your Sooner account
        </h1>
        <p className="text-gray-400">Enter the OTP sent to your email</p>
      </div>

      <div className="w-full">
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          //@ts-ignore
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "40px",
            height: "40px",
            background: "transparent",
            fontSize: "20px",
            color: "white",
            outline: "none",
            border: "1px solid #6610F250",
            borderRadius: "5px",
          }}
          containerStyle={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "15px 0",
          }}
        />
        <button
          type="submit"
          className="bg-accent text-white rounded-2xl flex items-center justify-center h-11 font-medium disabled:bg-gray-500 disabled:cursor-not-allowed w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <CgSpinner className="animate-spin" size={20} />
          ) : (
            "Verify"
          )}
        </button>
      </div>
    </div>
  );
};

export default Verify;
