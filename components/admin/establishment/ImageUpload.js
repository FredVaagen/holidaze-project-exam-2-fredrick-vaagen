import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { parseCookies } from "nookies";
import Container from "react-bootstrap/Container";
import Button from "@material-ui/core/Button";
import { BASE_URL } from "./../../../constants/api";

const ImageUpload = (props) => {
  const id = props.id;
  //react-hook-form validation ->
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty },
  } = useForm();
  const router = useRouter();

  //Image confirmation upload confirmation message. Fires if upload is complete ->
  const [imageConfirmationMessage, setImageConfirmationMessage] =
    useState(false);

  const submitData = async (data, ctx) => {
    const token = parseCookies(ctx).token;

    const formData = new FormData();
    //appends the data files (images) ->
    formData.append("files", data.file[0]);
    formData.append("files", data.file[1]);
    formData.append("files", data.file[2]);
    formData.append("files", data.file[3]);
    formData.append("files", data.file[4]);
    formData.append("files", data.file[5]);
    formData.append("files", data.file[6]);
    formData.append("files", data.file[7]);
    formData.append("files", data.file[8]);
    formData.append("files", data.file[9]);
    formData.append("ref", "establishments"); //name of content type
    formData.append("refId", id); //id of content type
    formData.append("field", "images");
    //Make post request to server/upload with token ->
    const res = await axios({
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      url: `${BASE_URL}/upload`,
      data: formData,
    });
    //If ok -> reload page
    if (res) {
      console.log("Success", res);
      setImageConfirmationMessage(true);
    }
  };
  return (
    <Container>
      <div className="fileUpload">
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <input hidden type="text" {...register("name")} />
          </div>
          <div>
            <label>Upload more images (Max 10 images each upload)</label>
            <input
              type="file"
              name="file"
              multiple
              className="input-file"
              {...register("file", { required: true })}
            />
          </div>
          {isDirty ? (
            <Button
              variant="contained"
              type="submit"
              className="button mt-3"
              onClick={() => {
                if (isSubmitSuccessful) {
                  setImageConfirmationMessage(true);
                }
              }}>
              Upload image(s)
            </Button>
          ) : (
            <></>
          )}
          {errors.file && (
            <div className="alert-danger">Image input cannot be empty.</div>
          )}
          {imageConfirmationMessage ? (
            <div className="alert-success pl-3 pb-3">Image was uploaded</div>
          ) : (
            <></>
          )}
        </form>
      </div>
      <style global jsx>
        {`
          .alert-danger {
            background: none;
            color: red;
            font-size: 12px;
          }
          .alert-success {
            background: none;
            color: green;
            font-size: 12px;
          }
          .fileUpload {
            margin-top: 1rem;
            margin-bottom: 3rem;
          }

          .fileUpload label {
            font-weight: 300;
          }

          .fileUpload input {
            width: 100%;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          .fileUpload button {
            width: 200px !important;
            margin-bottom: 2rem !important;
            background: #fff;
            color: black !important;
            font-size: 11px !important;
            box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
              0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%) !important;
          }
        `}
      </style>
    </Container>
  );
};

export default ImageUpload;
