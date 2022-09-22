import React from "react";
import moment from "moment";
import { CalendarIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { getMinuteStringFromMiliseconds } from "../utils/timeFunctions";



function PlaylistTrack({
  added_at,
  added_by,
  track,
  selected = false,
}: PlaylistTrackProps) {
  return (
    <div className="flex py-2  justify-between clickable w-full">
      <div className="flex  items-center  space-x-2">
        <div className={selected ? "text-white" : "text-transparent"}>
          <CheckCircleIcon className={`h-6 `} />
        </div>
        {track?.album.images[0]?.url && (
          <img
            src={track?.album.images[0]?.url}
            className="h-12 aspect-square object-cover"
          />
        )}
        <div className="flex flex-col ">
          <h4 className="">{track?.name}</h4>
          <h5>{track?.artists.map((artist) => artist.name).join(", ")}</h5>
        </div>
      </div>

      <div className=" flex flex-col text-right">
        <p className="text-lg">
          {getMinuteStringFromMiliseconds(track?.duration_ms)}
        </p>
        <div className="flex space-x-2 items-center">
          <CalendarIcon className="h-4" />
          <p>{moment(added_at).format("YY/MM/DD")}</p>
        </div>
      </div>
    </div>
  );
}

export default PlaylistTrack;
