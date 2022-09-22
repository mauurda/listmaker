import { searchTracks } from "../../utils/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });

  const response = await searchTracks(accessToken, req.query.q).then((res) =>
    res.json()
  );

  return res.status(200).json(response);
};

export default handler;
