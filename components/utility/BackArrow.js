import React from "react";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function BackArrow() {
  //Funtion to return the user to the last page they were on -> 
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
            padding-left: 2rem;
            opacity: 0.5;
          }

          .back-arrow:hover {
            cursor: pointer;
            
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
