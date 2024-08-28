import { useContext, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Skeleton,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import type { AxiosError } from "axios";

import { UserContext } from "../context/User";
import { Navbar } from "../components/Navbar";
import { axiosInstance } from "../libs/axios";

interface User {
  id: string;
  name: string;
  email: string;
  address: {
    city: string;
  };
}

function Home() {
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getProvinces() {
      try {
        const response = await axiosInstance.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );

        setUsers(
          response.data.map((user) => {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              address: user.address,
            };
          })
        );
      } catch (err) {
        const error = err as AxiosError;
        if (error.response === undefined && error.request === undefined) {
          console.error(
            new Error(
              "Error when get users. The error is caused by Axios Error."
            )
          );

          toast({
            title: "Request Failed",
            description: "Something is wrong with Axios.",
            status: "error",
            position: "top-right",
          });
        } else if (error.response === undefined) {
          console.error(
            new Error(
              "Error when get users. The error is caused by Network Error."
            )
          );

          toast({
            title: "Request Failed",
            description: "Something is wrong with the Network.",
            status: "error",
            position: "top-right",
          });
        } else {
          if (error.response.status >= 500) {
            console.error(
              new Error(
                "Error when get users. The error is caused by Server Error.",
                { cause: error.response.data }
              )
            );

            toast({
              title: "Request Failed",
              description: "Something is wrong with the Server.",
              status: "error",
              position: "top-right",
            });
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    getProvinces();
  }, [toast]);

  return (
    <>
      <Navbar />

      <Box
        paddingX={{ base: "32px", lg: "64px" }}
        as="main"
        maxWidth="1280px"
        marginX="auto"
        marginTop="32px"
      >
        <Heading>Welcome, {user?.name}</Heading>
        <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Text>

        <TableContainer
          marginTop="32px"
          paddingX="24px"
          paddingY="16px"
          borderWidth="2px"
          borderRadius="8px"
        >
          <Table
            colorScheme={
              isLoading === false && users.length === 0 ? "red" : "gray"
            }
            variant="striped"
          >
            <TableCaption>Fake Users of {`{JSON}`} Placeholder</TableCaption>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>City</Th>
              </Tr>
            </Thead>

            {isLoading === false && users.length === 0 ? (
              <Tbody>
                <Tr>
                  <Td>Error Occured</Td>
                  <Td>Error Occured</Td>
                  <Td>Error Occured</Td>
                  <Td>Error Occured</Td>
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  users.map((province) => {
                    return (
                      <Tr key={province.id}>
                        <Td>{province.id}</Td>
                        <Td>{province.name}</Td>
                        <Td>{province.email}</Td>
                        <Td>{province.address.city}</Td>
                      </Tr>
                    );
                  })
                )}
              </Tbody>
            )}

            <Tfoot>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>City</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

function TableSkeleton() {
  return (
    <>
      <Tr>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
      </Tr>

      <Tr>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
      </Tr>

      <Tr>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
        <Td backgroundColor="transparent" padding="0px">
          <Skeleton width="100%" height="40px"></Skeleton>
        </Td>
      </Tr>
    </>
  );
}

export default Home;
