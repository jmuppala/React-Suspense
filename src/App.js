import React, { Suspense, lazy, useState } from 'react';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { ReactQueryDevtools } from "react-query-devtools";
import NavBar from './components/NavBar';
import LoadingComponent from './components/LoadingComponent';
import { ReactQueryConfigProvider } from "react-query";
import { ErrorBoundary } from "react-error-boundary";

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
          <ErrorBoundary
            fallbackRender={({error, componentStack, resetErrorBoundary}) => (
              <div role="alert">
                <div>Something went wrong!!</div>
                <pre>{error.message}</pre>
                <button
                  onClick={() => {
                    // this next line is why the fallbackRender is useful
                    // though you could accomplish this with a combination
                    // of the FallbackCallback and onReset props as well.
                    resetErrorBoundary()
                  }}
                >
                  Try again
                </button>
              </div>
            )}
          >
          <Suspense fallback={<LoadingComponent message={'Loading Users'} />}>
            <UserList selectedUser={selectedUser} setSelectedUser={setSelectedUser} setSelectedAlbum={setSelectedAlbum} />
            {selectedUser ?
              <Suspense fallback={<LoadingComponent message={'Loading Albums'} />}>
                <AlbumList userId={selectedUser} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />
              </Suspense>
              : <div></div>
            }
            {selectedAlbum ?
              <Suspense fallback={<LoadingComponent message={'Loading Photos'} />}>
                <PhotosList albumId={selectedAlbum} />
              </Suspense>
              : <div></div>
            }
          </Suspense>
          </ErrorBoundary>
          <ReactQueryDevtools initialIsOpen />
        </ReactQueryConfigProvider>
      </Container>
    </>
  );
}

export default App;
