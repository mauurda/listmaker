import { getSession } from "next-auth/react";
import { addTracksToPlaylist } from "../../../../utils/spotify";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });

  const response = await addTracksToPlaylist(
    accessToken,
    req.query.playlist_id,
    req.query.uris.split(",")
  ).then((res) => res.json());

  return res.status(200).json(response);
};

export default handler;
