import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "axios";
import { parseCookies } from "nookies";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Button from "@material-ui/core/Button";
import { BASE_URL } from "../../../constants/api";

function CreateEstablishment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submitData = async (data, ctx) => {
    const token = parseCookies(ctx).token;
    try {
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
        },
      };

      const inputValue = await axios({
        url: `${BASE_URL}/establishments`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: formDataToSend,
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
          Authorization: `Bearer ${token}`,
        },
        url: `${BASE_URL}/upload`,
        data: formData,
      });
      console.log("Success", res);
    } catch (error) {
      console.log(error);
    }
    router.push({ pathname: `/admin/create/${data.name}` });
  };

  return (
    <Container>
      <div className="create-establishment mt-5 mb-5">
        <Form
          noValidate
          className="create-establishment-form"
          onSubmit={handleSubmit(submitData)}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
            />
            {errors.description && (
              <div className="alert-danger">
                Name of establishment is required
              </div>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              {...register("description", { required: true })}
            />
          </Form.Group>
          {errors.description && (
            <div className="alert-danger">
              Description of establishment is required
            </div>
          )}

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control as="select" name="category" {...register("category")}>
              <option></option>
              <option>hotel</option>
              <option>guesthouse</option>
              <option>bedandbreakfast</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Price per night</Form.Label>

            <Form.Control
              type="number"
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

            <Form.Control {...register("lat", { required: true })} />
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
            <Form.Control {...register("lng", { required: true })} />
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
          </div>

          <Form.Group>
            <Form.Label>
              Upload establishment promo/thumbnail image (Maximum of 1)
            </Form.Label>
            <Form.Control
              type="file"
              {...register("file", { required: true })}
            />
            {errors.file && (
              <div className="alert-danger">
                A promomotioan/main image is required
              </div>
            )}
          </Form.Group>
          <Button
            variant="contained"
            type="submit"
            className="button"
            onClick={() => {
              setLoading(true);
              if(errors) {
                setLoading(false)
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
              "Next..."
            )}
          </Button>
        </Form>
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
            border: 1px solid rgb(106, 126, 230);
          }

          .form-group textarea {
            border: 1px solid rgb(106, 126, 230);
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
        `}
      </style>
    </Container>
  );
}

export default CreateEstablishment;
