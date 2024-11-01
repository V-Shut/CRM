import React, { useState } from "react";
import "./style.css";

interface Props {
	setModal: (value: boolean) => void;
	sendData: (data: Omit<Product, "id">) => Promise<any>;
}

interface Product {
	id: number;
	imageUrl: string;
	name: string;
	count: number;
	size: {
		width: number;
		height: number;
	};
	weight: string;
	comments: string[];
}

const inputPlaceholders = [
	"Link to img",
	"Name",
	"Count",
	"Width",
	"Height",
	"Weight",
];

export const Modal: React.FC<Props> = ({ setModal, sendData }) => {
	const [link, setLink] = useState("");
	const [name, setName] = useState("");
	const [count, setCount] = useState("");
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [weight, setWeight] = useState("");

	const handleSend = () => {
		const product: Omit<Product, "id"> = {
			imageUrl: link,
			name,
			count: parseInt(count, 10),
			size: {
				width: parseInt(width, 10),
				height: parseInt(height, 10),
			},
			weight,
			comments: [],
		};

		sendData(product);
		setModal(false);
	};

	return (
		<div className="modal_background">
			<div className="modal">
				<button
					className="modal_close"
					onClick={() => setModal(false)}>
					Close
				</button>
				<div className="input_container">
					<input
						type="text"
						placeholder={inputPlaceholders[0]}
						className="good_params"
						value={link}
						onChange={(e) => setLink(e.target.value)}
					/>
					<input
						type="text"
						placeholder={inputPlaceholders[1]}
						className="good_params"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="number"
						placeholder={inputPlaceholders[2]}
						className="good_params"
						value={count}
						onChange={(e) => setCount(e.target.value)}
					/>
					<input
						type="number"
						placeholder={inputPlaceholders[3]}
						className="good_params"
						value={width}
						onChange={(e) => setWidth(e.target.value)}
					/>
					<input
						type="number"
						placeholder={inputPlaceholders[4]}
						className="good_params"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
					/>
					<input
						type="text"
						placeholder={inputPlaceholders[5]}
						className="good_params"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
					/>
				</div>
				<button
					className="send_button"
					onClick={handleSend}>
					Send item
				</button>
			</div>
		</div>
	);
};
