import { ZodError } from "zod";
import type { Route } from "./+types/roasts.server";
import { LanguageInput, PlaylistIdInput, type ActionData } from "~/types/dtos";
import { data } from "react-router";
import roasts from "~/libs/roasts.server";
import { AxiosError } from "axios";
import type { Roast } from "~/types/roasts";
import { z } from "zod";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const idInput = formData.get("playlistId");
  const langInput = formData.get("language");

  const returnData: ActionData<{ roast: Roast }> = {
    message: "",
    status: "ok",
    data: null,
  };

  try {
    let playlistId = "";
    const playlistInput = await PlaylistIdInput.parseAsync(idInput);
    if (z.string().url().safeParse(playlistInput).success) {
      const pathParts = new URL(playlistInput).pathname.split("/");
      playlistId = pathParts[2];
    } else playlistId = playlistInput;

    const language = await LanguageInput.safeParseAsync(langInput);

    const roast = await roasts.create(
      playlistId,
      language.error ? "EN" : language.data,
    );

    returnData.message = "Roast generated successfully";
    returnData.status = "ok";
    returnData.data = {
      roast,
    };
    return data(returnData);
  } catch (err) {
    returnData.status = "error";

    if (err instanceof ZodError) {
      returnData.message = err.issues[0].message;
      return data(returnData, { status: 400, statusText: err.message });
    }

    if (err instanceof AxiosError) {
      if (err.status === 404) {
        returnData.message = "Playlist not found";
        return data(returnData, {
          status: 404,
          statusText: "Playlist not found",
        });
      }

      returnData.message = err.message;
      return data(returnData, { status: err.status, statusText: err.message });
    }

    returnData.message = "Unexpected error";
    return data(returnData, { status: 500, statusText: "Unexpected error" });
  }
}
