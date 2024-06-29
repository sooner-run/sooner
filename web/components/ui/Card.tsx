import React, { FC, ReactNode } from "react";

const Card: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={`w-full rounded-2xl bg-grey-200 border border-grey ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
