import { Box, Flex, useColorModeValue, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import bgImageLight from "./images/bg-light.png";
import bgImageDark from "./images/bg-dark.png";
import { LoginBox } from "./LoginBox";
import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes/login";

export const LoginPage = () => {
  const bgImage = useColorModeValue(bgImageLight, bgImageDark);
  const toast = useToast({
    position: "bottom-right",
  });
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    if (!data) {
      return;
    }

    toast({
      status: "error",
      duration: null,
      isClosable: true,
      description: JSON.stringify(data, null, 2),
    });
  }, []);

  return (
    <Flex
      bgImg={bgImage}
      bgSize="cover"
      bgPos="center"
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <LoginBox />
      </Box>
    </Flex>
  );
};
