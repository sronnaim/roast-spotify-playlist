import { useEffect, useRef } from "react";
import { MessageBubble } from "~/components/message-bubble";
import type { LatestRequest } from "~/types/dtos";
import type { Roast } from "~/types/roasts";

export function RoastList({
  roasts,
  latestRequest,
}: {
  roasts: Roast[];
  latestRequest: LatestRequest | null;
}) {
  const scrollElementRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (scrollElementRef.current) {
      scrollElementRef.current.scrollIntoView();
    }
  }, [roasts, latestRequest]);

  return (
    <ul className="grow w-full max-w-[795px] px-16">
      {roasts.map((r, i) => {
        return (
          <li
            key={i}
            ref={
              i === roasts.length - 1 && !latestRequest
                ? scrollElementRef
                : undefined
            }
          >
            <div id="roast-container">
              <MessageBubble className="ml-auto max-w-4/5 my-10 w-fit">
                {r.playlistId}
              </MessageBubble>
              <MessageBubble
                from="them"
                className="mr-auto max-w-4/5 my-10 w-fit"
              >
                {r.content}
              </MessageBubble>
            </div>
          </li>
        );
      })}
      {latestRequest && (
        <li ref={scrollElementRef}>
          <div id="roast-container">
            <MessageBubble className="ml-auto max-w-4/5 my-10 w-fit">
              {latestRequest.playlistId}
            </MessageBubble>
            <MessageBubble
              from="them"
              className="mr-auto max-w-4/5 my-10 w-fit"
            >
              {latestRequest.content}
            </MessageBubble>
          </div>
        </li>
      )}
    </ul>
  );
}
