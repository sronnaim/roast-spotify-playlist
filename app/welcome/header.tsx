import { useState } from "react";
import { Link, Switch } from "react-aria-components";
import { Theme, useTheme } from "remix-themes";

export function Header() {
  return (
    <header className="z-50 sticky inset-0 w-full pt-15 px-16 relative bg-background/15 border-b-[0.2px] border-black/30 pb-15 backdrop-blur-xl dark:bg-[oklch(0.23_0_0)]/90">
      <h1 className="m-auto w-fit flex flex-col items-center justify-center gap-5 text-footnote">
        <figure className="w-50 h-50 rounded-full flex items-center justify-center text-3xl bg-conic-180 from-emerald-400 via-emerald-200 to-emerald-400">
          <img src="/images/telemoji-moai.webp" className="w-40 h-40" />
        </figure>
        <a href="/" aria-label="Home">
          {"Roast Spotify"}
        </a>
      </h1>
      <nav className="absolute left-0 top-15 w-full px-16 py-15">
        <ul className="flex m-auto px-16 justify-between items-center max-w-[795px] h-min">
          <ModeSwitch />
          <li>
            <Link
              href="https://github.com/sronnaim/roast-spotify-playlist"
              className="font-symbols text-[22px] text-primary"
              aria-label="GitHub"
            >
              {"open_in_new"}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function ModeSwitch() {
  const [theme, setTheme] = useTheme();
  const isDark = theme === Theme.DARK;
  const [selected, setSelected] = useState<boolean>(isDark);
  const handleSwitch = () => {
    setSelected(!isDark);
    setTimeout(() => {
      setTheme(isDark ? Theme.LIGHT : Theme.DARK);
    }, 250);
  };

  return (
    <Switch
      className="group flex gap-2 items-center"
      isSelected={selected}
      onChange={handleSwitch}
    >
      <div className="w-51 h-31 rounded-full p-2 bg-fillssecondary group-data-selected:bg-green-500 flex">
        <span className="block h-full transition-all duration-300 ease-in-out w-0 group-data-selected:w-full" />
        <span
          className="h-full aspect-square rounded-full bg-white block"
          style={{
            boxShadow:
              "0px 0px 0px 1px rgba(0, 0, 0, 0.04), 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)",
          }}
        />
      </div>
    </Switch>
  );
}
