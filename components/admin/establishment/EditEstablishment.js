import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import Button from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Carousel from "react-bootstrap/Carousel";
import Spinner from "react-bootstrap/Spinner";
import { BASE_URL } from "./../../../constants/api";
import ImageUpload from "./ImageUpload";
import MediaQuery from "../../utility/MediaQuery";

<MediaQuery />;

const EditEstablishment = ({ establishment, images, promoteImage }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isBreakpoint = MediaQuery(1200);

  const submitData = async (data, ctx) => {
    const token = parseCookies(ctx).token;
    try {
      const formDataToSend = {
        description: data.description || establishment.description,
        name: data.name || establishment.name,
        price: data.price || establishment.price,
        lat: data.lat || establishment.lat,
        lng: data.lng || establishment.lng,
        address: data.address || establishment.address,
        category: data.category || establishment.category,
      };

      const res = await axios({
        method: "PUT",
        url: `${BASE_URL}/establishments/${establishment.id}`,
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
          url: `${BASE_URL}/establishments/${establishment.id}`,
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
      <ImageUpload {...establishment} />
      <Container className="establishment-images">
        {isBreakpoint ? (
          <Row className="mb-3">
            <Col>
              <Carousel fade indicators={false}>
                {images.map((image) => (
                  <Carousel.Item key={image.id}>
                    <Image
                      className="d-block w-100"
                      src={image.formats.small.url}
                      alt={image.name}
                      width="1000"
                      height="auto"
                    />
                  </Carousel.Item>
                ))}

                <Carousel.Item>
                  <Image
                    src={promoteImage.formats.small.url}
                    alt={establishment.name}
                    width="1000"
                    height="auto"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        ) : (
          <Row className="no-gutters">
            <Col s={4} md={4} lg={4} className="images mb-3 no-gutters">
              <Image
                src={promoteImage.formats.small.url}
                alt={establishment.name}
                width="1000"
                height="auto"
              />
            </Col>
            <Col className="no-gutters" s={8} md={8} lg={8}>
              {images.slice(0, 4).map((image) => (
                <Image
                  key={image.id}
                  className="detail-images ml-2 mr-2"
                  src={image.formats.small.url}
                  alt={image.name}
                  width="340"
                  height="auto"
                />
              ))}
            </Col>
          </Row>
        )}
      </Container>

      <div className="create-establishment">
        <form onSubmit={handleSubmit(submitData)}>
          <div>
            <label>Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder={establishment.name}
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              {...register("description")}
              placeholder={establishment.description}
            />
          </div>
          <div>
            <label>Price per night</label>
            <input
              type="number"
              {...register("price")}
              placeholder={establishment.price}
            />
          </div>
          <div>
            <label>
              Latitude <a>https://www.latlong.net/</a>
            </label>
            <input {...register("lat")} placeholder={establishment.lat} />
          </div>
          <div>
            <label>Longitude</label>
            <input {...register("lng")} placeholder={establishment.lng} />
          </div>

          <div>
            <div>
              {" "}
              <label>Category</label>
            </div>
            <select name="category" {...register("category")}>
              <option>Current: {establishment.category}</option>
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
              placeholder={establishment.address}
            />
          </div>
          <Button
            variant="contained"
            type="submit"
            className="button"
            onClick={() => {
              setLoading(true);
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
              "Update establishment..."
            )}
          </Button>
        </form>
      </div>

      <form onSubmit={handleSubmit(removeEstablishment)}>
        <Button className="remove mb-5 button" type="submit">
          Remove establishment
        </Button>
      </form>

      <style global jsx>
        {`
          .create-establishment input,
          textarea {
            width: 100%;
            margin-top: 0.1rem;
            margin-bottom: 2rem;
          }
          .establishment-images {
            border-bottom: 1px solid rgb(221, 221, 221);
            display: flex;
            flex-direction: column;
          }

          .MuiSvgIcon-root {
            opacity: 1;
          }

          .images img {
            height: 306px;
          }

          .create-establishment textarea {
            height: 200px;
          }

          .create-establishment button {
            width: 150px;
          }

          .remove {
            margin-top: 3rem;

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
