import { Box, Container, Heading } from "@chakra-ui/react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Hero } from "~/components/landing/hero/Hero";
import { Navbar } from "~/components/landing/navbar/Navbar";
import { db } from "~/utils/db.server";

export const loader = async () => {
  return json({
    // users: await db.user.findMany(),
  });
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <>
      <Navbar />
      <Hero />
      <Container maxW="container.lg">
        {/* <Box m="4">
          <Heading>Users</Heading>
          {data.users.map((user) => (
            <Box key={user.id}>
              {user.name}, {user.email}
            </Box>
          ))}
        </Box> */}
      </Container>
    </>
  );
}
