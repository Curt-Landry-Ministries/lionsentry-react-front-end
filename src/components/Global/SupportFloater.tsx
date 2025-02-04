"use client";
import classNames from "classnames";
import { useState } from "react";

const SupportFloater = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="fixed bottom-28 md:bottom-8 right-8 z-10">
        <div
          className="gradient-bg text-2xl text-white rounded-full p-6 w-6 h-6 flex justify-center items-center cursor-pointer bg-"
          onClick={() => setShow(!show)}
        >
          ?
        </div>
        <div
          className={classNames(
            "transition-all h-auto w-64 absolute -top-[200%] right-0 bg-white dark:bg-navy p-3 text-sm rounded-sm",
            {
              "opacity-0 hidden": !show,
              "opacity-100 visible": show,
            }
          )}
        >
          To report a problem, or provide feedback, please contact{" "}
          <a
            href="mailto:lionsentry@curtlandry.com"
            className="underline text-primary font-bold"
          >
            lionsentry@curtlandry.com
          </a>
          .
        </div>
      </div>
    </>
  );
};

export default SupportFloater;
