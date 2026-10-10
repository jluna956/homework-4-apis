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
localStorage.setItem("track_id_1", "");
localStorage.setItem("track_id_2", "");
localStorage.setItem("track_id_3", "");


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
}
load();

