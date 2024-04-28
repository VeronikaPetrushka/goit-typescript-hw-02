import css from './ImageCard.module.css'

const ImageCard = ({ smallImg, regularImg, altDesc, openModal }) => {
    return (
        <div className={css.imgContainer}>
            <img src={smallImg} alt={altDesc} onClick={() => openModal(regularImg)} />
        </div>
    )
};

export default ImageCard;