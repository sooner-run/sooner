import Link from "next/link";
import ShimmerButton from "../magicui/shimmer-button";

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
    // {
    //   href: "/blog",
    //   title: "Blog",
    // },
    {
      href: "/promise",
      title: "Promise",
    },
  ];

  return (
    <div className="flex items-center justify-between py-5 lg:px-20 px-5 sticky z-30 top-0 backdrop-blur-lg">
      <Link href="/">
        <img src="/logo.png" alt="Sooner logo" className="w-28" />
      </Link>
      <div className="lg:flex hidden items-center gap-x-2 border border-zinc-300/10 p-1 rounded-full backdrop-blur-3xl">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className="border border-transparent hover:border-zinc-300/10 transition-colors duration-500 rounded-full px-4 py-2 hover:bg-accent/5 backdrop-blur-lg text-zinc-400"
          >
            {link.title}
          </Link>
        ))}
      </div>
      <div className="lg:flex hidden font-medium gap-x-7 text-zinc-300 items-center">
        <Link href="/login">Login</Link>
        <ShimmerButton className="!text-zinc-300 !py-3">
          Get started
        </ShimmerButton>
      </div>

      <div className="h-[1px] w-full bg-gradient-to-r absolute right-0 bottom-0 from-transparent via-accent/20 to-transparent"></div>
    </div>
  );
};

export default Navbar;
