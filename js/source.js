// *********************************************************************
// Homework 4 APIs
// *********************************************************************

function convertMsToMinSec(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const paddedSeconds = String(seconds).padStart(2, '0');
  return `${minutes}:${paddedSeconds}`;
}

// **************** Update code below  **************** 


// IDs and secret token should come from Spotify
localStorage.setItem("artist_id", "4Z8W4fKeB5YxbusRsdQVPb");
localStorage.setItem("access_token", "BQBThc1-DtzKLsi_bZhTj3MVH4inVh6b35e-H9s_b87OBP765hgE4RnKAvfd4jCjXI0qcv2_rODm6iY_pHcw4H1mLUUJpz0jPgKFzAfTQXZH8CwTLKNXpnhnNhjV3F1vcNI1BQ4EawJd");
localStorage.setItem("track_id_1", "73CKjW3vsUXRpy3NnX4H7F");
localStorage.setItem("track_id_2", "10nyNJ6zNy2YVYLrcwLccB");
localStorage.setItem("track_id_3", "0YJ9FWWHn9EfnN0lHwbzvV");

//add albums ids
localStorage.setItem("album_id_1", "6dVIqQ8qmQ5GBnJ9shOYGE");
localStorage.setItem("album_id_2", "5vkqYmiPBYLaalcmjujWxK");
localStorage.setItem("album_id_3", "35UJLpClj5EDrhpNIi4DFg");
localStorage.setItem("album_id_4", "3gBVdu4a1MMJVMy6vwPEb8");


//helper function to pull requests data from Spotify API
//function takes in url for specific data needed from Artist page and access token for authorization
async function fetchSpotifyData(url, accessToken) {
  //fetch data from Spotify API using fetch function
      const response = await fetch(url, {
          headers: { Authorization: `Bearer ${accessToken}` }
      });
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      //return the response as JSON
      return response.json();
} 


async function load(){
    
    let artistID = localStorage.getItem("artist_id");
    let accessToken = localStorage.getItem("access_token");
    let trackID1 = localStorage.getItem("track_id_1");
    let trackID2 = localStorage.getItem("track_id_2");
    let trackID3 = localStorage.getItem("track_id_3");

    //add albums ids
    let albumID1 = localStorage.getItem("album_id_1");
    let albumID2 = localStorage.getItem("album_id_2");
    let albumID3 = localStorage.getItem("album_id_3");
    let albumID4 = localStorage.getItem("album_id_4");
    
    // get artist data using helper function to change name
    let artistData = await fetchSpotifyData(`https://api.spotify.com/v1/artists/${artistID}`, accessToken);
    document.getElementById("artist-name").textContent = artistData['name'];
    // get artist image using querySelector and change image
    const artistImage = document.querySelector('.artist-image img');
    artistImage.src = artistData['images'][0]['url'];

    //get track data using helper function
    let trackData1 = await fetchSpotifyData(`https://api.spotify.com/v1/tracks/${trackID1}`, accessToken);
    let trackData2 = await fetchSpotifyData(`https://api.spotify.com/v1/tracks/${trackID2}`, accessToken);
    let trackData3 = await fetchSpotifyData(`https://api.spotify.com/v1/tracks/${trackID3}`, accessToken);

    //update track information on the page using querySelector and the data from the API
    //added tracks to list to make it easier by looping through the tracks and updating the information
    const tracks = document.querySelectorAll('.track-list .track');
    const trackData = [trackData1, trackData2, trackData3];
    tracks.forEach((track, index) => {
        const trackInfo = trackData[index];
        track.querySelector('.track-title').textContent = trackInfo['name'];
        track.querySelector('.track-duration').textContent = convertMsToMinSec(trackInfo['duration_ms']);
        track.querySelector('.track-album').textContent = trackInfo['album']['name'];
        const trackImage = track.querySelector('.track img');
        trackImage.src = trackInfo['album']['images'][0]['url'];
        track.querySelector('.track-number').textContent = trackInfo['track_number'];
    });

    //fetch data for albums using helper function and album ids from local storage
    let albumData1 = await fetchSpotifyData(`https://api.spotify.com/v1/albums/${albumID1}`, accessToken);
    let albumData2 = await fetchSpotifyData(`https://api.spotify.com/v1/albums/${albumID2}`, accessToken);
    let albumData3 = await fetchSpotifyData(`https://api.spotify.com/v1/albums/${albumID3}`, accessToken);
    let albumData4 = await fetchSpotifyData(`https://api.spotify.com/v1/albums/${albumID4}`, accessToken);

    //add albums to list to make it easier by looping through the albums and updating the information
    const albums = document.querySelectorAll('.album-grid .album-card');
    const albumData = [albumData1, albumData2, albumData3, albumData4];
    //iterate through the albums and update the information on the page using querySelector and the data from the API
    albums.forEach((album, index) => {
        const albumInfo = albumData[index];
        album.querySelector('.album-card h3').textContent = albumInfo['name'];
        const albumImage = album.querySelector('.album-card img');
        albumImage.src = albumInfo['images'][0]['url'];
        album.querySelector('.album-card p').textContent = `${albumInfo['release_date'].slice(0,4)} • ${albumInfo['type']}`;
    });

}
load();
