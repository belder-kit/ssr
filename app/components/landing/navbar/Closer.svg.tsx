import { Box, useColorModeValue } from "@chakra-ui/react";

type Props = {
  onClick: () => void;
};

export const Closer = ({ onClick }: Props) => {
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
        <g clipPath="url(#clip0_125_510)">
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            fill={fill}
          />
        </g>
        <defs>
          <clipPath id="clip0_125_510">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};
