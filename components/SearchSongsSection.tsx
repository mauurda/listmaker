import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import React, { useEffect, useState } from "react";

import Button from "./Button";
import FullTrack from "./FullTrack";
import PlaylistTrack from "./PlaylistTrack";

function SearchSongsSection({
  onClick,
  onClose,
}: {
  onClick: any;
  onClose: any;
}) {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [trackResults, setTrackResults] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);
  const searchSongs = async (input: string) => {
    let baseURL =
      process.env.NODE_ENV === "production"
        ? "https://listmaker.vercel.app"
        : "http://localhost:3000";
    let fullURL = baseURL + "/api/tracks?q=" + JSON.stringify(input);

    const response = await fetch(fullURL).then((res) => res.json());
    if (response?.tracks?.items?.length) {
      setTrackResults(response?.tracks?.items);
    } else {
      setTrackResults([]);
    }

    setLoading(false);
  };

  const handleTyping = (input: string) => {
    setInputValue(input);
    if (input.length > 2) {
      setLoading(true);
      searchSongs(input);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-between ">
        <h2>Add Songs</h2>
        <Button onClick={onClose}>
          <XMarkIcon className="h-6" />
          <h3>Close</h3>
        </Button>
      </div>
      <div className="flex items-center w-full border-b-4 py-2">
        <MagnifyingGlassIcon className="h-6  " />
        <input
          className="bg-transparent text-xl px-2 flex-grow outline-none focus:outline-none"
          placeholder="Search tracks here..."
          value={inputValue}
          //TODO: correctly specify types on input callbacks.
          onChange={(e: any) => handleTyping(e.target.value)}
          type="text"
        />
      </div>
      <div>
        {trackResults?.map((track) => (
          <div onClick={() => onClick(track)} key={track.uri}>
            <FullTrack {...track} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchSongsSection;
