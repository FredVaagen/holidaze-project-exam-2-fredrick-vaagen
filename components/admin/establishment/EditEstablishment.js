import React from "react";
import { useForm } from "react-hook-form";
import { parseCookies  } from 'nookies'
import Container from 'react-bootstrap/Container'
import { BASE_URL } from './../../../constants/api';
import axios from "axios";
import ImageUpload from "./ImageUpload";
import { useRouter } from "next/router";

const EditEstablishment = (props, ctx) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
 
  const submitData = async (data) => {
    const token = parseCookies(ctx).token
    try {
    const formDataToSend = {
      description: data.description || props.description, 
      name: data.name || props.name,
      price: data.price || props.price, 
      lat: data.lat || props.lat, 
      lng: data.lng || props.lng, 
      address: data.address ||props.address, 
    };
    console.log(formDataToSend)

    const res = await axios({
      method: "PUT",
      url: `${BASE_URL}/establishments/${props.id}`,
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
      },
      data: formDataToSend
    });
    console.log("Success", res);

    if (data.name) {
      router.replace(`/admin/editEstablishments/${data.name}`)
    } else router.reload()
  
   
  
  } catch (error) {
    console.log(error);
  }
};

const removeEstablishment = async (ctx) => {
const token = parseCookies(ctx).token
alert(`Are you sure you want to remove this establishment from Holidaze?`)
try {
  const res = await axios({
    method: "DELETE",
    url: `${BASE_URL}/establishments/${props.id}`,
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
  });
  console.log("Success", res);

} catch (error) {
  console.log(error);
}
router.push("/admin")
};

  return (
    <Container>
    <ImageUpload {...props} />
    <div className="create-establishment">
      <form onSubmit={handleSubmit(submitData)}>
      <div><label>Name</label><input type="text" {...register("name")} /></div>
        <div><label>Description</label><textarea type="text" {...register("description")}  /></div>
        <div><label>Price per night</label><input type="number" {...register("price")} /></div>
        <div><label>Latitude <a>https://www.latlong.net/</a></label><input {...register("lat")} /></div>
        <div><label>Longitude</label><input {...register("lng")} /></div>
        <div><label>Address</label><input type="text" {...register("address")}/></div>
        <button type="submit">Create</button>
      </form>
    </div>


   <form onSubmit={removeEstablishment}><button className="remove" type="submit">Remove establishment</button></form >

    <style global jsx >
			{`
				.create-establishment input, textarea {
			    width: 100%;
          margin-top: .1rem;
          margin-bottom: 2rem;
				}

  
        .create-establishment button {
          width: 150px;
        }

        .remove {
          margin-top: 3rem;
          background: none;
          transistion: 1s;
          border: none;
        }
        .remove:hover {
          background: red;
          color: white;
          
         
        }

			`}
		</style>
    </Container>
  );
}

export default EditEstablishment;