import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import Button from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import { BASE_URL } from "./../../../constants/api";
import ImageUpload from "./ImageUpload";

const EditEstablishment = (props) => {
  //react-hook-form validation ->
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, isDirty },
  } = useForm();
  const router = useRouter();
  //Checks if there is an update to the form ->
  const [update, setUpdate] = useState(false);
  //Toast message box (show) is set to true  if the page is updated ->
  const [showToast, setShowToast] = useState(false);

  //Show loading spinner on submit button when loading data ->
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const submitData = async (data, ctx) => {
    //Gets token
    const token = parseCookies(ctx).token;
    try {
      //The form data of the edit form. Push new data if there is new, or push the old.
      const formDataToSend = {
        description: data.description || props.description,
        name: data.name || props.name,
        price: data.price || props.price,
        lat: data.lat || props.lat,
        lng: data.lng || props.lng,
        address: data.address || props.address,
        category: data.category || props.category,
        facilities: {
          accesible: data.accesible || props.accesible,
          workstation: data.workstation || props.workstation,
          smokefree: data.smokefree || props.smokefree,
          ac: data.ac || props.ac,
          airportshuttle: data.airportshuttle || props.airportshuttle,
          gym: data.gym || props.gym,
          tv: data.tv || props.tv,
          wifi: data.wifi || props.wifi,
          hotelbar: data.hotelbar || props.hotelbar,
          pool: data.pool || props.pool,
          parking: data.parking || props.parking,
          kitchen: data.kitchen || props.kitchen,
        },
      };
      setLoading(true);
      // Makes a PUT request to update establishment data.
      await axios({
        method: "PUT",
        url: `${BASE_URL}/establishments/${props.id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formDataToSend,
      });
     

      if (data.name) {
        //If you change the name of the establishment -> Update the URL
        router.replace(`/admin/edit/${data.name}`);
      }
      // If request is ok -> refreshData
    } catch (error) {
      router.back();
    } finally {
      setLoading(false);
      setUpdate(true);
      refreshData();
    }
  };
  //Function to remove/delete a establishment
  const removeEstablishment = async (ctx) => {
    const token = parseCookies(ctx).token;
    //If you press confirm on the alert box ->
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
      } catch (error) {}
      //If delete request ok -> goes back to all the establishments edit page ->
      router.back();
      //If you press NO reload page.
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
              step="0.01"
              {...register("price")}
              placeholder={props.price}
            />
          </div>
          <div>
            <div className="mb-3">
              Find longtide and latitude - <a>https://www.latlong.net/</a>
            </div>
            <label>Latitude</label>
            <input
              type="number"
              step="0.01"
              {...register("lat")}
              placeholder={props.lat}
            />
          </div>
          <div>
            <label>Longitude</label>
            <input
              type="number"
              step="0.01"
              {...register("lng")}
              placeholder={props.lng}
            />
          </div>
          <div className="category">
            <div>
              {" "}
              <label>Category: {props.category}</label>
            </div>
            <div>
              <label>Hotel</label>
              <input
                type="radio"
                name="hotel"
                {...register("category")}
                type="radio"
                value="hotel"
              />
            </div>
            <div>
              <label>Guesthouse</label>
              <input
                type="radio"
                label="Guesthouse"
                name="guesthouse"
                {...register("category")}
                type="radio"
                value="guesthouse"
              />
            </div>
            <label>Bed and breakfast</label>
            <input
              type="radio"
              label="Bed and breakfast"
              name="bedandbreakfast"
              {...register("category")}
              type="radio"
              value="bedandbreakfast"
            />
          </div>
          <div>
            <label className="mt-3">Address</label>
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
            <div>
              <label>Pool</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.pool}
                  {...register("pool")}
                />
              </div>
            </div>
            <div>
              <label>Parking</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.parking}
                  {...register("parking")}
                />
              </div>
            </div>
            <div>
              <label>Kitchen</label>
              <div>
                <input
                  type="checkbox"
                  defaultChecked={props.facilities.kitchen}
                  {...register("kitchen")}
                />
              </div>
            </div>
          </div>
          {isDirty ? (
            <Button
              variant="contained"
              type="submit"
              className="button"
              onClick={() => {
                if (isSubmitSuccessful) {
                  setUpdate(true);
                  setShowToast(true);
                }
              }}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Update"
              )}
            </Button>
          ) : (
            <></>
          )}

          {update ? (
            <>
              <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide>
                <Toast.Body>Establishment has been updated.</Toast.Body>
              </Toast>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>

      <form onSubmit={handleSubmit(removeEstablishment)}>
        <button className="remove" type="submit">
          Remove establishment
        </button>
      </form>

      <style global jsx>
        {`
          h2 {
            font-weight: 300;
          }
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
          .category input {
            width: 20px;
          }
          .facilities {
            display: flex;
            justify-content: space-between;
            text-align: center;
            margin-bottom: 3rem;
          }

          @media only screen and (max-width: 1110px) {
            .facilities {
              display: block;
              text-align: left;
            }
          }
        `}
      </style>
    </Container>
  );
};

export default EditEstablishment;
