import React from "react";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function BackArrow() {
  const router = useRouter();
  return (
    <div onClick={() => router.back()} className="back-arrow">
      <ArrowBackIosIcon />
      Back
      <style jsx global>
        {`
          .back-arrow {
            margin-top: 2rem;
            transition: 0.3s;
            margin-left: 1rem;
            opacity: 0.5;
          }

          .back-arrow:hover {
            cursor: pointer;
            transform: scale(1.01);
            opacity: 1;
          }
          .MuiSvgIcon-root {
            font-size: 1rem;

            font-weight: 200;
            opacity: 0.5;
            margin-bottom: 1px;
          }
        `}
      </style>
    </div>
  );
}

export default BackArrow;
