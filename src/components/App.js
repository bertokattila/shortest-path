import Grid from "./Grid";
import Footer from "./Footer";
import { FaPlay } from "react-icons/fa";
import { useState, useRef } from "react";
import "../style/app.css";

function App() {
	/*
	This function is only used at the time of the first render; creates the grid and sets all fields free of obstacles
	Mathematically speaking it creates an unweighted graph which has a topology of a 15 X 15 grid
	*/
	const initGrid = () => {
		const grid = [];
		const size = 15;
		for (let index = 0; index < Math.pow(size, 2); index++) {
			grid.push({
				id: index,
				available: true,
				start: false,
				end: false,
				neighbours: [],
			});
		}

		// For each node (field) setting the references of its neighbours
		grid.forEach((node, index) => {
			index % size !== 0 && node.neighbours.push(grid[index - 1]); // left end
			index % size !== size - 1 && node.neighbours.push(grid[index + 1]); // right end
			index >= size && node.neighbours.push(grid[index - size]); // top end
			index < Math.pow(size, 2) - size &&
				node.neighbours.push(grid[index + size]); // bottom end
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
		gridDataCpy[id].available = value;
		setGridData(gridDataCpy);
	};

	const startInterval = () => {
		timerRef.current = setInterval(function () {
			setMyInterval((prevInterval) => {
				if (prevInterval >= -1) setFieldAvailable(prevInterval + 1, false);
				if (prevInterval + 1 >= gridData.length - 1) {
					clearInterval(timerRef.current);
					setMyInterval(-1);
				}
				return prevInterval + 1;
			});
		}, 200);
	};

	return (
		<>
			<main>
				<Grid gridData={gridData} fieldStateSetter={setFieldAvailable} />
				<div className="btn-container-container-lol">
					<div className="btn-container">
						<button className="control-btn" onClick={startInterval}>
							Generate
							<FaPlay className="play-btn" />
						</button>
						<button className="control-btn" onClick={startInterval}>
							Clear
						</button>
					</div>
				</div>
			</main>

			<Footer />
		</>
	);
}

export default App;
