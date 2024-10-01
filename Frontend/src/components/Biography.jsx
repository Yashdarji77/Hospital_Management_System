import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="aboutImg" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h2>Who We Are?</h2>
        <p>
          We are a passionate team dedicated to transforming healthcare through
          innovative hospital management systems. In 2024, we embraced the MERN
          stack to build dynamic applications that streamline operations and
          enhance patient care.
        </p>
        <p>
          Our mission is to integrate technology for better communication in
          healthcare.
        </p>
        <p>
          ZeeCare Doctors exemplify excellence in patient care, and we strive to
          empower them with tools that facilitate better management and improved
          outcomes
        </p>
        <p>
          By blending functionality with user-friendly designs, we create
          solutions that resonate with the needs of both providers and patients,
          making healthcare accessible and efficient.
        </p>
        <p>
          Our commitment to quality drives innovation, keeping our systems
          aligned with healthcare changes.
        </p>
        <h6>"Your Health Matters!"</h6>
      </div>
    </div>
  );
};

export default Biography;
