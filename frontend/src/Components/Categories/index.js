import React, { useState, useEffect } from "react";
import { getAllCategories } from "../../Api/Helper";
import "./styles.css";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import API from "../../API";
import { Link } from "react-router-dom";

// D:\Ceramic Association\frontend\node_modules\slick-carousel\slick\slick-theme.css
// D:\Ceramic Association\frontend\node_modules\slick-carousel\slick\slick.css

const LeftArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "grey",
      }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-left"></i>
    </button>
  );
};

const RightArrow = ({ className, style, onClick }) => {
  return (
    <button
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      <i className="fa fa-chevron-right"></i>
    </button>
  );
};

const categories = [
  {
    image:
      "https://tileswale.gumlet.io/front_assets/img/new_menu/tiles.png?w=160&dpr=1.0",
    name: "Tiles",
  },
  {
    image:
      "https://tileswale.gumlet.io/front_assets/img/new_menu/sanitary.png?w=160&dpr=1.0",
    name: "Sanitary Wares",
  },
  {
    image:
      "https://tileswale.gumlet.io/front_assets/img/new_menu/bathware.png?w=160&dpr=1.0",
    name: "Bath Wares",
  },
];

var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
};

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories()
      .then((data) => {
        if (data.error) {
          alert("Error to fetch categories!");
        } else {
          setCategories(data);
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    prevArrow: <LeftArrow />,
    nextArrow: <RightArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <br />
      <br />
      <div className="category-section">
        <h1 className="title" style={{ textAlign: "center" }}>
          Categories
        </h1>
        <br />
        <br />
        <div className="categories-container">
          <Slider {...settings}>
            {categories.map((item, index) => {
              return (
                <div className="category-container">
                  <img src={`${API}/category/${item._id}`} />
                  <Link to="/">{item.name}</Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Categories;
