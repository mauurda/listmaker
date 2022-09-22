import NextAuth, { Account, Session, Token, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions = {
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-modify-public,playlist-modify-private",
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: Token; account: Account }) {
      if (account) {
        token.accessToken = account.refresh_token || "";
      }
      return token;
    },
    async session(session: Session, user: User, token: JWT) {
      return session;
    },
  },
};
//@ts-ignore
export default NextAuth(authOptions);
