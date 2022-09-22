import { getSession } from "next-auth/react";
import { createNewPlaylist } from "../../../utils/spotify";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });

  const response = await createNewPlaylist(
    accessToken,
    req.query.user_id,
    req.query.uris.split(","),
    req.query.playlist_name
  );

  return res.status(200).json(response);
};

export default handler;
