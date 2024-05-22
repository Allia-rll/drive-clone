'use client';
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>{session?.user.username}</h3>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
