import { Box, Button, Heading, Input } from "@chakra-ui/react";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  console.log("loader");
  return json({
    users: await db.user.findMany(),
  });
};

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();
  const userName = form.get("name");
  const email = form.get("email");

  if (
    !userName ||
    !email ||
    typeof userName !== "string" ||
    typeof email !== "string"
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const user = await db.user.create({
    data: {
      email,
      name: userName,
    },
  });
  return json({
    ok: 200,
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <Box m="4">
      <Heading>Users</Heading>
      <Box width="300px">
        <form method="post">
          <div>
            <label>
              Name: <Input type="text" name="name" />
            </label>
          </div>
          <div>
            <label>
              Email: <Input type="text" name="email" />
            </label>
          </div>
          <div>
            <Button type="submit" className="button">
              Add
            </Button>
          </div>
        </form>
      </Box>

      {data.users.map((user) => (
        <Box key={user.id}>{user.name}</Box>
      ))}
    </Box>
  );
}
