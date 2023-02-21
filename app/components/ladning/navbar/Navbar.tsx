import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
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
            as={RouterLink}
            to="/"
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
            as={RouterLink}
            to="/"
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
            as={RouterLink}
            to="/"
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
            as={RouterLink}
            to="/"
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
