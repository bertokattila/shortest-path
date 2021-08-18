import Grid from "./Grid";
import Footer from "./Footer";
import Vertex from "../classes/Vertex";
import { useState, useEffect } from "react";

function App() {
	let [gridData, setGridData] = useState([]);

	const grid = [];
	for (let index = 0; index < 225; index++) {
		grid.push(new Vertex(index));
	}

	const setFieldAvailable = (index, value) => {
		let gridDataCpy = gridData.slice();
		gridDataCpy[index].setAvailable(value);
		setGridData(gridDataCpy);
	};

	/*
	Using useEffect for setting the gridData state in order to
	avoid infinite re-renders
	*/
	useEffect(() => {
		setGridData(grid);
	}, []);

	return (
		<>
			<main>
				<Grid gridData={grid} fieldStateSetter={setFieldAvailable} />
			</main>
			<Footer />
		</>
	);
}

export default App;
