import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import "./Main.css"
import AboutMe from "../AboutMe/AboutMe";

function Main() {

	return (
		<main className="content">
			<Promo />
			<AboutProject />
			<Techs />
			<AboutMe/>
		</main>
		
	)


};

export default Main;