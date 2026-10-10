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
localStorage.setItem("access_token", "BQBi1gMOdya6RVJE793P8zkGWdZTKPGDMT5_u-aF1WEVSvdBTb3Cjc-0yd3ViEWFHlaW5pm7OmayxEdPCxXCpn7sIcqPyFZDVL6Am9ekxYJpaGOdyCOpvSyGd5XXfkK9352gEv9pZf0e");
localStorage.setItem("track_id_1", "73CKjW3vsUXRpy3NnX4H7F");
localStorage.setItem("track_id_2", "10nyNJ6zNy2YVYLrcwLccB");
localStorage.setItem("track_id_3", "0YJ9FWWHn9EfnN0lHwbzvV");


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

    //
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




}
load();
