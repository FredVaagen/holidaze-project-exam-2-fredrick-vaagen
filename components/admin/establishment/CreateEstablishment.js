import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies  } from 'nookies'
import Container from 'react-bootstrap/Container'
import { BASE_URL } from "../../../constants/api";


function CreateEstablishment()  {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const submitData = async (data,ctx) => {
    const token = parseCookies(ctx).token
    try {
      const formDataToSend = {
        name: data.name,
        description: data.description, 
        price: data.price, 
        lat: data.lat, 
        lng: data.lng, 
        address: data.address, 
      };

        const inputValue = await axios({
        url: `${BASE_URL}/establishments`,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        data: formDataToSend
      });


      const id = inputValue.data.id; 
      const formData = new FormData();
      formData.append("files", data.file[0]);
      formData.append("ref", "establishments"); //name of content type
      formData.append("refId", id); //id of content type
      formData.append("field", "promoteImage");
      
      const res = await axios({
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        url: `${BASE_URL}/upload`,
        data: formData
      });
      console.log("Success", res);
    } catch (error) {
      console.log(error);
    }
    router.push({ pathname: `/admin/create/${data.name}`})

  };

  return (
    <Container>
    <div className="create-establishment mt-5 mb-5">
        <h1>Create establishment</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <div><label>Name</label><input type="text" {...register("name")} /></div>
        <div><label>Description</label><textarea type="text" {...register("description")} /></div>
        <div><label>Price per night</label><input type="number" {...register("price")} /></div>
        <div><a target="_blank" href="https://www.latlong.net/"><label>Latitude</label></a><input {...register("lat")} /></div>
        <div><label>Longitude</label><input {...register("lng")} /></div>
        <div><label>Address</label><input type="text" {...register("address")} /></div>
        <div><label>Upload establishment promo/thumbnail image (Maximum of 1)</label><input type="file" {...register("file")} /></div>
        <button>Next...</button>
      </form>
    </div>


    <style global jsx >
			{`

        .main {
          height: auto;
        }

        .main button {
          background: none;
        }

        .main h1 {
          margin-top: 3rem;
          margin-bottom: 3rem;
        }

				.create-establishment input, textarea {
			    width: 100%;
          margin-top: .1rem;
          margin-bottom: 2rem;
          color: black;
				}

        .create-establishment a {
          color: black;
        }

  
        .create-establishment button {
          width: 150px;
        }

			`}
		</style>
    </Container>
  );
};

export default CreateEstablishment;

