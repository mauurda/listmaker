import { getPlaylistDetails } from "../../../utils/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });

  const response = await getPlaylistDetails(
    accessToken,
    req.query.playlist_id
  ).then((res) => res.json());

  return res.status(200).json(response);
};

export default handler;
