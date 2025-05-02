import { Welcome } from "../welcome/welcome";
import history from "~/libs/history";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Roast Spotify Playlist" },
    { name: "Home page", content: "Welcome to Roast Spotify Playlist!" },
  ];
};

export async function clientLoader() {
  const roastsList = await history.get();
  return {
    roastsList,
  };
}

export default function Home() {
  return <Welcome />;
}
