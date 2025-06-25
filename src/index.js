import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Deposit from "./pages/Deposit";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "",
				element: <Deposit />,
			},
		],
	},
]);

// const queryClient = new QueryClient();oifnoprnfpsfrrshse

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))eahahted
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
