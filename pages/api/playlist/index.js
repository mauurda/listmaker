import { getUsersPlaylists } from "../../../utils/spotify";
import { getSession } from "next-auth/react";

const handler = async (req, res) => {
  const {
    token: { accessToken },
  } = await getSession({ req });


  const { items } = await getUsersPlaylists(accessToken).then((res) =>
    res.json()
  );

  return res.status(200).json({ items });
};

export default handler;
