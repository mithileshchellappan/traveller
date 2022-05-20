import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip
} from "@material-ui/core";
import { Phone, LocationOn } from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

const url =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FRestaurant&psig=AOvVaw08FPPUL7c6n8e6HshLRrrh&ust=1653068942787000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCMjAueuP7PcCFQAAAAAdAAAAABAD";

const PlaceDetails = ({ place,selected,refProp }) => {
  
  if(selected) refProp?.current?.scrollIntoView({behavior: "smooth", block: "start"});
  const classes = useStyles();

  return (
    !place.ad_position&&<Card elevation={6}>
    <CardMedia
      style={{ height: 350 }}
      image={place.photo ? place.photo.images.large.url : url}
      title={place.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5">
        {place.name}
      </Typography>
      {place?.rating && (<Box display="flex" justifyContent="space-between">
      <Rating size="small" value={Number(place.rating)} readOnly/>

        <Typography gutterBottom variant="subtitle1">
          out of {place.num_reviews} reviews
        </Typography>
      </Box>)}
      {place?.price_level && (<Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Price</Typography>
        <Typography gutterBottom variant="subtitle1">
          {place.price_level}
        </Typography>
      </Box>)}
      {place?.ranking && (<Box display="flex" justifyContent="space-between">
        <Typography variant="subtitle1">Ranking</Typography>
        <Typography gutterBottom variant="subtitle1">
          {place.ranking }
        </Typography>
      </Box>)}
      
      {place?.cuisine?.map(({name})=>(
        <Chip label={name} className={classes.chip}/>
      ))}
      {place?.address && (<Typography gutterBottom variant="body2" color="textSecondary" className={classes.subtitle}>
       <LocationOn/> {place.address}
      </Typography>)}
      {place?.phone && (<Typography gutterBottom variant="body2" color="textSecondary" className={classes.spacing}>
       <Phone/> {place.phone}
      </Typography>)}

        <CardActions>
          <Button size="small" color="primary" onClick={()=>window.open(place.web_url,'_blank')}>
            Trip Advisor
          </Button>
          <Button size="small" color="primary" onClick={()=>window.open(place.website,'_blank')}>
            Website
          </Button>
        </CardActions>

      {place?.awards?.map(award => (
        <Box my={1}  alignItems="center" display="flex" justifyContent="space-between">
          <img src={award.images.small} alt={award.display_name}/>
          <Typography variant="subtitle2" color="textSecondary">
            {award.display_name}
          </Typography>
</Box>
      ))}
    </CardContent>
  </Card>
  );
};

export default PlaceDetails;
