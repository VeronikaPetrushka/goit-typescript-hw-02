import toast from 'react-hot-toast';
import css from './SearchBar.module.css';
import { IoSearch } from "react-icons/io5";

const SearchForm = ({ onSearch }) => {

	const handleSubmit = (evt) => {
     evt.preventDefault();
     const form = evt.target;
		const image = form.elements.image.value;

		// Якщо текстове поле порожнє, виводимо повідомлення
		// і припиняємо виконання функції.
		if(form.elements.image.value.trim() === "") {
			toast.error("Please enter search term!")
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
