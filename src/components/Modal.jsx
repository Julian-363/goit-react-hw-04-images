import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContainer } from '../styles/Modal';

const Modal = ({ image, onClose }) => {
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscKey = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return (
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer tabIndex="0" onKeyDown={handleKeyDown}>
        <img src={image} alt="" />
      </ModalContainer>
    </Overlay>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
