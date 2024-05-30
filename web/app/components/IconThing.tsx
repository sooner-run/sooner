import React, { FC } from "react";
import { IconType } from "react-icons";

const IconThing: FC<{ icon: IconType }> = ({ icon }) => {
  return (
    <div className="size-10 bg-grey-300 rounded-2xl flex items-center justify-center">
      {icon({ size: 20 })}
    </div>
  );
};

export default IconThing;
