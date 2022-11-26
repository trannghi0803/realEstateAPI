import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import MainRoutes from "./MainRoutes";

export default function Routes() {
    const ScrollToTop = ({ location }: any) => {
		useEffect(() => {
			window.scrollTo(0,0);
		}, [location.pathname]);
		return null;
	};
 
    return (
        <BrowserRouter>
			<Route component={ScrollToTop} />
            <AuthRoutes />
            <MainRoutes />
        </BrowserRouter>
    );
}
