//zipped size 3.19 kb
//first load 143 kb

import React, { useEffect, useState } from "react";

//hooks
import { useRouter } from "next/router";
import useSelection from "../../hooks/useSelection";

//components
import { ArrowLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Button from "../../components/Button";
import PlaylistTrack from "../../components/PlaylistTrack";
import SearchSongsSection from "../../components/SearchSongsSection";

//helper functions
import { isPresent } from "ts-is-present";

function PlaylistDetailsPage() {
  //PlaylistData
  //Future enhancement - > server side fetching
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();
  const [searchExternalMode, setSearchExternalMode] = useState(false);

  //Selection Context
  const { selectedTrackUris, selectTracks, deselectTracks, selectPlaylist } =
    useSelection();

  const router = useRouter();
  const { playlist_id } = router.query;

  //Selects all tracks in the playlist
  const selectAll = () => {
    //Checks not empty playlist
    if (playlist && playlist?.tracks?.items) {
      //selects playlist
      selectPlaylist(playlist);

      const tracks = playlist?.tracks.items
        .map((playListTrack) => playListTrack.track)
        .filter(isPresent);

      //adds songs directly
      selectTracks(tracks);
    }
  };

  //Deselects all tracks in a playlist
  const deselectAll = () => {
    const tracks = playlist?.tracks.items
      .map((playListTrack) => playListTrack.track?.uri)
      .filter(isPresent);
    //Checks not empty

    if (tracks?.length) {
      //Deselects all uris
      deselectTracks(tracks);
    }
  };

  //Fetches playlist full data
  const getPlaylistData = async () => {
    const playlist_data = await fetch(
      "/api/playlist/" + router.query.playlist_id
    ).then((res) => res.json());
    setPlaylist(playlist_data);
  };

  //Adds tracks returned from Search Song Section to the playlist
  //Future improvement: function allows for array of tracks but Search Song is set up for single track
  const addTracksToPlaylist = async (track_uris: string[]) => {
    let fullURL = `/api/playlist/${
      router.query.playlist_id
    }/tracks?uris=${track_uris.join(",")}`;

    await fetch(fullURL, {
      method: "POST",
    }).then((res) => res.json());
    await getPlaylistData();
    setSearchExternalMode(false);
  };

  //Gets playlist data on mount or returns home
  useEffect(() => {
    if (playlist_id) {
      getPlaylistData();
    } else {
      router.push("/");
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
          <p className="text-lg">{playlist?.description}</p>
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
              {/* 
              Future improvement: add max-height to make scrolling easier
              */}
              {playlist?.tracks?.items
                ?.filter((playlistTrack) => !!playlistTrack?.track?.uri)
                .filter(isPresent)
                .map((playlistTrack) => {
                  const selected = playlistTrack.track?.uri
                    ? selectedTrackUris.includes(playlistTrack.track?.uri)
                    : false;

                  return (
                    <div
                      onClick={
                        selected
                          ? //@ts-ignore    Pre-filtered above
                            () => deselectTracks([playlistTrack.track?.uri])
                          : //@ts-ignore    Pre-filtered above
                            () => selectTracks([playlistTrack.track])
                      }
                      key={playlistTrack.track?.uri}
                    >
                      <PlaylistTrack {...playlistTrack} selected={selected} />
                    </div>
                  );
                })}
            </div>
          </div>
        ) : (
          <SearchSongsSection
            onClose={() => setSearchExternalMode(false)}
            onClick={(track: SpotifyApi.TrackObjectFull) =>
              addTracksToPlaylist([track.uri])
            }
          />
        )}
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;
