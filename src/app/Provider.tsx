"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

function Provider({ children }: { children: any }): React.JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Provider;
