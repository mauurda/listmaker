import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Data {
    session: Session;
    token: Token;
  }
  interface User {
    email: string;
    image: string;
    name: string;
  }
  interface Session {
    expires: Date;
    user: User;
  }
  interface Token {
    accessToken: string;
    email: string;
    exp: number;
    iat: nuumber;
    jti: number;
    name: string;
    picture: string;
    sub: string;
  }
  interface NextAuth {
    authenticated: boolean;
    data: Data;
  }
}
