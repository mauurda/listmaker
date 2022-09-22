const basic = Buffer.from(
  `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
).toString("base64");
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const MY_PLAYLISTS_ENDPOINT = "https://api.spotify.com/v1/me/playlists";
const PLAYLIST_ENDPOINT = "https://api.spotify.com/v1/playlists";
const TRACKS_ENDPOINT = "https://api.spotify.com/v1/search";

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

export const getUsersPlaylists = async (refresh_token: string) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(MY_PLAYLISTS_ENDPOINT + "?limit=50", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
export const getPlaylistDetails = async (
  refresh_token: string,
  playlist_id: string
) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(PLAYLIST_ENDPOINT + "/" + playlist_id, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
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
export const addTracksToPlaylist = async (
  refresh_token: string,
  playlist_id: string,
  track_uris: string[]
) => {
  const { access_token } = await getAccessToken(refresh_token);

  const fullPostString = `${PLAYLIST_ENDPOINT}/${playlist_id}/tracks`;

  return fetch(fullPostString, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ uris: track_uris }),
  });
};