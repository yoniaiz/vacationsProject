import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles(theme => ({
  fab: {
    margin: theme.spacing(10)
  },
  extendedIcon: {
    marginRight: theme.spacing(0)
  }
}));

const AddButton = (props) =>{
  const classes = useStyles();
  return (
    <div className='col-lg-4 col-md-5 col-sm-12 col-xs-12 ml-4 pr-1' style={{maxWidth:'345px',textAlign:'center',paddingTop:'10%'}}>
      <Fab color="" aria-label="Add" style={{outline:'none'}} className={classes.fab} onClick={() => props.addCard()}>
        <AddIcon />
      </Fab>
    </div>
  );
}
export default AddButton;