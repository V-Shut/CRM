import "./App.css";
import { Route, Routes } from "react-router-dom";
import { GoodsGrid } from "./components/goodsGrid";
import { GoodDetails } from "./components/goodDetails";

function App() {
	return (
    <div className="App">
      <Routes>
        <Route path="/" element={<GoodsGrid />} />
        <Route path="/:id" element={<GoodDetails />} />
			</Routes>
		</div>
	);
}

export default App;
