import React from "react";

//Appcontext to check if user is authenticated ->
const AppContext = React.createContext({ isAuthenticated: false });
export default AppContext;