/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Product } from "../../types";
import "./style.css";
import { GoodCard } from "../goodCard";
import { Modal } from "../modal";

export const GoodsGrid = () => {
	const [goodsList, setGoodsList] = useState<Product[] | undefined>(undefined);
	const [modal, setModal] = useState(false);

	const deleteItem = async (id: number) => {
		await fetch(
			`https://crm-server-phi.vercel.app/products/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
    
    fetchGoods();
	};

	const fetchGoods = async () => {
		const response = await fetch(
			"https://crm-server-phi.vercel.app/products"
		);
		if (!response.ok) {
			throw new Error("Error fetching data");
		}
		const data = await response.json();
		setGoodsList(data);
	};

	const sendData = async (data: Omit<Product, "id">) => {
		const response = await fetch(
			"https://crm-server-phi.vercel.app/products",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			}
		);

		fetchGoods();
		return response.json();
	};

	useEffect(() => {
		fetchGoods();
	}, []);

	return (
		<>
			{modal && (
				<Modal
					setModal={setModal}
					sendData={sendData}
				/>
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
