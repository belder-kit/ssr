import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@remix-run/react";

type Props = {
  links: {
    title: string;
    to: string;
  }[];
  onClickAction: () => void;
  projectName: string;
};

export const DesktopLayout = ({ links, onClickAction, projectName }: Props) => {
  const bgColor = useColorModeValue("#fffffff9", "#1A202Cf9");

  return (
    <Box position="fixed" top="0" left="0" width="full" bg={bgColor}>
      <Container maxW="container.lg">
        <Flex
          justifyContent="space-between"
          my="4"
          alignItems="center"
          display={["none", "none", "flex"]}
        >
          <Box mx="3">
            <Heading as="h2" size="md">
              <Link
                _hover={{
                  textDecor: "none",
                }}
                as={RouterLink}
                to="/"
              >
                {projectName}
              </Link>
            </Heading>
          </Box>
          <Flex>
            {links.map(({ title, to }) => (
              <Box mx="3" key={title}>
                <Link
                  _hover={{
                    textDecor: "none",
                  }}
                  fontWeight="semibold"
                  fontSize="md"
                  as={RouterLink}
                  to={to}
                >
                  {title}
                </Link>
              </Box>
            ))}
          </Flex>
          <Box>
            <Button colorScheme="primary" onClick={onClickAction}>
              Call to Action
            </Button>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
