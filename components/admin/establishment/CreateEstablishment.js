import { useState } from "react";
import Link from "next/link";
import router from "next/router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { parseCookies } from "nookies";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import { BASE_URL } from "../../../constants/api";

function CreateEstablishment() {
  //React hook form - Errors for form validation, isSubmitSuccsessful = Used for my useState function to detect if form is submitted.
  const {
    //react-hook-form validation ->
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  // Shows the state of the form. When the form is submitted setShowForm is set to false to hide the form.
  const [showForm, setShowForm] = useState(true);
  //Sets the state of the name of the establishment. setName is set to the form input of the name when form is submitted.
  const [name, setName] = useState(0);
  //Show loading spinner on submit button when loading data ->
  const [loading, setLoading] = useState(false);

  // Function to send the form data and create a new establishment.
  const submitData = async (data, ctx) => {
    const token = parseCookies(ctx).token;
    try {
      //Form  value inputs to be sent to server ->
      const formDataToSend = {
        name: data.name,
        description: data.description,
        price: data.price,
        lat: data.lat,
        lng: data.lng,
        address: data.address,
        category: data.category,
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
          pool: data.pool,
          parking: data.parking,
          kitchen: data.kithcen,
        },
      };
      // Make a post request to upload formdata from the input fields (Not the images).
      const inputValue = await axios({
        url: `${BASE_URL}/establishments`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formDataToSend,
      });
      setLoading(true);
      //input value = the files(images) added to the file input
      const id = inputValue.data.id;
      const formData = new FormData();
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
      formData.append("files", data.file[10]);
      formData.append("ref", "establishments");
      formData.append("refId", id);
      formData.append("field", "images");

      //Make a post request to upload images
      const res = await axios({
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/upload`,
        data: formData,
      });
    } catch (error) {
      if (error) {
        router.back();
      }
    } finally {
      // if post request is ok -> Sets the value of the showForm to false and hides the form.
      setShowForm(false);
      setName(data.name);
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="create-establishment mt-5 mb-5">
        {showForm ? (
          <Form
            noValidate
            className="create-establishment-form"
            //when form is submitted -> fire handleSubmit and submitData, if there are no errors.
            onSubmit={handleSubmit(submitData)}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: true, minLength: 3 })}
              />
              {errors.description && (
                <div className="alert-danger">
                  Name of establishment is required (min 3 characters)
                </div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                type="text"
                {...register("description", { required: true, minLength: 10 })}
              />
            </Form.Group>
            {errors.description && (
              <div className="alert-danger">
                Description of establishment is required (min 10 characters)
              </div>
            )}

            <Form.Group>
              <fieldset>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Hotel"
                    name="hotel"
                    {...register("category", { required: true })}
                    type="radio"
                    value="hotel"
                  />
                  <Form.Check
                    type="radio"
                    label="Guesthouse"
                    name="guesthouse"
                    {...register("category", { required: true })}
                    type="radio"
                    value="guesthouse"
                  />
                  <Form.Check
                    type="radio"
                    label="Bed and breakfast"
                    name="bedandbreakfast"
                    {...register("category", { required: true })}
                    type="radio"
                    value="bedandbreakfast"
                  />
                </Form.Group>
              </fieldset>
              {errors.category && (
                <div className="alert-danger">Category is required</div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Price per night</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <div className="alert-danger">
                  Price of establishment is required
                </div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Latitude -{" "}
                <a target="_blank" href="https://www.latlong.net/">
                  {" "}
                  Click to find latitude and longitude
                </a>
              </Form.Label>

              <Form.Control
                {...register("lat", { required: true })}
                type="number"
                step="0.01"
              />
              {errors.lat && (
                <div className="alert-danger">
                  Latitude of establishment is required
                </div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Longitude -{" "}
                <a target="_blank" href="https://www.latlong.net/">
                  {" "}
                  Click to find latitude and longitude
                </a>{" "}
              </Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                {...register("lng", { required: true })}
              />
              {errors.lng && (
                <div className="alert-danger">
                  Longitude of establishment is required
                </div>
              )}
            </Form.Group>

            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <div className="alert-danger">
                  Address of establishment is required
                </div>
              )}
            </Form.Group>
            <h3 className="mb-3">Facilites</h3>
            <div className="facilities">
              <div>
                <label> WIFI</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("wifi")}
                  />
                </div>
              </div>
              <div>
                <label>Accesible</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("accesible")}
                  />
                </div>
              </div>
              <div>
                <label>Workstation</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("workstation")}
                  />
                </div>
              </div>
              <div>
                <label>Smokefree</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("smokefree")}
                  />
                </div>
              </div>
              <div>
                <label>Aircondition</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("ac")}
                  />
                </div>
              </div>
              <div>
                <label>Airport Shuttle</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("airportshuttle")}
                  />
                </div>
              </div>
              <div>
                <label>Gym</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("gym")}
                  />
                </div>
              </div>
              <div>
                <label>TV</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("tv")}
                  />
                </div>
              </div>
              <div>
                <label>Hotel Bar</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("hotelbar")}
                  />
                </div>
              </div>
              <div>
                <label>Pool</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("pool")}
                  />
                </div>
              </div>
              <div>
                <label>Parking</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("parking")}
                  />
                </div>
              </div>
              <div>
                <label>Kitchen</label>
                <div>
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    {...register("kitchen")}
                  />
                </div>
              </div>
            </div>

            <Form.Group>
              <Form.Label>Upload establishment images</Form.Label>
              <Form.Control
                type="file"
                multiple
                {...register("file", { required: false })}
              />
              {errors.file && (
                <div className="alert-danger">
                  Atleast one image of the establishment is required
                </div>
              )}
            </Form.Group>

            <Button
              variant="contained"
              className="button"
              type="submit"
              onClick={() => {
                // If form fields are touched/filled and form is submitted hide modal form and show confirmation message.
                if (isSubmitSuccessful) {
                  setShowForm(false);
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
                "Submit"
              )}
            </Button>
          </Form>
        ) : (
          <Link href="/establishments/[name]" as={`/establishments/${name}`}>
            <div variant="contained" className="created-confirmation">
              {" "}
              The establishmentwas created. Click to go to {name}.
            </div>
          </Link>
        )}
      </div>

      <style global jsx>
        {`
          .alert-danger {
            background: none;
            color: red;
            font-size: 12px;
          }
          .form-group input,
          .form-group select {
            border: none;
            border: 1px solid rgb(211, 211, 211, 0.8);
          }

          .form-group textarea {
            border: 1px solid rgb(211, 211, 211, 0.8);
            padding: 10px;
          }

          .form-label {
            font-size: 14px;
            font-weight: 300;
          }

          .form-control {
            padding: 0;
            border-radius: 0;
          }

          .button {
            width: 200px !important;
            margin-bottom: 2rem !important;
            margin-top: 2rem !important;
            background: #fff !important;
            color: black !important;
            font-size: 11px !important;
          }

          .form-label {
            font-size: 14px;
            font-weight: 300;
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
          .created-confirmation {
            font-weight: 300;
            text-align: center;
            box-shadow: 0 1px 3px rgb(41 51 57 / 50%);
            padding: 1rem;
          }
          .created-confirmation:hover {
            cursor: pointer;
          }
        `}
      </style>
    </Container>
  );
}

export default CreateEstablishment;
