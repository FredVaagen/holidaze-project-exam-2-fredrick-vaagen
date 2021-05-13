import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { parseCookies } from "nookies";
import Button from "@material-ui/core/Button";
import Container from "react-bootstrap/Container";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { BASE_URL } from "./../../../constants/api";

function DeleteImage(images) {
  const { handleSubmit } = useForm();
  const router = useRouter();
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
      `}</style>
    </Container>
  );
}

export default DeleteImage;
