import React from "react";
import { useQuery } from "react-query";
import { useErrorHandler } from 'react-error-boundary';
import { fetchAlbums } from '../shared/dataOperations';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      '& .Mui-selected': {
          backgroundColor: theme.palette.primary.dark,
          color: 'white'
      }
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    listItem: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: 10,
        margin: theme.spacing(1, 0.25, 2, 0.25)
    },
    title: {
        margin: theme.spacing(0, 2)
    }
  }));


export default function AlbumList( { userId, selectedAlbum, setSelectedAlbum }) {
    const classes = useStyles();
  
    const handleListItemClick = (event, id) => {
        console.log("Album Id: ", + id);
        setSelectedAlbum(id);
    };

    const { isError, data, error } = useQuery(["albums", userId], fetchAlbums);

    useErrorHandler(error);

    console.log("User Id " + userId + "selected Album ", selectedAlbum);
    console.log('isError: ', isError, 'data: ', data, 'error: ', error);

   if (!isError)
    return (
        <div className={classes.root}>
        <h2>Albums</h2>
        <GridList className={classes.gridList} cols={2.5} cellHeight='auto' spacing={20}>
            {data.map((album) => (
                <ListItem key={album.id} className={classes.listItem}
                    button
                    selected={selectedAlbum === album.id}
                    onClick={(event) => handleListItemClick(event, album.id)}
                >
                    <ListItemText className={classes.title} primary={album.title} />
                </ListItem>
            ))}
        </GridList>
        </div>
    );
  else return(<div></div>);
}