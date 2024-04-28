import { useEffect, useState } from 'react';
import fetchPhotosWithTopic from "./api.js";
import ImageGallery from './components/ImageGallery/ImageGallery.jsx';
import SearchForm from './components/SearchBar/SearchBar.jsx';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';
import Loader from './components/Loader/Loader.jsx';
import ErrorMessage from './components/ErrorMessage/ErrorMessage.jsx';
import ImageModal from './components/ImageModal/ImageModal.jsx';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const hasMorePhotos = page < totalPages;

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const data = await fetchPhotosWithTopic(searchWord, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
        setIsLoadingMore(true);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
        setIsLoadingMore(false);
      }
    }

    fetchImages();
  }, [searchWord, page]);

  const handleSearch = async (word) => {
    setImages([]);
    setError(false);
    setSearchWord(word);
    setPage(1);
    setTotalPages(0)
  };

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Loader />
        </div>
      )}
      {error && (
        <ErrorMessage />
      )}
      {images.length > 0 && <ImageGallery items={images} openModal={openModal} />}
      {images.length > 0 &&hasMorePhotos && !isLoadingMore &&
        <LoadMoreBtn onClick={handleLoadMore} hasMorePhotos={hasMorePhotos}  />
      }
      {images.length === 0 && (
        <p style={{ color: 'black', fontSize: 20 }}>Sorry, there are no photos to show.</p>
      )}
      <ImageModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        imageUrl={selectedImage}
      />
    </div>
  );
};

export default App;