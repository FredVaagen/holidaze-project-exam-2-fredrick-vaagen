import React from "react";
import { MDBFooter } from "mdb-react-ui-kit";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function Footer() {
  return (
    <MDBFooter className="text-center text-lg-left footer-main ">
      <MDBContainer className="p-4 mt-5">
        <MDBRow>
          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase">ABOUT US</h5>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">ESTABLISHMENTS</h5>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0 ">
            <h5 className="text-uppercase">CONTACT US</h5>
          </MDBCol>

          <MDBCol lg="3" md="6" className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">WORK</h5>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className="d-flex  p-3 bottom-footer justify-content-between">
        <div>
          &copy; {new Date().getFullYear()} Copyright:{" Holidaze, Inc"}
          <a className="text-dark" href="https://mdbootstrap.com/"></a>
          <a className="text-dark" href="https://mdbootstrap.com/">
            Privacy
          </a>
          <a className="text-dark">Terms</a>
          <a className="text-dark">Company Information</a>
        </div>
        <div>
          <a className="text-dark">
            <FacebookIcon />
          </a>
          <a className="text-dark">
            <InstagramIcon />
          </a>
          <a className="text-dark">
            <TwitterIcon />
          </a>
          <a className="text-dark">
            <LinkedInIcon />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .footer-main {
          border-top: 1px solid #e9e9e9;
          font-size: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          flex: 0 1;
          margin-top: 3rem;
      
        }

        .footer-main h5 {
          font-size: 14px;
          text-align: center;
        }

        .bottom-footer {
          font-size: 14px;
          flex-wrap: wrap;
        }

        .bottom-footer a {
          margin-right: 1rem;
        }
      `}</style>
    </MDBFooter>
  );
}
