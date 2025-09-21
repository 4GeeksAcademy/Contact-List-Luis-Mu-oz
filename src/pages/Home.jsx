import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import Card from "../components/Card.jsx";
import Info from "../components/Info.jsx";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">
			<Info/>
			<Card/>
			
			<h1>Hello Rigo!!</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
}; 