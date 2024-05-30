import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";

import React, { InputHTMLAttributes } from "react";

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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const username = String(formData.get("username"));
  const firstname = String(formData.get("firstname"));

  const errors: {
    email: string;
    password: string;
    firstname: string;
    username: string;
  } = {
    email: "",
    password: "",
    firstname: "",
    username: "",
  };

  if (!email) {
    errors.email = "Email is required";
  }

  if (!username) {
    errors.username = "Username is required";
  }

  if (!firstname) {
    errors.firstname = "Firstname is required";
  }

  if (!email.includes("@")) {
    errors.email = "Invalid email address";
  }

  if (password.length < 8) {
    errors.password = "Password should be at least 8 characters";
  }

  if (Object.keys(errors).length > 0) {
    return json({ errors });
  }
  return;
}

const Signup = () => {
  const actionData = useActionData<typeof action>();
  return (
    <div className="flex flex-col gap-y-8 items-center justify-center text-sm min-h-screen max-w-[360px] mx-auto">
      <div className="w-full">
        <h1 className="font-semibold text-2xl">Get Started with Sooner</h1>
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-medium">
            Login
          </Link>{" "}
        </p>
      </div>
      <Form method="post" className="flex flex-col gap-y-4 w-full">
        <div className="">
          <Input type="text" name="firstname" placeholder="Firstname" />
          <Error show={!!actionData?.errors.firstname}>
            {actionData?.errors.firstname}
          </Error>
        </div>

        <div>
          <Input type="email" name="email" placeholder="Email" />
          <Error show={!!actionData?.errors.email}>
            {actionData?.errors.email}
          </Error>
        </div>

        <div>
          <Input type="text" name="username" placeholder="Username" />
          <Error show={!!actionData?.errors.username}>
            {actionData?.errors.username}
          </Error>
        </div>

        <div>
          <Input type="password" name="password" placeholder="Password" />
          <Error show={!!actionData?.errors.password}>
            {actionData?.errors.password}
          </Error>
        </div>

        <button
          type="submit"
          className="py-3 bg-accent text-white rounded-2xl font-medium disabled:bg-gray-500 disabled:cursor-not-allowed"
        >
          Sign Up
        </button>
      </Form>
    </div>
  );
};

export default Signup;
