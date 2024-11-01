import { useEffect, useState } from "react";
import { Product } from "../../types";
import "./style.css";

export const GoodDetails = () => {
	const [good, setGood] = useState<Product | undefined>(undefined);
	const path = window.location.href.split("/").pop();

	async function fetchGood(id: number) {
		const data = await fetch(`http://localhost:3001/products/${id}`).then(
			(response) => {
				if (!response.ok) {
					throw new Error("Error fetching data");
				}

				return response.json();
			}
		);
		setGood(data);
	}

	useEffect(() => {
		if (path) {
      fetchGood(+path);
		}
	}, []);

	return <div className="example">{good?.name}</div>;
};