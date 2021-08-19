import Grid from "./Grid";
import Footer from "./Footer";
import Vertex from "../classes/Vertex";
import { useState, useRef, useEffect } from "react";

function App() {
	/*
	This function is only used at the time of the first render; creates the grid and sets all fields free of obstacles
	Mathematically speaking it creates an unweighted graph which has a topology of a 15 X 15 grid
	*/
	const initGrid = () => {
		const grid = [];
		const size = 15;
		for (let index = 0; index < Math.pow(size, 2); index++) {
			grid.push(new Vertex(index));
		}

		// For each node (field) setting the references of its neighbours
		grid.forEach((node, index) => {
			index % size !== 0 && node.addNeighbour(grid[index - 1]); // left end
			index % size !== size - 1 && node.addNeighbour(grid[index + 1]); // right end
			index >= size && node.addNeighbour(grid[index - size]); // top end
			index < Math.pow(size, 2) - size && node.addNeighbour(grid[index + size]); // bottom end
		});
		return grid;
	};

	/*
	Stores the state of the grid
	*/
	const [gridData, setGridData] = useState(initGrid());
	const [myInterval, setMyInterval] = useState(-1);
	const timerRef = useRef(null);

	/*
	Setting a field's available property
	*/
	const setFieldAvailable = (id, value) => {
		let gridDataCpy = gridData.slice();
		gridDataCpy[id].setAvailable(value);
		setGridData(gridDataCpy);
	};

	const startInterval = () => {
		timerRef.current = setInterval(function () {
			setMyInterval((myInterval) => {
				if (myInterval > -1) setFieldAvailable(myInterval + 1, false);
				if (myInterval + 1 >= gridData.length - 1) {
					clearInterval(timerRef.current);
				}
				return myInterval + 1;
			});
		}, 1);
	};

	//useEffect(() => {}, [myInterval, gridData.length, setFieldAvailable]);

	return (
		<>
			<main>
				<Grid gridData={gridData} fieldStateSetter={setFieldAvailable} />
			</main>
			<button onClick={startInterval}>{myInterval}</button>
			<Footer />
		</>
	);
}

export default App;
