import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Container from 'react-bootstrap/Container'
import { BASE_URL } from './../../../constants/api';

const ImageUpload = (props) => {
  const id = props.id
  const { register, handleSubmit } = useForm();
  
  const submitData = async (data, ctx) => {
      const token = parseCookies(ctx).token
      
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
          Authorization: `Bearer ${token}`
        },
        url: `${BASE_URL}/upload`,
        data: formData
      });
      console.log("Success", res);
    } 
  return (
    <Container>
    <div className="FileUpload">
      <form onSubmit={handleSubmit(submitData)}>
        <div><input hidden type="text" {...register("name")} /></div>
        <div><label>Upload establishment images (Maximum of 5)</label><input type="file" multiple {...register("file")} /></div>
        <button type="submit">Upload</button>
      </form>
    </div>
    <style global jsx >
        {`
      .FileUpload {
        margin-top: 1rem;
      }

	    .FileUpload input {
			  width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
          
	    } 
        .FileUpload button  {
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