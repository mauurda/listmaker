import React from "react";
import { motion } from "framer-motion";

import type PlaylistCardProps from "../types/components/PlaylistCard";

export default function PlaylistCard({
  name,
  numberOfSongs,
  image,
}: PlaylistCardProps) {
  return (
    <motion.div
      className={"flex cursor-pointer  space-y-5  flex-col"}
      initial={{ opacity: 0.1, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05, rotate: 3 }}
    >
      {!!image && (
        <div className="flex relative w-full aspect-square">
          <img src={image} />
        </div>
      )}

      <h3>
        {name} <span className="font-normal">({numberOfSongs} songs)</span>
      </h3>
    </motion.div>
  );
}
