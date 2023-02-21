import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Input,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import React from "react";
import { useForm } from "react-hook-form";
import { action } from "~/routes/login";

type FormFields = {
  email: string;
};

export const LoginBox = () => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const result = useActionData<typeof action>();
  const { register, watch, handleSubmit, formState, reset } =
    useForm<FormFields>();
  const emailValue = watch("email");
  const onSubmit = useSubmit();

  return (
    <Flex flexDir="column">
      <Flex bg={bg} rounded="2xl" flexDir="column">
        <Flex
          justifyContent="center"
          p="4"
          borderBottom="1px"
          borderBottomColor={borderColor}
        >
          <Text fontSize="md" fontWeight="bold">
            Log in or sign up
          </Text>
        </Flex>
        <Flex flexDir="column" p="8">
          <Text fontSize="xl" fontWeight="bold" mb="4">
            Welcome to BelderKit
          </Text>
          <Box w="300px">
            <Form
              method="post"
              onSubmit={(e) => {
                handleSubmit((data) => {
                  reset({
                    email: data.email,
                  });
                  onSubmit(data, {
                    method: "post",
                  });
                })(e);
              }}
            >
              <Input
                placeholder="Email, username or login link"
                mb="3"
                defaultValue=""
                {...register("email")}
                autoFocus
              />
              {result?.error && !formState.isDirty && (
                <Alert status="error" rounded="md" mb="3">
                  <AlertIcon />
                  {result.code === 404
                    ? "Email or user not found"
                    : "Oops.. Something went wrong"}
                </Alert>
              )}
              <Button
                type="submit"
                w="100%"
                colorScheme="primary"
                disabled={!emailValue?.length}
              >
                {result?.code === 200 ? "Resend" : "Continue"}
              </Button>
            </Form>
          </Box>
        </Flex>
      </Flex>
      {result?.code === 200 && (
        <Flex bg={bg} rounded="2xl" p="4" alignItems="center" mt="4">
          <CheckCircleIcon color="green.400" mr="2" />
          <Text>You will receive a link to log in by email</Text>
        </Flex>
      )}
    </Flex>
  );
};
