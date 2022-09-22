import React, { useEffect, useState } from "react";
import type { NextPage } from "next";

import { useSession } from "next-auth/react";
import useSelection from "../hooks/useSelection";

import PlaylistCard from "../components/PlaylistCard";
import Link from "next/link";
import Button from "../components/Button";
import { ArrowLeftIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { LayoutGroup, motion } from "framer-motion";

const Home: NextPage = () => {
  const { data: session } = useSession();

  //selection context
  const {
    selectedPlaylists,
    selectPlaylist,
    selectedPlaylistIds,
    selectedTrackUris,
    deselectPlaylist,
  } = useSelection();

  //Intermediate selection
  const [focusedPlaylist, setFocusedPlaylist] =
    useState<SpotifyApi.PlaylistObjectSimplified>();
  //Playlist data
  const [playlists, setPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  //gets data if authenticated
  useEffect(() => {
    if (!!session && !!session.token) {
      getPlaylists();
    }
  }, [session]);

  //gets users playlists
  const getPlaylists = async () => {
    const { items: new_playlists }: SpotifyApi.ListOfUsersPlaylistsResponse =
      await fetch("/api/playlist")
        .then((res) => res.json())
        .catch((err) => console.log(`Error getting UserPlaylists => ${err}`));

    setPlaylists(new_playlists);
  };

  return (
    <div>
      {session ? (
        <LayoutGroup>
          {selectedPlaylists?.length ? (
            <div className="flex-col space-y-5 mb-5">
              <h2>Playlists you've selected to merge</h2>
              <div className="flex flex-row overflow-x-scroll w-full scrollbar-hide">
                {selectedPlaylists?.map((playlist) => (
                  <motion.div
                    className="flex flex-col mr-3 w-24 flex-shrink-0 overflow-x-clip clickable"
                    onClick={() => deselectPlaylist(playlist.id)}
                    key={playlist.id}
                    layoutId={playlist.id}
                  >
                    <img
                      src={playlist?.images[0]?.url}
                      className="h-24 object-cover w-full"
                    />
                    <p className="truncate">{playlist.name}</p>
                  </motion.div>
                ))}
              </div>
              <p>({selectedTrackUris?.length}) songs</p>
              <Link href={`/merge`}>
                <Button>
                  <p>Merge and create new playlist</p>
                </Button>
              </Link>
            </div>
          ) : (
            <h4>Select a playlist to begin</h4>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {playlists &&
              !!playlists.length &&
              playlists
                .filter(
                  (playlist) => selectedPlaylistIds.indexOf(playlist.id) < 0
                )
                .map((playlist) => {
                  const focused = focusedPlaylist?.id === playlist.id;
                  return (
                    <motion.div
                      className={`${focused && "col-span-2 row-span-2"}`}
                      onClick={
                        focused
                          ? (e) => e.preventDefault()
                          : () => setFocusedPlaylist(playlist)
                      }
                      layout
                      key={playlist.uri}
                      layoutId={playlist.uri}
                    >
                      <PlaylistCard
                        name={playlist?.name}
                        numberOfSongs={playlist?.tracks?.total}
                        image={
                          playlist.images &&
                          playlist.images?.length > 0 &&
                          playlist.images[0]?.url
                            ? playlist.images[0]?.url
                            : false
                        }
                      />
                      {focused && (
                        <div className="flex w-full mt-5  items-center justify-between space-x-3">
                          <Button onClick={() => setFocusedPlaylist(undefined)}>
                            <ArrowLeftIcon className="h-6" />
                            <p>Cancel</p>
                          </Button>
                          <Button
                            onClick={() => {
                              selectPlaylist(playlist);
                              setFocusedPlaylist(undefined);
                            }}
                          >
                            <p>Merge</p>
                          </Button>
                          <Link href={`/playlist/${playlist.id}`}>
                            <Button>
                              <ListBulletIcon className="h-6" />
                              <p>
                                <span className="hidden md:inline">View</span>
                                Tracks
                              </p>
                            </Button>
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
          </div>
        </LayoutGroup>
      ) : (
        <h1 className="text-center">Please login to continue!</h1>
      )}
    </div>
  );
};

export default Home;
