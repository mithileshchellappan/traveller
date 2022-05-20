import React, { createRef } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Menu
} from "@material-ui/core";
import useStyles from "./styles";
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ({places,childClicked,isLoading,rating,type,setRating,setType}) => {
  const classes = useStyles();
  
  const [elRefs, setElRefs] = React.useState([])
  React.useEffect(() => {
    console.log({places});
    setElRefs((refs)=>Array(places.length).fill().map((_,i)=>refs[i]||createRef()))
    
  }, [places])
  

  return (
    <div className={classes.container}>
      <Typography variant="h4" className={classes.title}>
        Restaurants,Hotels & Attractions Near You
      </Typography>
      {isLoading?(<div className={classes.loading}>
        <CircularProgress size="5rem"/>
      </div>):(
        <>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select value={type} onChange={e => setType(e.target.value)}>
          <MenuItem value="restaurants">Restaurants</MenuItem>
          <MenuItem value="hotels">Hotels</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select value={rating} onChange={e => setRating(e.target.value)}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>4.0 and above</MenuItem>
          <MenuItem value={4.5}>4.5 and above</MenuItem>
        </Select>
      </FormControl>
      <Grid  container spacing={3} className={classes.list}>
          {places?.map((place, index) =>
           (<Grid ref={elRefs[index]} item key={index} xs={12}>
              <PlaceDetails place={place}
                selected={Number(childClicked)===index}
                refProp={elRefs[index]}
              />
          </Grid>))}
          </Grid>
          </>
)}
    </div>
  );
};

export default List;
