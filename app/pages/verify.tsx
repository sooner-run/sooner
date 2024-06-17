import { axios } from "@/utils/axios";
import { useLogSnag } from "@logsnag/next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import OTPInput from "react-otp-input";

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
  const [error, setError] = useState("");

  const router = useRouter();

  const { setUserId } = useLogSnag();

  const handleVerify = async () => {
    setSubmitting(true);
    setError("");
    try {
      const { data } = await axios.post("/auth/verify", { otp });
      setUserId(data.id);
      router.push("/onboarding");
    } catch (error: any) {
      setError(error.response.data.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

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
          onClick={handleVerify}
        >
          {isSubmitting ? (
            <CgSpinner className="animate-spin" size={20} />
          ) : (
            "Verify"
          )}
        </button>
        <Error show={!!error}>{error}</Error>
      </div>
    </div>
  );
};

export default Verify;
