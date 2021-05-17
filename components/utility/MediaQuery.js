import { useState, useCallback, useEffect } from "react";

//Mediaquery function -> 
const MediaQuery = (width) => {
  //Set state of targetReached to false -> 
  const [targetReached, setTargetReached] = useState(false);

  //Callback function to check if event matches targetreach -> 
  const updateTarget = useCallback((event) => {
    //If event matches targetreached ->
    if (event.matches) {
      setTargetReached(true);
      //If event DO NOT match targetreached ->
    } else {
      setTargetReached(false);
    }
  }, []);

  //useEffect function to dynamically find the value of the width of the page ->
  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    media.addListener(updateTarget);
    //if the the value is true ->
    if (media.matches) {
      setTargetReached(true);
    }
    return () => media.removeListener(updateTarget);
  }, []);

  return targetReached;
};

export default MediaQuery;
