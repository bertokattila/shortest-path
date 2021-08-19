import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import "../style/field.css";

const Field = ({ id, fieldData, fieldStateSetter, mouseState }) => {
	/*
	Using state as a copy of the upper level data
	*/
	const [data] = useState(fieldData);

	return (
		<button
			onMouseDown={() => {
				fieldStateSetter(id, !data.getAvailable());
			}}
			onMouseEnter={() => {
				if (mouseState) {
					fieldStateSetter(id, !data.getAvailable());
				}
			}}
			className="field-btn"
		>
			{data.getAvailable() ? "" : <FaCircle />}
		</button>
	);
};

export default Field;
