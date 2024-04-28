import { useEffect, useState } from 'react';
import fetchPhotosWithTopic from "../api.js";
import ImageGallery from '../components/ImageGallery/ImageGallery.tsx';
import SearchForm from '../components/SearchBar/SearchBar.tsx';
import LoadMoreBtn from '../components/LoadMoreBtn/LoadMoreBtn.tsx';
import Loader from '../components/Loader/Loader.tsx';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage.tsx';
import ImageModal from '../components/ImageModal/ImageModal.tsx';

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface FetchPhotosResponse {
  results: Image[];
  total_pages: number;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const hasMorePhotos = page < totalPages;

  const openModal = (imageUrl: string) => {
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
        const data: FetchPhotosResponse = await fetchPhotosWithTopic(searchWord, page);
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

  const handleSearch = async (word: string) => {
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