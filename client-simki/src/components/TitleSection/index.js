import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import '../../Style/components/TitleSection.css';
import image1 from '../../images/image_1.png';
import image2 from '../../images/image_2.jpeg';
import image3 from '../../images/image_3.png';

const TitleSection = ({ title, titleColor }) => {
    const images = [image1, image2, image3];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="upper-section">
            <img src={images[currentImageIndex]} alt="GambarKlinik" className="upper-image" />
            <h1 className="upper-title" style={{ color: titleColor }}>{title}</h1>
        </div>
    );
};

TitleSection.propTypes = {
    title: PropTypes.string.isRequired,
    titleColor: PropTypes.string
};

TitleSection.defaultProps = {
    titleColor: 'white'
};

export default TitleSection;
