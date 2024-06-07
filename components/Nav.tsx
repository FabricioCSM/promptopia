"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";


const Nav = () => {
    const isUserLogged = true;
    const [toggleDropdown , setToggleDropwdown] = useState(false)
    const [providers, setProviders] = useState(null)

    useEffect(() => {
        (async () => {
          const response = await getProviders() as any;
          setProviders(response);
        })();
      }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
        <Link href="/" className="flex w-full gap-2 justify-between">
            <div className="flex gap-2">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Promptopia Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </div>
        </Link>

        {/* Desktop Navigation */ }
        <div className="sm:flex hidden">
            {isUserLogged ? (
                <div className="flex gap-3 md:gap-5">
                    <Link className="black_btn" href="/create-prompt">
                        Create Post
                    </Link>

                    <button type="button" onClick={() => signOut} className="outline_btn">
                        Sign Out
                    </button>

                    <Link href="/profile">
                        <Image
                            src="/assets/images/logo.svg"
                            width={37}
                            height={37}
                            className="rounded-full"
                            alt="profile"
                            onClick={() => setToggleDropwdown((prev) => !prev)}
                        />
                    </Link>

                    {toggleDropdown && (
                        <div className="dropdown">
                            <Link
                                href="/profile"
                                className="dropdown_link"
                                onClick={() => setToggleDropwdown(false )}
                            >
                                My Profile
                            </Link>
                            <Link
                                href="/create-prompt"
                                className="dropdown_link"
                                onClick={() => setToggleDropwdown(false )}
                            >
                                Create Prompt
                            </Link>
                            <button
                                type="button"
                                onClick={() => {
                                    setToggleDropwdown(false);
                                    signOut();
                                }}
                                className="mt-5 w-full black_btn"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    {providers && 
                        Object.values(providers).map((provider: any) => (
                            <button 
                                type="button"
                                key={provider.name}
                                onClick={() => signIn(provider.id)}
                                className="black_btn"
                            >
                                Sign In
                            </button>
                    ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav