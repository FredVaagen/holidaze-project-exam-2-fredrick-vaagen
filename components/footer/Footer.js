import React from "react";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

export default function Footer() {
  return (
    <>
      <div className="footer">
        <ul>
          <li><a>About</a></li>
          <li><a>Places</a></li>
          <li><a>Contact</a></li>
          <li><a>Become a host</a></li>
        </ul>
      </div>
      <div className="bottom-footer">
        <div>
        
          <a>  &copy; {new Date().getFullYear()} Copyright:{" Holidaze, Inc"}</a>
          <a>Privacy</a>
          <a>Terms</a>
        </div>
        <div className="socials">
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
          font-size: 12px;
          text-align: center;
          display: flex;
          flex-direction: column;
          padding: 3rem;
          border-top: 1px solid rgb(221, 221, 221);
        }

        .footer ul {
          list-style-type: none;
          display: flex;
          justify-content: space-evenly;
        }

        .footer li {
          margin-right: 1rem;
          margin-left: 1rem;
        }

        .bottom-footer {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          padding: 10px;
          border-top: 1px solid rgb(221, 221, 221);
        }

        .bottom-footer a {
          margin-right: 1rem;
          font-size: 10px;
        }

        .socials svg {
          font-size: 16px;
        }

        @media only screen and (max-width: 991px){
          .bottom-footer  {
            margin-bottom: 6rem;
          }


        }

      `}</style>
    </>
  );
}
