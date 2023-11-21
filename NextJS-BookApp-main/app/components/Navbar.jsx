'use client'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/api";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLogin, setIsLogin] = useState(false);
  const toast = useToast();
  const navigate = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = window.localStorage.getItem("token");
      if (token) {
        setIsLogin(true);
      }
    }
  }, []);

  return (
    <Flex
      w="full"
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="transparent"
      color="white"
    >
      <Link href="/">
        <Flex align="center" mr={5} cursor="pointer">
          <Text fontSize="xl" fontWeight="bold">
            My Website
          </Text>
        </Flex>
      </Link>
      <HStack>
        {isLogin && (
          <Link href="/newbook">
            <Button colorScheme="blackAlpha">Create New Book</Button>
          </Link>
        )}
        {!isLogin ? (
          <Button onClick={onOpen} colorScheme="blue">
            Login
          </Button>
        ) : (
          <Button
            colorScheme="blue"
            onClick={() => {
              window.localStorage.removeItem("token");
              setIsLogin(false);
              navigate.push("/")
            }}
          >
            Logout
          </Button>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form
          id="login-form"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const token = await loginUser(
                e.target.email.value,
                e.target.password.value
              );
              window.localStorage.setItem("token", token.token);
              navigate.push("/");
              onClose();
            } catch (err) {
              toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          <ModalOverlay />
      <Box>
      <ModalContent mt={100}>
        <ModalHeader>Login</ModalHeader>
          <ModalCloseButton mr={700} ml={700} />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" form="login-form" colorScheme="blue" mr={3}>
              Login
            </Button>
            <Link href="/register" onClick={onClose}>
              <Button variant="ghost">
                Doesn't Have Account? Click here
              </Button>
            </Link>
          </ModalFooter>
        </ModalContent>
      </Box>
        </form>
      </Modal>
    </Flex>
  );
};

export default Navbar;
