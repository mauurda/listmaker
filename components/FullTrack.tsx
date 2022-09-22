import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";

import { getMinuteStringFromMiliseconds } from "../utils/timeFunctions";
import Button from "./Button";

function FullTrack({
  name,
  artists,
  album,
  duration_ms,
}: SpotifyApi.TrackObjectFull) {
  return (
    <div className="flex justify-between clickable w-full py-2">
      <div className="flex  items-center space-x-2">
        <img
          src={album.images[0].url}
          className="h-12 aspect-square object-cover"
        />
        <div className="flex flex-col text-ellipsis">
          <h4>{name}</h4>
          <h5>{artists.map((artist) => artist.name).join(", ")}</h5>
        </div>
      </div>

      <div className=" flex items-center space-x-1 text-right">
        <p className="text-lg">{getMinuteStringFromMiliseconds(duration_ms)}</p>
        <Button>
          <PlusIcon className="h-6" />
        </Button>
      </div>
    </div>
  );
}

export default FullTrack;
