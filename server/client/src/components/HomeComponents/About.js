import { useState } from "react";
import { AboutUs, indianStates } from "../../content/homeContent";
import ReactMarkdown from "react-markdown";
import "./about.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TiMediaFastForwardOutline } from "react-icons/ti";
import axios from "axios";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    state: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {name,contact,email,state,message}=formData
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/reach/community`,
        {name,contact,email,state,message}
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setFormData({
          name: "",
          contact: "",
          email: "",
          state: "",
          message: "",
        });
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="about-us" id="about-us">
      <h1 className="about-title ">About Our Brand</h1>
      <div className="about-content">
        <ReactMarkdown>{AboutUs[0]}</ReactMarkdown>
      </div>
      <div className="aucont">
        <div className="aul">
          <div className="ault block">
            <img className="au-img" src={AboutUs[1]} alt="" />
          </div>
          <div className="block">
            <ReactMarkdown>{AboutUs[2]}</ReactMarkdown>
          </div>
        </div>
        <div className="aur block">
          <img className="au-img" src={AboutUs[3]} alt="" />
        </div>
      </div>

      <div id="join-us" className="join-cont">
        <h1 className="join-title ">Join Our Comunity</h1>
        <div className="join-formcont">
          <div className="join-content">
            <ReactMarkdown>{AboutUs[4]}</ReactMarkdown>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Name"
            />

            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              maxLength={10}
              required
              className="form-control"
              placeholder="Phone Number"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Email"
            />
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
              className="form-control"
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
              className="form-control"
              placeholder="Message"
            />

            <button type="submit" className="submitBtn tone-down">
              Join Now
            </button>
          </form>
          <div className="jfr">
            <TiMediaFastForwardOutline className="jicon" />
            <TiMediaFastForwardOutline className="jicon" />
            <TiMediaFastForwardOutline className="jicon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
