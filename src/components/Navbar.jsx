import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link>
					<a onClick href="http://www.4geeksacademy.com" className="navbar-brand mb-0 h1">4GEEKSACADEMY</a>
				</Link>
				<div className="ml-auto">
					<i class="fa-brands fa-react"></i>
				</div>
			</div>
		</nav>
	);
};