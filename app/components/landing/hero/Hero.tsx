import {
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import product from "./images/product.png";

const CoolGradient = styled.span`
  background: linear-gradient(220deg, #e53e3e 0%, #805ad5 75.52%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`;

export const Hero = () => {
  const buttonTheme = useColorModeValue(
    {
      colorScheme: "primary",
    },
    {
      bg: "white",
      color: "blackAlpha.800",
    }
  );

  return (
    <Container maxW="container.lg" my="32">
      <Heading textAlign="center" mb="12" fontSize="6xl" fontWeight="semibold">
        <CoolGradient>Solve</CoolGradient> your problem
      </Heading>
      <Text textAlign="center" fontSize="xl" mb="12">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil
        molestiae omnis ipsam nulla
        <br />
        similique quasi sunt iure facere commodi reiciendis necessitatibus
        vitae, doloribus
      </Text>
      <Flex justifyContent="center" mb="32">
        <Input
          placeholder="Enter your email"
          w="300px"
          mr="2"
          variant="filled"
        />
        <Button {...buttonTheme}>Subscribe</Button>
      </Flex>
      <Flex justifyContent="center">
        <Image src={product} />
      </Flex>
    </Container>
  );
};
