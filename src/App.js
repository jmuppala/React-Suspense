import React from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import NavBar from './components/NavBar';
import LoadingComponent from './components/LoadingComponent';

function App() {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <NavBar />
        <LoadingComponent />
      </Container>
    </>
  );
}

export default App;
