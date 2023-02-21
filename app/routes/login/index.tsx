import React from "react";
import { LoginPage } from "~/components/login/LoginPage";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { db } from "~/utils/db.server";
import {
  commitToken,
  destroyToken,
  generateToken,
  getToken,
} from "~/utils/token.server";

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const userField = form.get("email");
  try {
    if (!userField || typeof userField !== "string") {
      throw new Error(`Form not submitted correctly.`);
    }

    const user = await db.user.findFirst({
      where: {
        OR: [
          {
            email: userField,
          },
        ],
      },
    });

    if (!user) {
      return json({
        code: 404,
        error: true,
      });
    }

    const token = await db.emailToken.create({
      data: {
        token: generateToken(),
        userId: user.id,
      },
    });
    console.log(token);
  } catch (error) {
    console.error(error);

    return json(
      {
        error: true,
      },
      {
        status: 500,
      }
    );
  }

  return json({
    error: false,
  });
};

const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000; // 24 hour

export const loader = async ({ request, params }: LoaderArgs) => {
  const url = new URL(request.url);
  const searchParamsToken = url.searchParams.get("token");
  const token = await getToken(request.headers.get("Cookie"));

  // If token existing, try revalidate it
  if (token) {
    try {
      const emailToken = await db.emailToken.findFirst({
        where: {
          token,
          active: true,
        },
      });

      if (!emailToken) {
        // Destroy invalid token
        return json(
          {
            error: "Error, try refresh page",
          },
          {
            headers: {
              "Set-Cookie": await destroyToken(),
            },
            status: 401,
          }
        );
      }

      return redirect("/");
    } catch (error) {
      console.error(error);

      return json(
        {
          error: "Ops... Something went wrong, try again in several minutes",
        },
        {
          status: 500,
        }
      );
    }
  } else if (searchParamsToken) {
    try {
      const emailToken = await db.emailToken.findFirst({
        where: {
          token: searchParamsToken,
          active: true,
        },
      });

      if (!emailToken) {
        return json(
          {
            error: "Error, try again send email link",
          },
          {
            status: 401,
          }
        );
      }

      if (Date.now() - TOKEN_EXPIRATION > emailToken.createdAt.getTime()) {
        return json(
          {
            error:
              "Your login by email link was requested over 24 hours ago and has expired! Please request a new login link.",
          },
          {
            status: 401,
          }
        );
      }

      return redirect("/", {
        headers: {
          "Set-Cookie": await commitToken(emailToken.token),
        },
      });
    } catch (error) {
      console.error(error);

      return json(
        {
          error: "Ops... Something went wrong, try again in several minutes",
        },
        {
          status: 500,
        }
      );
    }
  }

  return null;
};

export default function Index() {
  return <LoginPage />;
}
