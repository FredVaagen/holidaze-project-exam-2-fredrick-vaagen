import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { parseCookies } from "nookies";
import Container from "react-bootstrap/Container";
import Button from "@material-ui/core/Button";
import { BASE_URL } from "./../../../constants/api";

const ImageUpload = (props) => {
  const id = props.id;
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const submitData = async (data, ctx) => {
    const token = parseCookies(ctx).token;

    const formData = new FormData();
    formData.append("files", data.file[0]);
    formData.append("files", data.file[1]);
    formData.append("files", data.file[2]);
    formData.append("files", data.file[3]);
    formData.append("files", data.file[4]);
    formData.append("ref", "establishments"); //name of content type
    formData.append("refId", id); //id of content type
    formData.append("field", "images");
    const res = await axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/upload`,
      data: formData,
    });
    console.log("Success", res);
    router.reload();
  };
  return (
    <Container>
      <div className="FileUpload">
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <input hidden type="text" {...register("name")} />
          </div>
          <div>
            <label>Upload detail images  (4 images are recommended)</label>
            <input type="file" multiple {...register("file")} />
          </div>
          <Button type="submit">Upload</Button>
        </form>
      </div>
      <style global jsx>
        {`
          .FileUpload {
            margin-top: 1rem;
          }

          .FileUpload input {
            width: 100%;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .FileUpload button {
            width: 200px;
            margin-top: 2rem;
            margin-bottom: 2rem;
          }
        `}
      </style>
    </Container>
  );
};

export default ImageUpload;
