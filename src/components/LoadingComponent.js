import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

function LoadingComponent() {
    const classes = useStyles();

    return (
      <div className={classes.root}>
        <CircularProgress />
        <p>Loading . . .</p>
      </div>
    );
};

export default LoadingComponent;