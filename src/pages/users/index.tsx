import { Box, Button, Flex, Heading, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { Header } from '../../components/Header';
import { Pagination } from '../../components/Pagination';
import { Sidebar } from '../../components/Sidebar';
import { useUsers } from '../../services/hooks/useUsers';

export default function UserList() {
  const { data, isLoading, isFetching, error } = useUsers()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Box>
      <Header />
      <Flex
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px={["4", "4", "6"]}
      >
        <Sidebar />
        <Box flex="1" borderRadius="8" bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">Usuários 
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>
            <Link href="/users/create" passHref>
              <Button as="a" size="sm" fontSize="small" colorScheme="yellow" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                Criar novo
              </Button>
            </Link>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["1", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="yellow" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && (<Th>Data de cadastro</Th>)}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.map(user => (
                    <Tr key={user.id}>
                      <Td px={["1", "4", "6"]} >
                        <Checkbox colorScheme="yellow" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize={["xs", "sm"]} w="22" color="gray.300" textOverflow="ellipsis">{user.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && (<Td>
                        {user.createdAt}
                      </Td>)}
                      <Td>
                        {isWideVersion && (<Button as="a" size="sm" fontSize="small" colorScheme="yellow" leftIcon={<Icon as={RiPencilLine} />}>
                          {isWideVersion ? 'Editar' : ''}
                        </Button>)}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination />
            </>
          )
          }
        </Box>
      </ Flex>
    </Box>
  )
}