import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				
					<a href="http://www.4geeksacademy.com" className="navbar-brand mb-0 h1 text-decoration-underline">4GEEKSACADEMY</a>
			
				<div className="ml-auto">
					<i className="fa-brands fa-react"></i>
				</div>
			</div>
		</nav>
	);
};