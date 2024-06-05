import { Link } from "@remix-run/react";
import React from "react";
import ShimmerButton from "../magicui/shimmer-button";
import DotPattern from "../magicui/dot-pattern";
import { cn } from "~/lib/utils";

const Navbar = () => {
  const links = [
    {
      href: "/changelog",
      title: "Changelog",
    },
    {
      href: "/pricing",
      title: "Pricing",
    },
    {
      href: "/blog",
      title: "Blog",
    },
    {
      href: "/promise",
      title: "Promise",
    },
  ];

  return (
    <div className="flex items-center justify-between py-5 px-20 z-50">
      <h3>Sooner</h3>
      <div className="flex items-center gap-x-2 border border-zinc-300/10 p-1 rounded-full backdrop-blur-3xl">
        {links.map((link) => (
          <Link
            to={link.href}
            key={link.href}
            className="border border-transparent hover:border-zinc-300/10 transition-colors duration-500 rounded-full px-4 py-2 hover:bg-accent/5 backdrop-blur-lg text-zinc-400"
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="flex font-medium gap-x-7 text-zinc-300 items-center">
        <Link to="/login">Login</Link>
        <ShimmerButton className="!text-zinc-300 !py-3">
          Get started
        </ShimmerButton>
      </div>
    </div>
  );
};

export default Navbar;
