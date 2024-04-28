import Modal from 'react-modal';
import css from './ImageModal.module.css';

const ImageModal = ({ isOpen, closeModal, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      <img src={imageUrl} alt="Large Image" className={css.image} />
    </Modal>
  );
};

export default ImageModal;
