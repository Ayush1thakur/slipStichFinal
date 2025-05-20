import "./contact.css";
import { ContactUs } from "../../content/homeContent";
import { MdOutlineLocalPhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";

const Contact = () => {
  return (
    <div id="contact-us" className="contact">
      <h1 className="contact-title ">Contact Us</h1>
      <div className="contact-cont">
        <div className="contact-left block">
          <i>{ContactUs.time}</i>
          <p>
            <MdOutlineLocalPhone className="contact-icon" />
            &nbsp;{ContactUs.phone}
          </p>
          <p><MdOutlineEmail className="contact-icon" />
          &nbsp;{ContactUs.email}</p>
          <p>
            <MdOutlineLocationOn className="contact-icon" />
            &nbsp;{ContactUs.address}
          </p>
        </div>
        <div className="contact-right block">
          <img src={ContactUs.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
