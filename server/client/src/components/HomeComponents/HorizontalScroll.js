import React, { useRef } from "react";
import "./horizontalScroll.css";
import { motion, useScroll, useTransform } from "framer-motion";
import ImageContainer from "./ImageContainer";
import {HorScroll} from "../../content/homeContent";

const HorizontalScroll = () => {

  const targetRef= useRef(null);
  const {scrollYProgress}= useScroll({target:targetRef});

  // setting position
  const x= useTransform(scrollYProgress,[0,1],['-3%',"-28%"]);

  return (
    <div className="carousal" ref={targetRef}>
      <div className="contentContainer">
        <motion.div className="images" style={{x}}>
        {HorScroll.map((image, index) => (
          <div key={index} className="imageItem">
            <ImageContainer imageSource={image} />
          </div>))}
        </motion.div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
