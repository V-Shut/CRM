import { useEffect, useState, useCallback } from "react";
import { Product } from "../../types";
import "./style.css";
import { GoodCard } from "../goodCard";
import { Modal } from "../modal";

export const GoodsGrid = () => {
	const [goodsList, setGoodsList] = useState<Product[] | undefined>(undefined);
	const [modal, setModal] = useState(true);

	const deleteItem = async (id: number) => {
		const response = await fetch(`http://localhost:3001/products/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Error deleting item");
		}

		fetchGoods();
	};

	const fetchGoods = async () => {
		const response = await fetch("http://localhost:3001/products");
		if (!response.ok) {
			throw new Error("Error fetching data");
		}
		const data = await response.json();
		setGoodsList(data);
	};

	const sendData = useCallback(async (data: Omit<Product, "id">) => {
		const response = await fetch("http://localhost:3001/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});
		if (!response.ok) {
			throw new Error('Error sending data to server');
    }
    
    fetchGoods();
    return response.json();
  }, []);
  

	useEffect(() => {
		fetchGoods();
	}, []);

	return (
		<>
			{modal && (
				<Modal setModal={setModal} sendData={sendData} />
			)}
			<button
				className="add_good"
				onClick={() => setModal(true)}>
				Add
			</button>
			<div className="goods_container">
				{goodsList?.map((good) => (
					<GoodCard
						good={good}
						deleteItem={deleteItem}
						key={good.name}
					/>
				))}
			</div>
		</>
	);
};
