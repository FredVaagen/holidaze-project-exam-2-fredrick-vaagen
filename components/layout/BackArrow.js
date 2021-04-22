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
