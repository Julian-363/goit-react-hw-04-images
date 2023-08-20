import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './LoadMoreButton';
import Loader from './Loader';
import Modal from './Modal';
import { fetchImages } from '../utils/fetchImages';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (searchQuery !== '') {
        const perPage = 12;
        const fetchedImages = await fetchImages(searchQuery, page, perPage);
        setImages(prevImages => [...prevImages, ...fetchedImages]);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = selectedImage => {
    setSelectedImage(selectedImage);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        handleModalClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} isLoading={isLoading} />
      {isLoading && <Loader isLoading={isLoading} />}
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {images.length > 0 && images.length % 12 === 0 && (
        <Button onClick={handleLoadMore} isLoading={isLoading} />
      )}
      {showModal && <Modal image={selectedImage} onClose={handleModalClose} />}
    </div>
  );
};

export default App;
