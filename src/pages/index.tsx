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
import { auth } from "../libs/firebaseApp";
import { axiosInstance } from "../libs/axios";
import { getUserIDToken } from "../utils";
import type { SuccessResponse } from "../types/api";

interface Province {
  id: string;
  name: string;
}

function Home() {
  const toast = useToast();
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getProvinces() {
      // Get ID token
      let idToken = "";
      try {
        idToken = await getUserIDToken();
      } catch (error) {
        console.error(
          new Error("Error when get user ID token: ", { cause: error })
        );
        return;
      }

      // Get provinces
      try {
        const { data: provinceResponse } = await axiosInstance.get<
          SuccessResponse<Province[]>
        >("/api/province", {
          headers: { Authorization: `Bearer ${idToken}` },
        });
        setProvinces(provinceResponse.data);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response === undefined && error.request === undefined) {
          toast({
            title: "Network Request Failed",
            description: "Something is wrong with Axios.",
            status: "error",
            position: "top-right",
          });
        } else if (error.response === undefined) {
          toast({
            title: "Network Request Failed",
            description: "Something is wrong with the Network.",
            status: "error",
            position: "top-right",
          });
        } else {
          if (error.response.status === 401) {
            try {
              await auth.signOut();
            } catch (error) {
              console.error(new Error("Error when logout: ", { cause: error }));
            }
          } else if (error.response.status >= 500) {
            toast({
              title: "Network Request Failed",
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
          maxWidth="768px"
          marginX="auto"
          marginTop="32px"
          paddingX="24px"
          paddingY="16px"
          borderWidth="2px"
          borderRadius="8px"
        >
          <Table
            colorScheme={
              isLoading === false && provinces.length === 0 ? "red" : "gray"
            }
            variant="striped"
          >
            <TableCaption>Provinces of Indonesia</TableCaption>
            <Thead>
              <Tr>
                <Th>Province ID</Th>
                <Th>Province Name</Th>
              </Tr>
            </Thead>

            {isLoading === false && provinces.length === 0 ? (
              <Tbody>
                <Tr>
                  <Td>Error Occured</Td>
                  <Td>Error Occured</Td>
                </Tr>
              </Tbody>
            ) : (
              <Tbody>
                {isLoading ? (
                  <TableSkeleton />
                ) : (
                  provinces.map((province) => {
                    return (
                      <Tr key={province.id}>
                        <Td>{province.id}</Td>
                        <Td>{province.name}</Td>
                      </Tr>
                    );
                  })
                )}
              </Tbody>
            )}

            <Tfoot>
              <Tr>
                <Th>Province ID</Th>
                <Th>Province Name</Th>
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
      </Tr>

      <Tr>
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
      </Tr>
    </>
  );
}

export default Home;
