import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
import { IoSearch } from "react-icons/io5";

interface SearchFormProps {
  onSearch: (word: string) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {

	interface FormElements extends HTMLFormControlsCollection {
  image: HTMLInputElement;
	}

	interface MyFormElement extends HTMLFormElement {
  readonly elements: FormElements;
	}

	const handleSubmit = (evt: React.FormEvent<MyFormElement>) => {
		evt.preventDefault();
		const form = evt.currentTarget;
		const image = form.elements.image.value;

		if (image.trim() === "") {
			toast.error("Please enter search term!");
			return;
		}
		// У протилежному випадку викликаємо пропс
		// і передаємо йому значення поля
		onSearch(image);
     form.reset();
 };

  return (
    <header className={css.header}>
		<form className={css.searchForm} onSubmit={handleSubmit}>
			<div className={css.searchContainer}>
				<div className={css.searchIconPosition}>
					<button className={css.searchBtn} type="submit">
					<IoSearch size='20'/>
					</button>
					<input
						className={css.searchInput}
						type="text"
						autoComplete="off"
						autoFocus
						placeholder="Search images and photos"
						name="image"
					/>
				</div>
			</div>
		</form>
	</header>
  );
};

export default SearchForm;
