import { Link } from "react-aria-components";

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
        <ul className="flex m-auto px-16 justify-end items-center max-w-[795px] h-min">
          <li>
            <Link
              href="https://github.com/sronnaim/roast-playlist"
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
