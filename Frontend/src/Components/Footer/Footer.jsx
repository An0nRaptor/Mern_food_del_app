import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer_content">
        <div className="footer_content_left">
          <img src={assets.logo} alt="logo" />
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries.</p>
            <div className="footer_social_icons">
                <img src={assets.facebook_icon} alt="facebook" />
                <img src={assets.twitter_icon} alt="twitter" />
                <img src={assets.linkedin_icon} alt="linkedin" />   
            </div>
        </div>
        <div className="footer_content_center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer_content_right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-212-456-7890</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className="footer_copyright">
        Copyright 2024 &#169; Tomato.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
