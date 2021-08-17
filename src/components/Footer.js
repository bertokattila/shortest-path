import React from "react";
import { FaReact, FaSpotify, FaGithub } from "react-icons/fa";
import "../style/footer.css";

const Footer = () => {
	return (
		<footer>
			<p>
				Created with <FaReact className="react-icon" /> by Attila Bertók{" "}
			</p>
			<div className="personal-links">
				<a href="https://github.com/bertokattila">
					<FaGithub className="github-icon" />
				</a>
				<a href="https://open.spotify.com/user/11185656187?si=cac7da2aefd74e4a">
					<FaSpotify className="spotify-icon" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
