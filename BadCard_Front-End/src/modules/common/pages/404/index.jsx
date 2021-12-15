import React from "react";
import Images from "shared/images";

import "./styles.scss";

const NotFoundPage = () => {
  return (
    <div className="container">
      <div className="helper-page">
        <img src={Images.error_404} alt="Not Found" />
        <div className="heading-2">Oops!</div>
        <div className="heading-4">Page not found.</div>
      </div>
    </div>
  );
};

export default NotFoundPage;
