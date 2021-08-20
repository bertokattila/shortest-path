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
				fieldStateSetter(id, !data.available);
			}}
			onMouseEnter={() => {
				if (mouseState) {
					fieldStateSetter(id, !data.available);
				}
			}}
			className="field-btn"
		>
			{data.available ? "" : <FaCircle />}
		</button>
	);
};

export default Field;
