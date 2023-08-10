import React, { useState } from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react/hooks";
import {
  Box,
  Text,
  Flex,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  List,
  ListItem,
  Spinner,
  SimpleGrid,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import { FaSearch, FaBars } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

import client from "../api/api";
import CountryCard from "./card";
import { Country } from "./card";
import AnimatedCountryCard from "./animatedCard";

const countryListQuery = gql`
  query {
    countries {
      code
      name
      emoji
      capital
      currency
      continent {
        name
      }
      languages {
        name
      }
    }
  }
`;

const LoadingAnimation = () => (
  <Box
    position="fixed"
    top="0"
    left="0"
    width="100vw"
    height="100vh"
    display="flex"
    justifyContent="center"
    alignItems="center"
    backgroundColor="gray.900"
    zIndex="1000"
  >
    <Box textAlign="center">
      <Spinner size="xl" color="white" />
      <Text color="white" mt={2} fontWeight="bold" fontSize="large">
        Loading...
      </Text>
    </Box>
  </Box>
);

function capitalizeWords(str: string) {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
}

function CountryList() {
  const { loading, error, data } = useQuery(countryListQuery, { client });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("all");

  const handleFilterClick = (continent: string) => {
    setSelectedContinent(continent);
    setSearchTerm("");
  };

  if (loading) return <LoadingAnimation />;
  if (error) return <Text>Error: {error.message}</Text>;

  const countries = data.countries;
  const filteredCountries: Country[] = countries.filter((country: Country) => {
    const searchTermMatch =
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.continent.name.toLowerCase().includes(searchTerm.toLowerCase());
    const continentMatch =
      selectedContinent === "all" ||
      country.continent.name.toLowerCase() === selectedContinent.toLowerCase();
    return searchTermMatch && continentMatch;
  });

  return (
    <Box backgroundColor="gray.900" minHeight="100vh" p={4}>
      <Flex alignItems="center" justifyContent="space-between">
        <Box
          display="flex"
          alignItems="center"
          border="1px"
          borderColor="white"
          borderRadius="md"
          justifyContent="center"
          p={1}
          marginBottom="20px"
          width={{ base: "40vw", lg: "20vw" }}
          height="5vh"
        >
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            colorScheme="white"
          />
          <Input
            placeholder="Search Country"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            color="white"
            border="0px"
            _focus={{
              border: "0px",
              boxShadow: "none",
            }}
          />
        </Box>
        <Flex alignItems="center" marginBottom="10px">
          {selectedContinent !== "" && (
            <Box
              backgroundColor="teal.500"
              color="white"
              padding={1}
              borderRadius="md"
              marginRight={1}
              width={{ base: "30vw", lg: "10vw" }}
              onClick={() => handleFilterClick("all")}
            >
              Filtering by {capitalizeWords(selectedContinent)}
            </Box>
          )}
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Menu"
              icon={<FaBars />}
              colorScheme="white"
            />
            <MenuList>
              <MenuItem onClick={() => setSelectedContinent("all")}>
                All Continents
              </MenuItem>
              <MenuItem onClick={() => setSelectedContinent("africa")}>
                Africa
              </MenuItem>
              <MenuItem onClick={() => setSelectedContinent("asia")}>
                Asia
              </MenuItem>
              <MenuItem onClick={() => setSelectedContinent("europe")}>
                Europe
              </MenuItem>
              <MenuItem onClick={() => setSelectedContinent("north america")}>
                North America
              </MenuItem>
              <MenuItem onClick={() => setSelectedContinent("oceania")}>
                Oceania
              </MenuItem>
              <MenuItem onClick={() => setSelectedContinent("south america")}>
                South America
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={4}>
        {filteredCountries.map((country, index) => (
          <AnimatedCountryCard
            key={country.code}
            country={country}
            index={index}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default CountryList;
