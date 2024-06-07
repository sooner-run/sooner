import { axiosPublic } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return (
    <input
      type="text"
      {...props}
      className="w-full bg-transparent rounded-2xl border border-gray-600 pl-3 py-3 outline-none focus:border-accent transition-all"
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
    <p
      className={`${show ? "opacity-100" : "opacity-0"} transition-colors text-xs mt-1 h-4 text-red-500`}
    >
      {children || "mamam"}
    </p>
  );
};

// export async function action({ request }: ActionFunctionArgs) {
//   const formData = await request.formData();
//   const email = String(formData.get("email"));
//   const password = String(formData.get("password"));

//   const errors: {
//     email: string;
//     password: string;
//     firstname: string;
//     username: string;
//     global: string;
//   } = {
//     email: "",
//     password: "",
//     firstname: "",
//     username: "",
//     global: "",
//   };

//   if (!email) {
//     errors.email = "Email is required";
//   }

//   if (!email.includes("@")) {
//     errors.email = "Invalid email address";
//   }

//   if (!password) {
//     errors.password = "Password is required";
//   }

//   const hasErrors = Object.values(errors).some((error) => error !== "");

//   if (hasErrors) {
//     return json({ errors });
//   } else {
//     try {
//       const { data } = await axios.post("http://localhost:1716/auth/login", {
//         email,
//         password,
//       });

//       const cookie = serialize("sooner.auth-token", data.token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//         path: "/",
//         expires: dayjs().add(30, "days").toDate(),
//       });

//       return redirect("/dashboard", {
//         headers: {
//           "Set-Cookie": cookie,
//         },
//       });
//     } catch (error: any) {
//       return json({
//         errors: { ...errors, global: error.response.data.message },
//       });
//     }
//   }
// }

const Login = () => {
  //   const actionData = useActionData<typeof action>();

  //   const hasGlobalError =
  //     actionData && "errors" in actionData && actionData.errors.global;
  //   const emailError =
  //     actionData && "errors" in actionData && actionData.errors.email;
  //   const passwordError =
  //     actionData && "errors" in actionData && actionData.errors.password;

  const [payload, setPayload] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-8 items-center justify-center text-sm min-h-screen max-w-[360px] mx-auto">
      <div className="w-full">
        <h1 className="font-semibold text-2xl">Sign in to Sooner</h1>
        <p className="text-gray-400">
          {`Don't have an account?`}{" "}
          <Link href="/signup" className="text-accent font-medium">
            Get started
          </Link>{" "}
        </p>

        {/* <Error show={!!hasGlobalError}>{hasGlobalError}</Error> */}
      </div>
      <form
        className="flex flex-col gap-y-4 w-full"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await axiosPublic.post("/auth/login", payload, {
              // setSubmitting(true)
              //   signal: newAbortSignal(5000)
            });
            // router.push("/app");
          } catch (error: any) {
            console.log(error);
          } finally {
          }
        }}
      >
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setPayload({ ...payload, email: e.target.value })}
          />
          {/* <Error show={!!emailError}>{emailError}</Error> */}
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) =>
              setPayload({ ...payload, password: e.target.value })
            }
          />
          {/* <Error show={!!passwordError}>{passwordError}</Error> */}
        </div>

        <button
          type="submit"
          className="py-3 bg-accent text-white rounded-2xl font-medium disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
