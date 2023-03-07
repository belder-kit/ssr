import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { Menu } from "./Menu.svg";
import { useCallback, useEffect, useRef } from "react";
import { Link as RouterLink } from "@remix-run/react";
import { Closer } from "./Closer.svg";

type Props = {
  links: {
    title: string;
    to: string;
  }[];
  onClickAction: () => void;
  projectName: string;
};

export const MobileLayout = ({ links, onClickAction, projectName }: Props) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const borderColor = useColorModeValue("blackAlpha.100", "whiteAlpha.100");
  const plateRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    function handleClickOutside(e: MouseEvent) {
      if (!plateRef.current?.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        window.addEventListener("click", handleClickOutside);
      });
    } else {
      window.removeEventListener("click", handleClickOutside);
    }
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen, handleClickOutside]);

  return (
    <Box ref={plateRef}>
      <Flex
        justifyContent="space-between"
        p="4"
        alignItems="center"
        display={["flex", "flex", "none"]}
        borderBottomWidth={isOpen ? "1px" : "0px"}
        borderBottomStyle="solid"
        borderBottomColor={borderColor}
      >
        <Box>
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
        {isOpen ? <Closer onClick={onToggle} /> : <Menu onClick={onToggle} />}
      </Flex>
      {isOpen && (
        <Box m="4" display={["block", "block", "none"]}>
          {links.map(({ title, to }) => (
            <Box my="6" key={title}>
              <Link
                display="block"
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
          <Box>
            <Button colorScheme="primary" width="100%" onClick={onClickAction}>
              Call to Action
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
