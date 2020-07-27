import { baseUrl } from './baseUrl';

async function fetchData(path) {
    return(await fetch(baseUrl + path).then(response => new Promise(resolve => setTimeout(() => resolve(response.json()), 5000)) ));
}

export const fetchUsers = () => fetchData('users');

export const fetchAlbums = (key, userId) => fetchData('users/' + userId + '/albums');

export const fetchPhotos = (key, albumId) => fetchData('albums/' + albumId + '/photos');
