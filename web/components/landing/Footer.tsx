import Link from "next/link";
import { SiGithub, SiTwitter } from "react-icons/si";

const Footer = () => {
  const links = [
    {
      title: "FAQ",
      href: "/faq",
    },
    // {
    //   title: "Terms",
    //   href: "/terms",
    // },
    // {
    //   title: "Privacy",
    //   href: "/privacy",
    // },
    {
      title: "Support",
      href: "/support",
    },
    {
      title: "Changelog",
      href: "/changelog",
    },
    {
      title: "Promise",
      href: "/promise",
    },
  ];

  const socials = [
    {
      icon: SiGithub,
      href: "https://github.com/sooner-run/sooner",
    },
    {
      icon: SiTwitter,
      href: "https://twitter.com/sooner_run",
    },
  ];

  return (
    <div className="lg:px-20 relative px-5">
      <div className="h-[1px] w-full bg-gradient-to-r absolute right-0 top-0 from-transparent via-accent/20 to-transparent"></div>
      <div className="py-5 flex items-center justify-between">
        <div className="flex items-center gap-x-10">
          <img src="/sooner-logo.svg" alt="" className="w-10" />
          {/* <ul className="flex items-center gap-x-5">
            {links.map((l, i) => (
              <li key={i}>
                <Link
                  href={l.href}
                  className="hover:text-white transition-colors text-grey-100 text-sm"
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul> */}
        </div>
        <ul className="flex items-center gap-x-5">
          {socials.map((s, i) => (
            <li key={i}>
              <Link
                href={s.href}
                className="hover:text-white transition-colors"
                target="_blank"
              >
                {s.icon({ size: 16 })}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
