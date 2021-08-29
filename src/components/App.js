import Grid from "./Grid";
import Footer from "./Footer";
import { FaPlay } from "react-icons/fa";
import { useState, useRef } from "react";
import "../style/app.css";
import Header from "./Header";
import { BFS, backTrace } from "../classes/Bfs";

function App() {
    const [startIndex, setStartIndex] = useState(null);

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
                path: false,
                neighbours: [],
                visited: false,
                backTrace: null,
            });
        }

        // Setting the default endpoints
        let start = grid.length - size;
        grid[start].start = true;
        grid[size - 1].end = true;
        setStartIndex(start);

        //grid[50].path = true;
        //alert("init");

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
	Setting up the grid with lazy initialization to avoid running at every re-render
	more info: https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates
	*/
    const [gridData, setGridData] = useState(initGrid);

    const [myInterval, setMyInterval] = useState(-1);
    const timerRef = useRef(null);

    /*
	Setting a field's available property
	*/
    const setFieldAvailable = (id, value) => {
        if (gridData[id].start || gridData[id].end) return;
        let gridDataCpy = gridData.slice();
        gridDataCpy[id].available = value;
        setGridData(gridDataCpy);
        gridModified();
    };
    const setFieldPath = (id, value) => {
        if (gridData[id].start || gridData[id].end) return;
        let gridDataCpy = gridData.slice();
        gridDataCpy[id].path = value;
        setGridData(gridDataCpy);
    };

    const startInterval = () => {
        alert("init2");

        timerRef.current = setInterval(function () {
            setMyInterval((prevInterval) => {
                if (prevInterval >= -1)
                    setFieldAvailable(prevInterval + 1, false);
                if (prevInterval + 1 >= gridData.length - 1) {
                    clearInterval(timerRef.current);
                    setMyInterval(-1);
                }
                return prevInterval + 1;
            });
        }, 200);
    };

    const clearGrid = () => {
        let gridDataCpy = gridData.slice();
        gridDataCpy.forEach((field) => {
            field.available = true;
            field.path = false;
        });
        setGridData(gridDataCpy);
    };

    const generateShortestPath = (grid, start) => {
        gridModified();
        let path = backTrace(BFS(grid, start));
        path.forEach((id) => {
            setFieldPath(id, true);
        });
    };

    // when grid gets modified displayed path gets invalid
    const gridModified = () => {
        let gridDataCpy = gridData.slice();
        gridDataCpy.forEach((field) => {
            field.path = false;
            field.visited = false;
        });
        setGridData(gridDataCpy);
    };

    return (
        <>
            <Header />
            <main>
                <Grid
                    gridData={gridData}
                    fieldStateSetter={setFieldAvailable}
                />
                <div className="align-container-container-lol">
                    <div className="align-container">
                        <button
                            className="control-btn"
                            onClick={() => {
                                generateShortestPath(gridData, startIndex);
                            }}
                        >
                            Generate
                            <FaPlay className="play-btn" />
                        </button>
                        <button className="control-btn" onClick={clearGrid}>
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
