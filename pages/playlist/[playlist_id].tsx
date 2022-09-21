import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import PlaylistTrack from "../../components/PlaylistTrack";

function PlaylistDetailsPage() {
  const [playlist, setPlaylist] = useState<SpotifyApi.PlaylistObjectFull>();

  const router = useRouter();
  const { playlist_id } = router.query;

  const getPlaylistData = async () => {
    let baseURL =
      process.env.NODE_ENV === "production"
        ? "https://listmaker.vercel.app"
        : "http://localhost:3000";
    let fullURL = baseURL + "/api/playlist/" + router.query.playlist_id;

    const playlist_data = await fetch(fullURL).then((res) => res.json());
    setPlaylist(playlist_data);
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
          {!!playlist?.images.length && (
            <img
              src={playlist?.images[0].url}
              className="flex relative w-full aspect-square"
            />
          )}
          <h1>{playlist?.name}</h1>

          {playlist?.description}
        </div>

        <div>
          <div className="flex items-center justify-between border-b-4 pb-4">
            <h2>Songs ({playlist?.tracks.total})</h2>
          </div>
          <div className="flex flex-col w-full">
            {playlist?.tracks?.items?.map((playlistTrack) => {
              return (
                <div>
                  <PlaylistTrack
                    {...playlistTrack}
                    key={playlistTrack.track?.id}
                    selected={false}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;

// export async function getServerSideProps({ params }): GetServerSideProps {
//   let props = {};

//   if (playlist_data) {
//     props = { ...props, playlist_data };
//   }
//   return { props };
// }
