import React, { useState } from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "./Button";
import FullTrack from "./FullTrack";

function SearchSongsSection({
  onClick,
  onClose,
}: {
  onClick: (track: SpotifyApi.TrackObjectFull) => void;
  onClose: () => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [trackResults, setTrackResults] = useState<
    SpotifyApi.TrackObjectFull[]
  >([]);
  //searches song s based on query
  const searchSongs = async (input: string) => {
    let fullURL = "/api/tracks?q=" + JSON.stringify(input);
    const response = await fetch(fullURL).then((res) => res.json());
    if (response?.tracks?.items?.length) {
      setTrackResults(response?.tracks?.items);
    } else {
      setTrackResults([]);
    }
  };

  //handles typing and search.
  //only searches after 3 or more letters
  const handleTyping = (input: string) => {
    setInputValue(input);
    if (input.length > 2) {
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
