import React, { useState } from "react";
import { FaCircle, FaFlagCheckered, FaPlay } from "react-icons/fa";
import "../style/field.css";

const Field = ({ fieldStateSetter, mouseState, fieldData }) => {
	/*
	Using state as a copy of the upper level data
	*/
	const [data] = useState(fieldData);
	const id = fieldData.id;

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
			{data.available || <FaCircle />}
			{data.path && <FaCircle className="path-icon" />}
			{data.start && <FaPlay className="start-icon" />}
			{data.end && <FaFlagCheckered className="end-flag" />}
		</button>
	);
};

export default Field;
