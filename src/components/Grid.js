import React from "react";
import Field from "./Field";
import "../style/grid.css";

const Grid = () => {
	const renderGrid = () => {
		let rows = [];
		for (let index = 0; index < 15; index++) {
			rows.push(<div className="grid-row">{renderRow()}</div>);
		}
		return rows;
	};

	const renderRow = () => {
		let row = [];
		for (let index = 0; index < 15; index++) {
			row.push(<Field />);
		}
		return row;
	};

	return <div>{renderGrid()}</div>;
};

export default Grid;
