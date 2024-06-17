import { useContext, useEffect, useLayoutEffect } from "react"
import { LoggedInContext } from "../pages/AuthProvider"
import UserHomePage from "../pages/UserHomePage";
import LandPage from "../pages/LandPage";

const LoggedInRoute = () => {
  
    const {loggedIn, setLoggedIn} = useContext(LoggedInContext);

    useLayoutEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if(accessToken && refreshToken){
            setLoggedIn(true);
        }
        return;
    }, [setLoggedIn]);
    
    return (
    <>  
        {loggedIn ? (
            <UserHomePage />
        ): (
            <LandPage />
        )}
    </>
  )
}

export default LoggedInRoute
