"use client";
import {
  createFile,
  createUser,
  getUserByUsername,
  getFileByOwner,
  getProjectByOwner,
} from "./action";

export default function Home() {
  const onCreate = async () => {
    /* const file = {
      filename: "file1",
      url: "/home/user/file1",
      owner: 1,
      type: "pdf",
      id_project: "1",
    };
    const user = {
      username: "papu",
      password: "asdas",
      email: "appud@gmail,com",
    }; */
    const res = await getProjectByOwner(1);
    console.log(res);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button onClick={() => onCreate()}>Create File</button>
    </main>
  );
}
