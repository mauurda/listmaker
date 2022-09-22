import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import PlaylistTrack from "../../components/PlaylistTrack";
import SearchSongsSection from "../../components/SearchSongsSection";
import useSelection from "../../hooks/useSelection";

function PlaylistDetailsPage() {
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const { selectedTrackUris, selectTracks, deselectTracks, selectPlaylist } =
    useSelection();
  const router = useRouter();
  const { data } = useSession();
  const user = data?.user;

  const { playlist_id } = router.query;
  const [searchExternalMode, setSearchExternalMode] = useState(false);

  const selectAll = () => {
    selectPlaylist(playlist);
    selectTracks(
      playlist?.tracks.items.map((playListTrack) => playListTrack.track)
    );
  };
  const deselectAll = () => {
    deselectTracks(
      playlist?.tracks.items.map((playListTrack) => playListTrack.track?.uri)
    );
  };
  const getPlaylistData = async () => {
    let baseURL =
      process.env.NODE_ENV === "production"
        ? "https://listmaker.vercel.app"
        : "http://localhost:3000";
    let fullURL = baseURL + "/api/playlist/" + router.query.playlist_id;

    const playlist_data = await fetch(fullURL).then((res) => res.json());
    setPlaylist(playlist_data);
  };
  const addSongToPlaylist = async (track_uris: string[]) => {
    let baseURL =
      process.env.NODE_ENV === "production"
        ? "https://listmaker.vercel.app"
        : "http://localhost:3000";
    let fullURL = `${baseURL}/api/playlist/${
      router.query.playlist_id
    }/tracks?uris=${track_uris.join(",")}`;

    const response = await fetch(fullURL, {
      method: "POST",
    }).then((res) => res.json());
    await getPlaylistData();
    setSearchExternalMode(false);
  };

  useEffect(() => {
    if (playlist_id) {
      getPlaylistData();
    }
  }, [playlist_id]);
  return (
    <div className="flex flex-col space-y-5">
      <div className="flex">
        <Link href="/">
          <Button>
            <ArrowLeftIcon className="h-6" />
            <h3>Back</h3>
          </Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="flex flex-col space-y-5">
          {!!playlist?.images?.length && (
            <img
              src={playlist?.images[0]?.url}
              className="flex relative w-full aspect-square"
            />
          )}
          <h1>{playlist?.name}</h1>
          {!searchExternalMode && (
            <div className="flex space-x-5">
              <Button onClick={() => selectAll()}>
                <p>Select All</p>
              </Button>
              <Button onClick={() => deselectAll()}>
                <p>Deselect All</p>
              </Button>
            </div>
          )}
          {playlist?.description}
        </div>
        {!searchExternalMode ? (
          <div>
            <div className="flex items-center justify-between border-b-4 pb-4">
              <h2>Songs ({playlist?.tracks?.total})</h2>

              <Button onClick={() => setSearchExternalMode(true)}>
                <PlusIcon className="h-8" />
                <p>Add Tracks</p>
              </Button>
            </div>
            <div className="flex flex-col w-full">
              {playlist?.tracks?.items?.map((playlistTrack) => {
                const selected = playlistTrack.track?.uri
                  ? selectedTrackUris.includes(playlistTrack.track?.uri)
                  : false;

                return (
                  <div
                    onClick={
                      selected
                        ? () => deselectTracks([playlistTrack.track?.uri])
                        : () => selectTracks([playlistTrack.track])
                    }
                  >
                    <PlaylistTrack
                      {...playlistTrack}
                      key={playlistTrack.track?.uri}
                      selected={selected}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <SearchSongsSection
            onClose={() => setSearchExternalMode(false)}
            onClick={(track: SpotifyApi.TrackObjectFull) =>
              addSongToPlaylist([track.uri])
            }
          />
        )}
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;
