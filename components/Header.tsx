import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Session } from "next-auth";

function Header() {
  const { data } = useSession();

  //@ts-ignore
  const session: Session = data?.session;

  return (
    <header className="bg-green-900 flex w-full py-3">
      <div className="max-w-5xl flex text-white mx-auto px-4 md:px-0 flex-grow justify-between items-center">
        <Link href="/">
          <h1 className="text-4xl font-semibold tracking-widest clickable">
            List<span className="font-light tracking-widest">maker</span>
          </h1>
        </Link>
        {!!session?.user ? (
          <div
            className="flex items-center clickable"
            onClick={() => signOut()}
          >
            {session.user.image && (
              <img
                className="h-12 w-12 shadow-md  rounded-full mr-1 object-cover"
                src={session.user.image}
              />
            )}
            <h4 className="hidden md:inline">{session?.user?.name}</h4>
            <ArrowRightOnRectangleIcon className="h-8" />
          </div>
        ) : (
          <div className="flex items-center clickable" onClick={() => signIn()}>
            <h4 className="hidden md:inline mr-2">Login</h4>
            <UserCircleIcon className="h-8 " />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
