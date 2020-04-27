import React from 'react'
import {
  Flex,
  Box,
  Link,
  Button,
} from 'rebass'


const Burger = ({ size = 24 }) => (
  <Box
    as='svg'
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill="currentcolor"
    viewBox="0 0 24 24"
    sx={{
      display: 'block',
      margin: 0,
    }}>
    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
  </Box>
)

export default ({
  nav,
  menu,
  setMenu,
  fullwidth,
}) => {
  return (
    <Flex
      as='header'
      px={3}
      py={2}
      height={64}
      alignItems='center'>
      {!fullwidth && (
        <Button
          title='Toggle Menu'
          display={[ 'block', 'none' ]}
          sx={{
            background: 'white',
            color: 'black',
            width: 32,
            height: 32,
            p: 1,
          }}
          variant='transparent'
          onClick={e => {
            setMenu(!menu)
            if (menu || !nav.current) return
            const navlink = nav.current.querySelector('a')
            navlink.focus()
          }}>
          <Burger />
        </Button>
      )}
      <Link variant='nav' href='/'>React-sim</Link>
      <Box mx='auto' />
      <Link
        mr={2}
        variant='nav'
        href='https://github.com/jckr/react-sim'>
        GitHub
      </Link>

    </Flex>
  )
}
