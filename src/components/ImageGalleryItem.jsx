import React from 'react';
import PropTypes from 'prop-types';
import { Item, Image } from '../styles/Item';

const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  alt,
  onImageClick,
}) => {
  const handleImageClick = () => {
    onImageClick(largeImageURL);
  };

  return (
    <Item onClick={handleImageClick}>
      <Image src={webformatURL} alt={alt} />
    </Item>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
