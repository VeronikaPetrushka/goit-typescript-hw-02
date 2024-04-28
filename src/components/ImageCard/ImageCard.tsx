import css from './ImageCard.module.css'

interface ImageCardProps {
  smallImg: string;
  regularImg: string;
  altDesc: string;
  openModal: (imageUrl: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ smallImg, regularImg, altDesc, openModal }) => {
    return (
        <div className={css.imgContainer}>
            <img src={smallImg} alt={altDesc} onClick={() => openModal(regularImg)} />
        </div>
    )
};

export default ImageCard;