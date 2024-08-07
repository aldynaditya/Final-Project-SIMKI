import React from "react";
import PropTypes from "prop-types";
import '../../Style/components/TitleSection.css'; // Make sure to create this CSS file

const TitleSection = ({ imageSrc, title, titleColor }) => {
    return (
        <div className="upper-section">
            <img src={imageSrc} alt="GambarKlinik" className="upper-image" />
            <h1 className="upper-title" style={{ color: titleColor }}>{title}</h1>
        </div>
    );
};

TitleSection.propTypes = {
    imageSrc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    titleColor: PropTypes.string
};

TitleSection.defaultProps = {
    titleColor: 'white'
};

export default TitleSection;
