import React from "react";
import { useQuery } from "react-query";
import { useErrorHandler } from 'react-error-boundary';
import { fetchPhotos } from '../shared/dataOperations';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 720,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));


export default function PhotosList( { albumId }) {
    const classes = useStyles();

    const { isError, data, error } = useQuery(["photos", albumId], fetchPhotos);

    useErrorHandler(error);

    console.log("Album Id " + albumId);
    console.log('isError: ', isError, 'data: ', data, 'error: ', error);

  if (!isError)
    return (
        <div className={classes.root}>
        <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
            <ListSubheader component="div"><h2>Photos</h2></ListSubheader>
        </GridListTile>
        <GridList cellHeight={150} cols={3} className={classes.gridList}>
            {data.map((photo) => (
            <GridListTile key={photo.thumbnailUrl}>
                <img src={photo.thumbnailUrl} alt={photo.title} />
                <GridListTileBar
                title={photo.title}
                actionIcon={
                    <IconButton aria-label={`info about ${photo.title}`} className={classes.icon}>
                    <InfoIcon />
                    </IconButton>
                }
                />
            </GridListTile>
            ))}
        </GridList>
        </div>
    );
  else return(<div></div>);

}