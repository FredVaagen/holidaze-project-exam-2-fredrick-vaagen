import React, { useState,  } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import Button from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import { BASE_URL } from "./../../../constants/api";
import ImageUpload from "./ImageUpload";



const EditEstablishment = (props) => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [price, setPrice] = useState(props.price)
  const [address, setAddress] = useState(props.address)

  const submitData = async (data, ctx) => {
    const token = parseCookies(ctx).token;
    try {
      const formDataToSend = {
        description: data.description || props.description,
        name: data.name || props.name,
        price: data.price || props.price,
        lat: data.lat || props.lat,
        lng: data.lng || props.lng,
        address: data.address || props.address,
        category: data.category || props.category,
      };

      const res = await axios({
        method: "PUT",
        url: `${BASE_URL}/establishments/${props.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formDataToSend,
      });

      if (data.name) {
        router.replace(`/admin/edit/${data.name}`);
      }

      if (res) {
        refreshData();
        setPrice(data.price);
        setAddress(data.address)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeEstablishment = async (ctx) => {
    const token = parseCookies(ctx).token;
    if (confirm("Are you sure you want to remove this establishment?")) {
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
      router.back();
    } else {
      router.reload();
    }
  };
  return (
    <Container>
      <h2 className="mt-5 mb-5">Update establishment</h2>
      <ImageUpload {...props} />
      <div className="create-establishment">
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <label>Name</label>
            <input type="text" {...register("name")} placeholder={props.name} />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              {...register("description")}
              placeholder={props.description}
            />
          </div>
          <div>
            <label>Price per night - NOK {price}</label>
            <input
              type="number"
              {...register("price")}
              placeholder={props.price}
            /> 
          </div>
          <div>
            <div className="mb-3">
              Find longtide and latitude - <a>https://www.latlong.net/</a>
            </div>
            <label>Latitude</label>
            <input {...register("lat")} placeholder={props.lat} />
          </div>
          <div>
            <label>Longitude</label>
            <input {...register("lng")} placeholder={props.lng} />
          </div>
          <div>
            <div>
              {" "}
              <label>Category - {props.category}</label>
            </div>
            <select name="category" {...register("category")}>
              <option>hotel</option>
              <option>guesthouse</option>
              <option>bedandbreakfast</option>
            </select>
          </div>
          <div>
            <label className="mt-3">Address - {address}</label>
            <input
              type="text"
              {...register("address")}
              placeholder={props.address}
            />
          </div>
          <Button variant="contained" type="submit" className="button">
            Update
          </Button>
        </form>
      </div>

      <form onSubmit={handleSubmit(removeEstablishment)}>
        <button className="remove" type="submit">
          Remove establishment
        </button>
      </form>

      <style global jsx>
        {`
          .create-establishment input,
          textarea {
            width: 100%;
            margin-top: 0.1rem;
            margin-bottom: 2rem;
          }
          .MuiSvgIcon-root {
            opacity: 1;
          }

          .create-establishment textarea {
            height: 200px;
          }
          .create-establishment button {
            width: 150px;
          }
          .remove {
            margin-top: 3rem;
            margin-bottom: 3rem;
            background: none;
            transistion: 1s;
            border: 1px solid black;
            
          }
          .remove:hover {
            background: red;
            color: white;
          }
          .button {
            width: 200px !important;
            margin-bottom: 2rem !important;
            background: #fff !important;
            color: black !important;
            font-size: 11px !important;
          }


        `}
      </style>
    </Container>
  );
};

export default EditEstablishment;
