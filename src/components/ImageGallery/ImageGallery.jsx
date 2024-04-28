import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'

const ImageGallery = ({items, openModal}) => {
    return (
        <ul className={css.imgList}>
            {items.map((item) => (
                <li key={item.id} className={css.imgItem}>
                    <ImageCard
                        item={item}
                        smallImg={item.urls.small}
                        regularImg={item.urls.regular}
                        altDesc={item.alt_description}
                        openModal={openModal}
                    />
                </li>
      ))}
        </ul>
    )
};

export default ImageGallery;