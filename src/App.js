import logo from "./logo.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

function App() {
	// erpoernfrw
	useEffect(() => {
		document.title = "Bybit loan offer";
	}, []);

	return (
		<div className="App">
			<Outlet />
		</div>
	);
}

export default App;
