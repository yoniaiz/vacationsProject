import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import '../styles/vicationCardDesign.css'
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const CardV = props => {
  var {
    title,
    location,
    image,
    start_date,
    end_date,
    price,
    id
  } = props.vacation;
  const classes = useStyles();
  var likeButton = (props.admin)?<i class="fas fa-trash-alt" onClick={() => props.deleteVic(id)}></i>:(props.like)?<FavoriteIcon className="favoriteOn" onClick={() => props.liked(id)} />:<FavoriteIcon className="favoriteOff" onClick={() => props.liked(id)} />
  var moreIcon = (props.admin)?<MoreVertIcon onClick = {() => props.modal({...props.vacation})} />:<i className=" fas fa-plane" style={{fontSize:'30px'}}></i>
  const flag = "/svg/"+(location.toLowerCase())+".svg"
  return (
    <div className="myCard col-lg-4 col-md-4 col-sm-12 col-xs-12 ml-xl-0  mt-5 ">
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar>
              <img src={flag} alt="no image" style={{height:'40px',fontSize:'15px'}}/>
            </Avatar>
          }
          action={
            <IconButton className='mt-2 more'  aria-label="Settings" >
              {moreIcon}
            </IconButton>
          }
          title={title}
          subheader={location}
        />
        <CardMedia
          className={classes.media}
          image={image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>Start date:</strong> {start_date} <br/> <strong>End date:</strong> {end_date} <br/> <strong>Price:</strong> {price}$
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className='like' aria-label="Add to favorites" >
            {likeButton}
          </IconButton>
          <IconButton className='share' aria-label="Share">
            <ShareIcon />
          </IconButton>
          <div className="pull-right" style={{fontSize:'10px',color:'gray' ,textAlign:'center'}}>Icons made by <a href="https://www.freepik.com/?__hstc=57440181.8d4f46e4f4bdfa8b74657c308540562b.1559559217763.1559633790149.1560518050644.3&__hssc=57440181.9.1560518050644&__hsfp=3758434658" title="Freepik" style={{color:'black'}}>Freepik</a> from <a href="https://www.flaticon.com/" 	style={{color:'black'}}	    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 		    title="Creative Commons BY 3.0" target="_blank" style={{color:'black'}}>CC 3.0 BY</a></div>
        </CardActions>
      </Card>
    </div>
  );
}
export default CardV;

