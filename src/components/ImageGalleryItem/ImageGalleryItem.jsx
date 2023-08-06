import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryLi, ImageGalleryImg } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({ image, onItemClick }) => {
  const handleClick = () => {
    onItemClick(image);
  };

  return (
    <ImageGalleryLi onClick={handleClick}>
      <ImageGalleryImg src={image.webformatURL} alt={image.tags} />
    </ImageGalleryLi>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
