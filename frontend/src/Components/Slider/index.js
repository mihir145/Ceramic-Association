import { Carousel } from "react-bootstrap";
import React, { useState } from "react";
// import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// import { Slide } from "react-slideshow-image";
// import "react-slideshow-image/dist/styles.css";
// import Cmo from "../../../node_modules/react-slideshow-image/dist/styles.css";

// D:\Ceramic Association\frontend\node_modules\react-slideshow-image\dist\styles.css

const images = [
  "https://www.flooringamerica.com/root/clientImages/MF7979web/empty-big-198.jpg",
  "https://charbhujatiles.com/upload/image1631272342.jpg",
  "https://www.thespruce.com/thmb/DTM1w0H939t2APFzVwK3dwjyi70=/1333x1000/smart/filters:no_upscale()/porcelain-tile-vs-ceramic-tile-1822583_hero-83338b9dbf96484fbf81538ea0bbe2df.jpg",
  "https://www.flooringamerica.com/root/clientImages/MF7979web/empty-big-198.jpg",
];

const Slider = () => {
  // return (
  //   <div class="hero-image">
  //     <div class="hero-text">
  //       <h1 style="font-size:50px">I am John Doe</h1>
  //       <p>And I'm a Photographer</p>
  //       <button>Hire me</button>
  //     </div>
  //   </div>
  // );
};

//   return (
//     <>
//       <div class="slider-box">
//         <div id="slider" style={{ transform: translate }}>
//           {images.map((item, index) => {
//             return <img src={item} key={index} alt="" />;
//           })}
//         </div>
//         <div class="indicators">
//           <span
//             id="btn1"
//             className={btn1 ? "active" : ""}
//             onClick={() => {
//               setBtn1(true);
//               setBtn2(false);
//               setBtn3(false);
//               setBtn4(false);
//               setTranslate("translate(0px)");
//             }}
//           ></span>
//           <span
//             id="btn2"
//             className={btn2 ? "active" : ""}
//             onClick={() => {
//               setBtn1(false);
//               setBtn2(true);
//               setBtn3(false);
//               setBtn4(false);
//               setTranslate("translate(-100%)");
//             }}
//           ></span>
//           <span
//             id="btn3"
//             className={btn3 ? "active" : ""}
//             onClick={() => {
//               setBtn1(false);
//               setBtn2(false);
//               setBtn3(true);
//               setBtn4(false);
//               setTranslate("translate(-200%)");
//             }}
//           ></span>
//           <span
//             id="btn4"
//             className={btn4 ? "active" : ""}
//             onClick={() => {
//               setBtn1(false);
//               setBtn2(false);
//               setBtn3(false);
//               setBtn4(true);
//               setTranslate("translate(-300%)");
//             }}
//           ></span>
//         </div>
//       </div>
//     </>
//   );
// };

export default Slider;
