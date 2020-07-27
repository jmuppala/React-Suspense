import React, { Suspense, lazy, useState } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ReactQueryDevtools } from "react-query-devtools";
import NavBar from './components/NavBar';
import LoadingComponent from './components/LoadingComponent';
import { ReactQueryConfigProvider } from "react-query";

const queryConfig = {
  shared: {
    suspense: true,
  }
};

const UserList = lazy(() => import('./components/UserList')); // Lazy-loaded
const AlbumList = lazy(() => import('./components/AlbumList')); // Lazy-loaded
const PhotosList = lazy(() => import('./components/PhotosList')); // Lazy-loaded

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <>
      <CssBaseline />
      <Container fixed>
        <NavBar />
        <ReactQueryConfigProvider config={queryConfig}>
          <Suspense fallback={<LoadingComponent message={'Loading'} />}>
            <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser} setSelectedAlbum={setSelectedAlbum} />
            {selectedUser ?
              <AlbumList userId={selectedUser} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />
              : <div></div>
            }
            {selectedAlbum ?
              <PhotosList albumId={selectedAlbum} />
              : <div></div>
            }
          </Suspense>
          <ReactQueryDevtools initialIsOpen />
        </ReactQueryConfigProvider>
      </Container>
    </>
  );
}

export default App;
