import Link from "next/link";
import React, { useState } from "react";
import Button from "../components/Button";
import FullTrack from "../components/FullTrack";
import PlaylistTrack from "../components/PlaylistTrack";
import SearchSongsSection from "../components/SearchSongsSection";
import useSelection from "../hooks/useSelection";

function MergePage() {
  const { selectedTracks, selectTracks, deselectTracks } = useSelection();
  const [addSongMode, setAddSongMode] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex flex-col space-y-5 ">
        <Link href="/">
          <Button>
            <p>Back</p>
          </Button>
        </Link>
        <h3>1. Confirm that the selected tracks are correct.</h3>
        <h3>2. Name your new playlist.</h3>

        <h3>3. Click create playlist.</h3>
        <h3>4. Enjoy :).</h3>
      </div>

      {addSongMode ? (
        <SearchSongsSection
          onClick={(tracks: SpotifyApi.TrackObjectFull) => {
            selectTracks([tracks]);
            setAddSongMode(false);
          }}
          onClose={() => setAddSongMode(false)}
        />
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <h2>{selectedTracks.length || 0} songs</h2>
            <Button onClick={() => setAddSongMode(true)}>
              <p>Add More Tracks?</p>
            </Button>
          </div>
          <div className="flex flex-col md:row-span-2 space-y-5 md:max-h-140 overflow-y-scroll scrollbar-hide">
            {selectedTracks.map((track: SpotifyApi.TrackObjectFull) => (
              <div key={track.id} onClick={() => deselectTracks([track.uri])}>
                {
                  //@ts-ignore
                  <PlaylistTrack track={track} selected />
                }
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        {" "}
        <h3>Name</h3>
        <input
          className="focus:outline-none py-3 border-b-2 mb-5 text-2xl bg-transparent "
          placeholder="New Playlist"
        />
        <Button>
          <p>Create!</p>
        </Button>
      </div>
    </div>
  );
}

export default MergePage;
