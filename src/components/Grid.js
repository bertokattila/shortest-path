import React, { useState, useEffect } from "react";
import Field from "./Field";
import "../style/grid.css";

const Grid = ({ gridData, fieldStateSetter }) => {
	const [mouseState, setMouseState] = useState(false);

	const renderGrid = () => {
		let rows = [];
		for (let rowIndex = 0; rowIndex < 15; rowIndex++) {
			let row = [];
			for (let colIndex = 0; colIndex < 15; colIndex++) {
				let id = rowIndex * 15 + colIndex;
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
