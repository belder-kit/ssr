import { Box, useColorModeValue } from "@chakra-ui/react";
import React from "react";

type Props = {
  onClick: () => void;
};

export const Menu = ({ onClick }: Props) => {
  const fill = useColorModeValue(
    "var(--chakra-colors-gray-800)",
    "var(--chakra-colors-whiteAlpha-900)"
  );

  return (
    <Box onClick={onClick} role="button" tabIndex={0}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_125_315)">
          <path
            d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z"
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id="clip0_125_315">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};
