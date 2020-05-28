import React from 'react'
import {
  Box,
  Link,
} from 'rebass'

export default props =>
  <Box
    as='footer'
    py={5}
    color='background'
    bg='text'
  >
    <Box
      sx={{
        maxWidth: 'wide',
        mx: 'auto',
        px: 3,
      }}>
      <Link to='/' variant='nav'>React-Sim</Link>
      <Link href='https://github.com/jckr/react-sim' variant='nav'>GitHub</Link>
    </Box>
  </Box>
