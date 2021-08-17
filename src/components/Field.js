import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import "../style/field.css";

const Field = () => {
	const [available, setAvailable] = useState(true);

	return (
		<button
			onClick={() => {
				setAvailable(!available);
			}}
			className="field-btn"
		>
			{available || <FaCircle />}
		</button>
	);
};

export default Field;
