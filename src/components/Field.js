import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import "../style/field.css";

const Field = ({ id, fieldData, fieldStateSetter, mouseState }) => {
	/*
	Using state as a copy of the upper level data
	*/
	const [available, setAvailable] = useState(fieldData.getAvailable());

	return (
		<button
			onClick={() => {
				fieldStateSetter(id, !available);
				setAvailable(!available);
			}}
			onMouseEnter={() => {
				if (mouseState) {
					fieldStateSetter(id, !available);
					setAvailable(!available);
				}
			}}
			className="field-btn"
		>
			{available ? "" : <FaCircle />}
		</button>
	);
};

export default Field;
