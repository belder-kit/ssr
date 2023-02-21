import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import invariant from "invariant";
import { destroyToken, getToken } from "~/utils/token.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const token = await getToken(request.headers.get("Cookie"));

  try {
    invariant(token, `Not valid token: ${token?.toString()}`);

    await db.emailToken.update({
      where: {
        token,
      },
      data: {
        active: false,
      },
    });
  } catch (err) {
    console.error(err);
  }

  return redirect("/login", {
    headers: {
      "Set-Cookie": await destroyToken(),
    },
  });
};
