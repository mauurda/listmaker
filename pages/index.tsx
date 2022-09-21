import type { NextPage } from 'next'
import Head from 'next/head'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "../components/Button";
import { ArrowLeftIcon, ListBulletIcon } from "@heroicons/react/24/outline";
import { AnimateSharedLayout } from "framer-motion";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [focusedPlaylist, setFocusedPlaylist] =
    useState<SpotifyApi.PlaylistObjectSimplified>();

  const [playlists, setPlaylists] =
    useState<SpotifyApi.PlaylistObjectSimplified[]>();

  useEffect(() => {
    if (!!session && !!session.token) {
      getPlaylists();
    }
  }, [session]);

  const getPlaylists = async () => {
    const { items: new_playlists }: SpotifyApi.ListOfUsersPlaylistsResponse =
      await fetch("/api/playlist")
        .then((res) => res.json())
        .catch((err) => console.log(`Error getting UserPlaylists => ${err}`));
    if (new_playlists?.length) {
      setPlaylists(new_playlists);
    }
  };

  return (
    <div className="">
      <Head>
        <title>Overplay</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimateSharedLayout>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {playlists &&
            !!playlists.length &&
            playlists.map((playlist) => {
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
                  key={playlist.id}
                  layoutId={playlist.id}
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
      </AnimateSharedLayout>
    </div>
  );
};

export default Home
