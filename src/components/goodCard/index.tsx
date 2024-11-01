import { Link } from "react-router-dom";
import { Product } from "../../types";
import "./style.css";

interface Props {
	good: Product;
	deleteItem: (id: number) => void;
}

export const GoodCard: React.FC<Props> = ({ good, deleteItem }) => {
	const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		deleteItem(good.id);
		event.stopPropagation();
  };
  
  const handleCardClick = () => {
		window.location.href = `/${good.id}`;
	};

	return (
		<div className="card" onClick={() => handleCardClick()}>
			<div className="photo">
        <div className="text">{good.imageUrl}</div>
			</div>
			<div className="good_title">{good.name}</div>
			<button
				className="cart_button delete"
				onClick={handleButtonClick}>
				Delete
			</button>
		</div>
	);
};
