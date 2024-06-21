import React, { FC, ReactNode } from "react";

const Modal: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen w-full fixed top-0 right-0 z-10 backdrop-blur-sm flex items-center justify-center">
      {children}
    </div>
  );
};

export default Modal;
