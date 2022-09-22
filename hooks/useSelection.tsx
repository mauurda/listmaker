import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SelectionContext = createContext({});

export const SelectionProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {
  const [selectedTracks, setSelectedTracks] =
    useState<SpotifyApi.TrackObjectFull[]>();
  const [selectedPlaylists, setSelectedPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  const [selectedTrackUris, setSelectedTrackUris] = useState<string[]>([]);
  const [selectedPlaylistIds, setSelectedPlaylistUris] = useState<string[]>([]);

  const selectPlaylist = async (
    playlist: SpotifyApi.PlaylistObjectSimplified
  ) => {
    setSelectedPlaylists([...(selectedPlaylists || []), playlist]);
    const playlistTracks = await getPlaylistTracks(playlist.id);
    if (playlistTracks?.length) {
      //@ts-ignore
      selectTracks(playlistTracks);
    }
  };
  const deselectPlaylist = async (playlist_id: string) => {
    setSelectedPlaylists([
      ...(selectedPlaylists || []).filter(
        (playlist) => playlist.id !== playlist_id
      ),
    ]);
    const playlistTracks = await getPlaylistTracks(playlist_id);
    if (playlistTracks?.length) {
      deselectTracks(
        playlistTracks.map((track) => (track as SpotifyApi.TrackObjectFull).uri)
      );
    }
  };
  const selectTracks = (tracks: SpotifyApi.TrackObjectFull[]) => {
    setSelectedTracks([
      ...(selectedTracks || []),
      ...tracks.filter((track) => !selectedTrackUris.includes(track.uri)),
    ]);
  };
  const deselectTracks = (track_ids: string[]) => {
    setSelectedTracks([
      ...(selectedTracks || []).filter(
        (track) => !track_ids.includes(track.uri)
      ),
    ]);
  };
  const getPlaylistTracks = async (playlist_id: string) => {
    let baseURL =
      process.env.NODE_ENV === "production"
        ? "https://listmaker.vercel.app"
        : "http://localhost:3000";
    let fullURL = baseURL + "/api/playlist/" + playlist_id;

    const playlist_data: SpotifyApi.PlaylistObjectFull = await fetch(
      fullURL
    ).then((res) => res.json());
    if (playlist_data?.tracks?.items?.length) {
      let tracks = playlist_data?.tracks?.items.map(
        (trackInPlaylist) => trackInPlaylist.track
      );
      if (tracks.length) {
        //@ts-ignore
        return tracks;
      }
    }
  };
  const clearSelection = () => {
    setSelectedPlaylists([]);
    setSelectedTracks([]);
  };

  useEffect(() => {
    if (selectedPlaylists?.length) {
      setSelectedPlaylistUris(selectedPlaylists.map((playlist) => playlist.id));
    } else {
      setSelectedPlaylistUris([]);
    }
    if (selectedTracks?.length) {
      setSelectedTrackUris(selectedTracks.map((track) => track.uri));
    } else {
      setSelectedTrackUris([]);
    }
  }, [selectedTracks, selectedTracks]);
  return (
    <SelectionContext.Provider
      value={{
        selectedTracks,
        selectedPlaylists,
        selectedTrackUris,
        selectedPlaylistIds,
        selectPlaylist,
        deselectPlaylist,
        selectTracks,
        deselectTracks,
        clearSelection,
      }}
    >
      {children}
    </SelectionContext.Provider>
  );
};
export default function useSelection(): {
  selectedTracks: SpotifyApi.TrackObjectFull[];
  selectedTrackUris: string[];
  selectedPlaylists: SpotifyApi.PlaylistObjectSimplified[];
  selectedPlaylistIds: string[];
  selectTracks: (tracks: SpotifyApi.TrackObjectFull[]) => void;
  deselectTracks: (track_uris: string[]) => void;
  selectPlaylist: (playlist: SpotifyApi.PlaylistObjectSimplified) => void;
  deselectPlaylist: (playlist_id: string) => void;
  clearSelection: () => void;
} {
  //@ts-ignore
  return useContext(SelectionContext);
}
