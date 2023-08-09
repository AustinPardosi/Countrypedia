import React from 'react';
import { Box, Flex, Center, IconButton, Spacer } from '@chakra-ui/react';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  return (
    <Center>
      <Flex
        p={4}
        boxShadow="base"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        backgroundColor="gray.800"
      >
        <Box>
          <Box fontSize="xl" fontWeight="bold" color="white">
            CountryPedia
          </Box>
        </Box>
      </Flex>
    </Center>
  );
};

export default Navbar;
