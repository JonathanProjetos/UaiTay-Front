"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionClientProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
