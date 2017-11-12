async function fetchAlbums() {
    let res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    let json = await res.json()
    console.log(json);
}

fetchAlbums();