import React from "react";
import { useRouter } from "next/router";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

function BackArrow() {
  const router = useRouter();
  return (
    <div onClick={() => router.back()} className="ml-4 mt-4 back-arrow">
      <ArrowBackIosIcon />
    </div>
  );
}

export default BackArrow;
