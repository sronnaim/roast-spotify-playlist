import {
  useCallback,
  useEffect,
  useState,
  type ChangeEventHandler,
  type Dispatch,
  type FormEventHandler,
  type SetStateAction,
} from "react";
import {
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  TextField,
} from "react-aria-components";
import { useFetcher } from "react-router";
import { Button } from "~/components/button";
import history from "~/libs/history";
import type { ActionData, LatestRequest } from "~/types/dtos";
import type { Roast } from "~/types/roasts";

export function InputForm({
  setRoasts,
  latestRequest,
  setLatestRequest,
}: {
  setRoasts: Dispatch<SetStateAction<Roast[]>>;
  latestRequest: LatestRequest | null;
  setLatestRequest: Dispatch<SetStateAction<LatestRequest | null>>;
}) {
  const [lang, setLang] = useState<"ID" | "EN">("ID");
  const [playlistIdInput, setPlaylistIdInput] = useState<string>("");
  const fetcher = useFetcher();

  const handleLangSelect = useCallback(
    (key: string | number) => {
      if ((key === "ID" || key === "EN") && key !== lang) setLang(key);
    },
    [lang, setLang],
  );

  const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
    async (event) => {
      event.preventDefault();
      const playlistId = playlistIdInput;
      fetcher.submit(event.currentTarget);
      setPlaylistIdInput("");

      setLatestRequest({
        playlistId: playlistId,
        content: "Generating ...",
        status: "pending",
        createdAt: new Date().toISOString(),
      });
    },
    [fetcher.submit, playlistIdInput, setPlaylistIdInput, setLatestRequest],
  );

  // Listens to fetcher data
  useEffect(() => {
    const updateRoastsWithResponse = async () => {
      const actionData = fetcher.data as
        | ActionData<{ roast: Roast }>
        | undefined;
      const prev = await history.get();

      if (actionData && actionData.data && actionData.status !== "error") {
        prev.push(actionData.data.roast);
        await history.set(prev);
        // Spread operator to trigger array update
        setRoasts([...prev]);
        setLatestRequest(null);
      } else if (latestRequest && actionData && actionData.status === "error") {
        setLatestRequest({
          ...latestRequest,
          status: "error",
          content: actionData.message,
        });
      }
    };

    if (fetcher.data) {
      updateRoastsWithResponse();
    }
  }, [fetcher.data, setRoasts, setLatestRequest]);

  const handlePlaylistIdInputChange = useCallback<
    ChangeEventHandler<HTMLInputElement>
  >(
    (event) => {
      setPlaylistIdInput(event.currentTarget.value);
    },
    [setPlaylistIdInput],
  );

  return (
    <fetcher.Form
      className="m-auto z-50 flex gap-13 sticky bg-background bottom-0 max-w-[795px] pt-4 pb-15 w-full px-16"
      action="/roasts"
      method="post"
      onSubmit={handleSubmit}
    >
      <Select
        aria-label="Response language"
        name="language"
        defaultSelectedKey={"ID"}
        onSelectionChange={handleLangSelect}
        selectedKey={lang}
      >
        <Button
          className="bg-fillssecondary text-labelssecondary h-34 w-34 p-0"
          style="grey"
        >
          {lang}
        </Button>
        <Popover
          className="bg-background text-foreground rounded-lg dark transition-transform ease-out data-entering:scale-y-0 data-exiting:scale-y-0 origin-bottom duration-200"
          offset={0}
          crossOffset={-16}
        >
          <ListBox>
            {languages.map((l, i) => {
              return (
                <ListBoxItem
                  key={i}
                  id={l.id}
                  textValue={l.text}
                  className="h-max px-16 py-20 flex items-center gap-20 text-title2"
                >
                  <span className="flex items-center justify-center h-34 w-34 bg-conic-180 from-emerald-400 via-emerald-200 to-emerald-400 text-body rounded-full aspect-square">
                    {l.flag}
                  </span>
                  {` ${l.text}`}
                </ListBoxItem>
              );
            })}
          </ListBox>
        </Popover>
      </Select>
      <TextField aria-label="Playlist ID or URL input" className="grow">
        <Input
          required
          onChange={handlePlaylistIdInputChange}
          value={playlistIdInput}
          name="playlistId"
          placeholder="Enter ID or URL"
          className="text-body text-labelstertiary border px-16 caret-primary border-separatoropaque rounded-full w-full pl-12 pr-10 pt-7 pb-6 data-focused:outline-none"
        />
      </TextField>
    </fetcher.Form>
  );
}

const languages = [
  {
    id: "ID",
    flag: "🇮🇩",
    text: "Indonesian",
  },
  {
    id: "EN",
    flag: "🇺🇲",
    text: "English",
  },
];
