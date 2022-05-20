import React from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";

import { getPlacesData } from "./api";
const App = () => {
  const [places, setPlaces] = React.useState([]);
  const [filteredPlaces, setFilteredPlaces] = React.useState([]);
  const [coordinates, setCoordinates] = React.useState();
  const [bounds, setBounds] = React.useState({ sw: 0, ne: 0 });
  const [childClicked, setChildClicked] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [type, setType] = React.useState("restaurants");
  const [rating, setRating] = React.useState("0");

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  React.useEffect(() => {
    setIsLoading(true);

    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      data && setPlaces(data?.filter((place)=>place.name && place.num_reviews > 0));
      setFilteredPlaces([])
      setIsLoading(false);
    });
  }, [bounds, coordinates, type]);

  React.useEffect(() => {
    const filteredPlaces1 = places.filter(() => places.rating > rating);
    setFilteredPlaces(filteredPlaces1);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            places={filteredPlaces.length ? filteredPlaces : places}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
