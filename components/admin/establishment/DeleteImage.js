  
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import Image from "next/image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { BASE_URL } from "./../../../constants/api";
import MediaQuery from "../../utility/MediaQuery";

<MediaQuery/>

function DeleteImage({images, promoteImage}) {
  const { handleSubmit } = useForm();
  const router = useRouter();
  const isBreakpoint = MediaQuery(1200);
  const removeImageOne = async (ctx) => {
    const token = parseCookies(ctx).token;
    if (confirm("Are you sure you want to remove this image?")) {
      try {
        const res = await axios({
          method: "DELETE",
          url: `${BASE_URL}/upload/files/${images[0].id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Success", res);
        router.reload();
      } catch (error) {
        console.log("Error");
      }
    }
  };

  const removeImageTwo = async (ctx) => {
    const token = parseCookies(ctx).token;
    if (confirm("Are you sure you want to remove this image?")) {
      try {
        const res = await axios({
          method: "DELETE",
          url: `${BASE_URL}/upload/files/${images[1].id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Success", res);
        router.reload();
      } catch (error) {
        console.log("Error");
      }
    }
  };

  const removeImageThree = async (ctx) => {
    const token = parseCookies(ctx).token;
    if (confirm("Are you sure you want to remove this image?")) {
      try {
        const res = await axios({
          method: "DELETE",
          url: `${BASE_URL}/upload/files/${images[2].id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Success", res);
        router.reload();
      } catch (error) {
        console.log("Error");
      }
    }
  };

  const removeImageFour = async (ctx) => {
    const token = parseCookies(ctx).token;
    if (confirm("Are you sure you want to remove this image?")) {
      try {
        const res = await axios({
          method: "DELETE",
          url: `${BASE_URL}/upload/files/${images[3].id}`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Success", res);
        router.reload();
      } catch (error) {
        console.log("Error");
      }
    }
  };
  return (
      
    <Container className="remove-images">
          <Container className="establishment-images">

          {isBreakpoint ? (
            <Row>
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
                      alt={promoteImage.name}
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
                  alt={promoteImage.name}
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
                    width="330"
                    height="auto"
                  />
                ))}
              </Col>
            </Row>
          )}
        </Container>
      <DropdownButton
        id="dropdown-basic-button"
        title="Remove images"
        className="dropdown-button">
        <Dropdown.Item href="#/action-1">
          <form className="remove-form" onSubmit={handleSubmit(removeImageOne)}>
            <button type="submit">
              <DeleteForeverIcon />
              Remove top left image
            </button>
          </form>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-2">
          {" "}
          <form className="remove-form" onSubmit={handleSubmit(removeImageTwo)}>
            <button type="submit">
              <DeleteForeverIcon />
              Remove top right image
            </button>
          </form>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          {" "}
          <form className="remove-form" onSubmit={handleSubmit(removeImageThree)}>
            <button type="submit">
              <DeleteForeverIcon />
              Remove bottom left image
            </button>
          </form>
        </Dropdown.Item>
        <Dropdown.Item href="#/action-3">
          {" "}
          <form className="remove-form" onSubmit={handleSubmit(removeImageFour)}>
            <button className="remove-button" type="submit">
              <DeleteForeverIcon />
              Remove bottom right image
            </button>
          </form>
        </Dropdown.Item>
      </DropdownButton>
      <style global jsx>{`
        .dropdown-button button {
          width: 100% !important;
          margin-bottom: 2rem !important;
          background: #fff !important;
          color: black !important;
          font-size: 11px !important;
          border: 1px solid black;
        }
        .remove-form button {
            border: none !important;
            background: none !important;
            display: flex;
        }
        
        .images img {
            height: 306px;
            
          }
      `}</style>
    </Container>
  );
}

export default DeleteImage;