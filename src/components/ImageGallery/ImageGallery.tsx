import ImageCard from "../ImageCard/ImageCard";
import css from './ImageGallery.module.css'
import { Image } from "../../App/App";

interface ImageGalleryProps {
  items: Image[];
  openModal: (imageUrl: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({items, openModal}) => {
    return (
        <ul className={css.imgList}>
            {items.map((item) => (
                <li key={item.id} className={css.imgItem}>
                    <ImageCard
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