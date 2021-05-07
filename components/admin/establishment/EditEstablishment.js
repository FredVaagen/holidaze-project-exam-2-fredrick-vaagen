import { useState } from "react";
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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log(props.facilities.wifi);

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
        facilities: {
          accesible: data.accesible || props.facilities.accesible,
          workstation: data.workstation || props.facilities.workstation,
          smokefree: data.smokefree || props.facilities.smokefree,
          ac: data.ac || props.facilities.ac,
          airportshuttle: data.airportshuttle || props.facilities.airportshuttle,
          gym: data.gym || props.facilities.gym,
          tv: data.tv || props.facilities.tv,
          wifi: data.wifi || props.facilities.wifi,
          hotelbar: data.hotelbar || props.facilities.hotelbar,
        },
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
      console.log("Success", res);
      if (data.name) {
        router.replace(`/admin/edit/${data.name}`);
      } else router.reload();
    } catch (error) {}
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
      } catch (error) {}
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
            <label>Price per night</label>
            <input
              type="number"
              {...register("price")}
              placeholder={props.price}
            />
          </div>
          <div>
            <label>
              Latitude <a>https://www.latlong.net/</a>
            </label>
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
            <label>Address</label>
            <input
              type="text"
              {...register("address")}
              placeholder={props.address}
            />
          </div>
          <h3 className="mb-3">Facilites</h3>
          <div className="facilities">
            <div>
              <label> WIFI</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.wifi}
                  {...register("wifi")}
                />
              </div>
            </div>
            <div>
              <label>Accesible</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.accesible}
                  {...register("accesible")}
                />
              </div>
            </div>
            <div>
              <label>Workstation</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.workstation}
                  {...register("workstation")}
                />
              </div>
            </div>
            <div>
              <label>Smokefree</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.smokefree}
                  {...register("smokefree")}
                />
              </div>
            </div>
            <div>
              <label>Aircondition</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.ac}
                  {...register("ac")}
                />
              </div>
            </div>
            <div>
              <label>Airport Shuttle</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.airportshuttle}
                  {...register("airportshuttle")}
                />
              </div>
            </div>
            <div>
              <label>Gym</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.gym}
                  {...register("gym")}
                />
              </div>
            </div>
            <div>
              <label>TV</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.tv}
                  {...register("tv")}
                />
              </div>
            </div>
            <div>
              <label>Hotel Bar</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.hotelbar}
                  {...register("hotelbar")}
                />
              </div>
            </div>
          </div>

          <Button type="submit">Update</Button>
        </form>
      </div>

      <form onSubmit={handleSubmit(removeEstablishment)}>
        <button className="remove mb-5" type="submit">
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

          .create-establishment textarea {
            height: 200px;
          }

          .create-establishment button {
            width: 150px;
          }

          .remove {
            margin-top: 3rem;
            background: none;
            transistion: 1s;
            border: 1px solid black;
          }
          .remove:hover {
            background: red;
            color: white;
          }
          .MuiButtonBase-root {
            width: 200px !important;
            margin-bottom: 2rem !important;
            background: RGB(106, 126, 230) !important;
            color: white !important;
            font-size: 11px !important;
          }

          .MuiButtonBase-root:hover {
            background: RGB(66, 87, 194);
          }

          .facilities {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            text-align: center;
            margin-bottom: 3rem;
          }
        `}
      </style>
    </Container>
  );
};

export default EditEstablishment;
