import { clientLoader } from "~/routes/home";
import { type Roast } from "~/types/roasts";
import { Header } from "./header";
import { RoastList } from "./roast-list";
import { InputForm } from "./input-form";
import { useLoaderData } from "react-router";
import { memo, useState } from "react";
import type { LatestRequest } from "~/types/dtos";
import { Theme, useTheme } from "remix-themes";
import clsx from "clsx";

export function Welcome() {
  const { roastsList } = useLoaderData<typeof clientLoader>();
  const [theme] = useTheme();
  const isDark = theme === Theme.DARK;

  const [roasts, setRoasts] = useState<Roast[]>(roastsList);
  const [latestRequest, setLatestRequest] = useState<LatestRequest | null>(
    null,
  );
  const HeaderMemoized = memo(Header);

  return (
    <main
      className={clsx(
        "h-[100dvh] flex flex-col overflow-scroll items-center scroll-smooth bg-background text-labelsprimary",
        isDark && "dark",
      )}
    >
      <HeaderMemoized />
      <section className="w-full grow flex flex-col items-center">
        <RoastList roasts={roasts} latestRequest={latestRequest} />
        <InputForm
          setRoasts={setRoasts}
          latestRequest={latestRequest}
          setLatestRequest={setLatestRequest}
        />
      </section>
    </main>
  );
}
