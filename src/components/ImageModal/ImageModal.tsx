import Modal from 'react-modal';
import css from './ImageModal.module.css';

interface ImageModalProps {
  isOpen: boolean;
  closeModal: () => void;
  imageUrl: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, closeModal, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      {imageUrl && <img src={imageUrl} alt="Large Image" className={css.image} />}
    </Modal>
  );
};

export default ImageModal;
