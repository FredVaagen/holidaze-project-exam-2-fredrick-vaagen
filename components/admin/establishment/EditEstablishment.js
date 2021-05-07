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


  if (props.facilities.wifi == null || props.facilities.wifi == false) {  
   let [wifiChecked, setWifiChecked] = useState(false);
  
  } else let [wifiChecked, setWifiChecked] = useState(true);

  let [accesibleChecked, setAccesibleChecked] = useState(true);
  if (
    props.facilities.accesible == null ||
    props.facilities.accesible == false
  ) {
    accesibleChecked = false;
  }

  let  [workstationChecked, setWorkstationChecked] = useState(true);
  if (
    props.facilities.workstation == null ||
    props.facilities.workstation == false
  ) {
    workstationChecked = false;
  }
  let [smokefreeChecked, setSmokefreeChecked] = useState(true);
  if (
    props.facilities.smokefree == null ||
    props.facilities.smokefree == false
  ) {
    smokefreeChecked = false;
  }
  let [airconditionChecked, setAirconditionChecked] = useState(true);
  if (
    props.facilities.ac == null ||
    props.facilities.ac == false
  ) {
    airconditionChecked = false;
  }
  let  [airportshuttleChecked, setAirportshuttleChecked] = useState(true);
  if (
    props.facilities.airportshuttle == null ||
    props.facilities.airportshuttle == false
  ) {
    airportshuttleChecked = false;
  }

  let [gymChecked, setGymChecked] = useState(true);
  if (
    props.facilities.gym == null ||
    props.facilities.gym == false
  ) {
    gymChecked = false;
  }

  let [tvChecked, setTvChecked] = useState(true);
  if (
    props.facilities.tv == null ||
    props.facilities.tv == false
  ) {
    tvChecked = false;
  }

  let [hotelbarChecked, setHotelBarChecked] = useState(true);
  if (
    props.facilities.hotelbar == null ||
    props.facilities.hotelbar == false
  ) {
    hotelbarChecked = false;
  }

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
          accesible: data.accesible,
          workstation: data.workstation,
          smokefree: data.smokefree,
          ac: data.ac,
          airportshuttle: data.airportshuttle,
          gym: data.gym,
          tv: data.tv,
          wifi: data.wifi,
          hotelbar: data.hotelbar,
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
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setWifiChecked(!wifiChecked)}
                    defaultChecked={wifiChecked}
                    {...register("wifi")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <label>Accesible</label>
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setAccesibleChecked(!accesibleChecked)}
                    defaultChecked={accesibleChecked}
                    {...register("accesible")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <label>Workstation</label>
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setWorkstationChecked(!workstationChecked)}
                    defaultChecked={workstationChecked}
                    {...register("workstation")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <label>Smokefree</label>
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setSmokefreeChecked(!smokefreeChecked)}
                    defaultChecked={smokefreeChecked}
                    {...register("smokefree")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <label>Aircondition</label>
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setAirconditionChecked(!airconditionChecked)}
                    defaultChecked={airconditionChecked}
                    {...register("ac")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <label>Airport Shuttle</label>
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setAirportshuttleChecked(!airportshuttleChecked)}
                    defaultChecked={airportshuttleChecked}
                    {...register("airportshuttle")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <label>Gym</label>
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setGymChecked(!gymChecked)}
                    defaultChecked={gymChecked}
                    {...register("gym")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <label>TV</label>
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setTvChecked(!tvChecked)}
                    defaultChecked={tvChecked}
                    {...register("tv")}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            </div>
            <div>
              <label>Hotel Bar</label>
              <div>
                <label className="switch">
                  <input
                    type="checkbox"
                    onChange={() => setHotelBarChecked(!hotelbarChecked)}
                    defaultChecked={hotelbarChecked}
                    {...register("hotelbar")}
                  />
                  <span className="slider round"></span>
                </label>
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

          .switch {
            position: relative;
            display: inline-block;
            width: 60px;
            height: 34px;
          }

          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }

          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            -webkit-transition: 0.4s;
            transition: 0.4s;
          }

          .slider:before {
            position: absolute;
            content: "";
            height: 26px;
            width: 26px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
          }

          input:checked + .slider {
            background-color: #2196f3;
          }

          input:focus + .slider {
            box-shadow: 0 0 1px #2196f3;
          }

          input:checked + .slider:before {
            -webkit-transform: translateX(26px);
            -ms-transform: translateX(26px);
            transform: translateX(26px);
          }

          .slider.round {
            border-radius: 34px;
          }

          .slider.round:before {
            border-radius: 50%;
          }
        `}
      </style>
    </Container>
  );
};

export default EditEstablishment;
