import React, { useState, useEffect } from "react";
import Field from "./Field";
import "../style/grid.css";

const Grid = ({ gridData, fieldStateSetter }) => {
	const [mouseState, setMouseState] = useState(false);

	const renderGrid = () => {
		const size = Math.sqrt(gridData.length);
		let rows = [];
		for (let rowIndex = 0; rowIndex < size; rowIndex++) {
			let row = [];
			for (let colIndex = 0; colIndex < size; colIndex++) {
				let id = rowIndex * size + colIndex;
				row.push(
					<Field
						key={id}
						id={id}
						fieldData={gridData[id]}
						fieldStateSetter={fieldStateSetter}
						mouseState={mouseState}
					/>
				);
			}
			rows.push(
				<div key={"row" + rowIndex} className="grid-row">
					{row}
				</div>
			);
		}
		return rows;
	};

	const setMouseStateFalse = () => {
		setMouseState(false);
	};
	useEffect(() => {
		document.body.addEventListener("mouseup", setMouseStateFalse);
		return () => {
			document.body.removeEventListener("mouseup", setMouseStateFalse);
		};
	}, []);

	return (
		<div
			className="grid"
			onMouseDown={() => {
				setMouseState(true);
			}}
		>
			{renderGrid()}
		</div>
	);
};

export default Grid;
