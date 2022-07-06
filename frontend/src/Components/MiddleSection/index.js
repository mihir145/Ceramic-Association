import React, { useState, useEffect } from "react";
import { getCompanies } from "../../Api/Helper/company";

const MiddleSection = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies().then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        setCompanies(data);
      }
    });
  }, []);

  return <div></div>;
};

export default MiddleSection;
