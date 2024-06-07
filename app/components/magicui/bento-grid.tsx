// import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { BiArrowToRight } from "react-icons/bi";
import { ReactNode } from "react";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
}: {
  name: string;
  className: string;
  background: string;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl border border-zinc-800",
      className
    )}
  >
    {background && (
      <div className="h-full relative">
        <div className="absolute bg-gradient-to-b from-transparent to-zinc-900 inset-0 top-0 right-0"></div>
        <img src={background} alt="" />
      </div>
    )}
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300">
      <Icon className="text-neutral-700 transition-all duration-300 ease-in-out" />
      <h3 className="text-grey-100">{name}</h3>
      <p className="max-w-lg text-white text-xs">{description}</p>
    </div>
  </div>
);

export { BentoCard, BentoGrid };
