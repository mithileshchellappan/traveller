import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
const url =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FRestaurant&psig=AOvVaw08FPPUL7c6n8e6HshLRrrh&ust=1653068942787000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMjAueuP7PcCFQAAAAAdAAAAABAD";
const Map = ({ setCoordinates, setBounds, coordinates ,places,setChildClicked}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={{lat:0,lng:0}}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{}}
        onChange={e => {
          setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw});
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });

        }}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {places?.map((place,i)=>(
          place.name&&(<div className={classes.markerContainer}
            lat={Number(place.latitude)} 
            lng={Number(place.longitude)}
            key={i}
            >
             {isMobile?(<LocationOnOutlinedIcon color="primary" fontSize="large"/>)
             :(<Paper elevation={3} className={classes.paper}>
               <Typography className={classes.typography} variant="subtitle2" guttrBottom>
                 {place.name}
               </Typography>
               <img alt={place.name}className={classes.pointer} src={place.photo ? place.photo.images.large.url : url}/>
               <Rating size="small" value={Number(place.rating)} readOnly/>
             </Paper>)}
           </div>)
        ))}
       </GoogleMapReact>
    </div>
  );
};

export default Map;
