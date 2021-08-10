import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { useSideBarDrawer } from '../../contexts/SidebarDrawerContext'
import { Logo } from './Logo'
import { NotificationsNav } from './NotificationsNav'
import { Profile } from './Profile'
import { SearchBox } from './SearchBox'

export function Header() {
  const { onOpen } = useSideBarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1408}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      {! isWideVersion && (
        <IconButton 
          aria-label="Abrir menu de navegação" 
          icon={ <Icon as={RiMenuLine}/>} 
          variant="unstyled" 
          onClick={onOpen} 
          mr="2" 
          fontSize="24"
          />
      )}
      <Logo />
      {isWideVersion && (<SearchBox />)}
      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion}/>
      </Flex>
    </Flex>
  )
}