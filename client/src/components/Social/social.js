import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import "./style.css";

export default function SocialFollow() {
  return (
    <div>
      <a href="https://www.twitter.com/bidbot4" className="twitter social" target="Twitter">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
      </a>
      <a
        href="https://www.instagram.com/bid.b0t/"
        className="instagram social" target="Instagram">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
      </a>
    </div>
  );
}
