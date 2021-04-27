import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function Footer() {
  return (
    <>
      <div className="footer">
      </div>
      <div className="bottom-footer">
        <div className="bottom-footer-left">
          <a>
            {" "}
            &copy; {new Date().getFullYear()} Copyright:{" Holidaze, Inc"}
          </a>
          <a>Privacy</a>
          <a>Terms</a>
        </div>
        <div className="socials bottom-footer-right">
          <a>
            <FacebookIcon />
          </a>
          <a>
            <InstagramIcon />
          </a>
          <a>
            <TwitterIcon />
          </a>
          <a>
            <LinkedInIcon />
          </a>
        </div>
      </div>

      <style jsx global>{`
        .footer {
          font-size: 16px;
          display: flex;
    
          border-top: 1px solid rgb(221, 221, 221);
          justify-content: center;
        }

        .footer ul {
          list-style-type: none;
          display: flex;
        }

        .footer li {
          margin-right: 1rem;
          margin-left: 1rem;
          font-weight: 200;
        }

        .bottom-footer {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          padding: 10px;
          font-weight: 400;
        }

        .bottom-footer a {
          margin-right: 1rem;
          font-size: 10px;
        }

        .socials svg {
          font-size: 16px;
        }

        @media only screen and (max-width: 991px) {
          .bottom-footer {
            margin-bottom: 5rem;
          }
        }

        @media only screen and (max-width: 500px) {
          .footer {
            padding-top: 1rem;
            padding-bottom: 1rem;
          }

          .bottom-footer {
            flex-wrap: wrap;
           
          }

          .socials {
            order: 1;
            width: 90%;
            margin-bottom: 1rem;
          }

          .bottom-footer-left {
            order: 2;
            width: 90%;
          }
        }
      `}</style>
    </>
  );
}
