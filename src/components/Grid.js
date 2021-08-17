import React from "react";
import Field from "./Field";
import "../style/grid.css";

const Grid = () => {
	const renderGrid = () => {
		let rows = [];
		for (let index = 0; index < 15; index++) {
			rows.push(<tr className="grid-row">{renderRow()}</tr>);
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

	return (
		<table className=" grid center">
			<tbody>{renderGrid()}</tbody>
		</table>
	);
};

export default Grid;
