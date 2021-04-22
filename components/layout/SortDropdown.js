import React from "react";
import Link from "next/link";
import Dropdown from "react-bootstrap/Dropdown";

function SortDropdown() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Sort establishments
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Link href="/establishments/sort/lowest-price">
          <Dropdown.Item>Lowest price</Dropdown.Item>
        </Link>
        <Link href="/establishments/sort/highest-price">
          <Dropdown.Item>Highest price</Dropdown.Item>
        </Link>
        <Link href="/establishments">
          <Dropdown.Item>a-z</Dropdown.Item>
        </Link>
        <Link href="/establishments/sort/z-a">
          <Dropdown.Item>z-a</Dropdown.Item>
        </Link>
      </Dropdown.Menu>
      <style global jsx>
        {`
          .dropdown button {
            background: transparent;
            color: black;
            border: none !important;
          }

          .btn-success:not(:disabled):not(.disabled) .active:focus, .btn-success:not(:disabled):not(.disabled):active:focus, .show>.btn-success.dropdown-toggle:focus {
            box-shadow: none !important;
        }

          .btn-success:not(:disabled):not(.disabled):active {
            background: transparent;
            color: black;
            border: none;
          }

          .dropdown button:hover {
            background: transparent;
            color: black;
           
          }

          .show > .btn-success.dropdown-toggle {
            background: transparent !important;
            border: none !important;
            color: black !important;
          }

          .btn-success:not(:disabled):not(.disabled).active:focus,
          .btn-success:not(:disabled):not(.disabled):active:focus,
          .show > .btn-success.dropdown-toggle:focus {
            box-shadow: 0 0 0 0.2rem rgb(0 0 0 / 50%);
          }

          .dropdown button:focus {
            background: transparent !important;
            color: black !important;
            border: none !important;
            outline: none !important;
          }
          .btn-success:focus {
            background: transparent !important;
            color: black !important;
            border: none !important;
            outline: none !important;
          }

          .btn-success {
            background: transparent !important;
            color: black !important;
            border: none !important;
            box-shadow: none !important;
          }

          .btn-succsess:hover {
            border: 1px solid black !important;
          }

          .dropdown-item:hover {
            background: none;
            font-weight: bold;
          }
        `}
      </style>
    </Dropdown>
  );
}

export default SortDropdown;
