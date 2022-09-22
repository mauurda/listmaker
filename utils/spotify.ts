//credentials for getting token
const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");

//token endpoint
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

//for playlists that the user has saved
const MY_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";

//For a specific and existing playlist.
const FULL_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists";

//for creating new playlists (must add /{user_id}/playlists) after
const NEW_PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/users";

//To search for tracks
const TRACKS_ENDPOINT = "https://api.spotify.com/v1/search";

//Gets an updated token
const getAccessToken = async (refresh_token: string) => {
  return await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.log("error getting refreshed token", err));
};

//Gets users playlists (limited by API to 50)
//Future enhancement: add a limit and offset
//to encompass more playlists and improve usability.
export const getUsersPlaylists = async (refresh_token: string) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(MY_PLAYLISTS_ENDPOINT + "?limit=50", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

//Gets a full playlist for /playlist/[playlist_id]
//can also be used to select songs from index
//Future enhancement: separate getting tracks and playlist details to reduce overfetching.
export const getPlaylistDetails = async (
  refresh_token: string,
  playlist_id: string
) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(FULL_PLAYLIST_ENDPOINT + "/" + playlist_id, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

//Searches tracks based on a query
//Future enhancement: Add filters like song duration, language or music genre
export const searchTracks = async (refresh_token: string, query: string) => {
  const { access_token } = await getAccessToken(refresh_token);
  const fullSearchString =
    TRACKS_ENDPOINT + "?q=" + query.toString() + "&type=track&limit=5";
  return fetch(fullSearchString, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

//Takes a list of URIS and adds them to a playlist
//future enhancement: check no duplicates.
export const addTracksToPlaylist = async (
  refresh_token: string,
  playlist_id: string,
  track_uris: string[]
) => {
  const { access_token } = await getAccessToken(refresh_token);

  const fullPostString = `${FULL_PLAYLIST_ENDPOINT}/${playlist_id}/tracks`;

  return fetch(fullPostString, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ uris: track_uris }),
  });
};

//Creates a new playlist
export const createNewPlaylist = async (
  refresh_token: string,
  user_id: string,
  track_uris: string[],
  playlist_name = "New Playlist"
) => {
  const { access_token } = await getAccessToken(refresh_token);
  const fullPostString = `${NEW_PLAYLIST_ENDPOINT}/${user_id}/playlists`;
  const response: SpotifyApi.CreatePlaylistResponse = await fetch(
    fullPostString,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: playlist_name,
        description: "Created using Listmaker!",
        public: false,
      }),
    }
  ).then((res) => res.json());
  await addTracksToPlaylist(refresh_token, response.id, track_uris);

  return response;
};
