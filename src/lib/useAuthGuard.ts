"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";

/** Returns:
 * - `undefined` while Firebase is resolving the auth state (loading)
 * - `null`      when confirmed signed out (redirecting to /signin)
 * - `User`      when confirmed signed in
 */
export function useAuthGuard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(u);
      } else {
        setUser(null);
        router.replace("/signin");
      }
    });
  }, [router]);

  return user;
}
