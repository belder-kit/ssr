import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "@remix-run/react";
import React from "react";

export const Navbar = () => {
  return (
    <Flex justifyContent="space-between" my="4" alignItems="center">
      <Flex>
        <Box mx="3">
          <Link
            _hover={{
              textDecor: "none",
            }}
            as={RouterLink}
            to="/"
          >
            <Heading as="h2" size="md">
              Project Name
            </Heading>
          </Link>
        </Box>
        <Box mx="3">
          <Link
            _hover={{
              textDecor: "none",
            }}
            fontWeight="semibold"
            fontSize="md"
          >
            Home
          </Link>
        </Box>
        <Box mx="3">
          <Link
            _hover={{
              textDecor: "none",
            }}
            fontWeight="semibold"
            fontSize="md"
          >
            Pricing
          </Link>
        </Box>
        <Box mx="3">
          <Link
            _hover={{
              textDecor: "none",
            }}
            fontWeight="semibold"
            fontSize="md"
          >
            Solution
          </Link>
        </Box>
        <Box mx="3">
          <Link
            _hover={{
              textDecor: "none",
            }}
            fontWeight="semibold"
            fontSize="md"
          >
            FAQ
          </Link>
        </Box>
      </Flex>
      <Box>
        <Button colorScheme="primary">Call to Action</Button>
      </Box>
    </Flex>
  );
};
