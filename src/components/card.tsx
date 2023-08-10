import React, { useState, useEffect } from "react";
import { Box, Text, CSSObject, Image } from "@chakra-ui/react";

const fetchEmojiByCountryCode = async (
  countryCode: string
): Promise<string> => {
  const emojiImageUrl = `https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/${countryCode}.svg`;
  return emojiImageUrl;
};

const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + " ...";
  }
  return text;
};

const hoverStyle: CSSObject = {
  transform: "scale(1.05)",
  transition: "transform 0.3s",
  position: "relative", 
  zIndex: 1, 
  "::after": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%)",
    opacity: 0,
    transition: "opacity 0.3s",
    zIndex: -1, 
  },
  _hover: {
    "::after": {
      opacity: 1,
    },
  },
};

export interface Country {
  code: string;
  name: string;
  capital?: string;
  currency?: string;
  continent: {
    name: string;
  };
  languages: {
    name: string;
  }[];
}

interface CardProps {
  country: Country;
}

const CountryCard: React.FC<CardProps> = ({ country }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [emojiImage, setEmojiImage] = useState<string | null>(null);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const fetchEmojiImage = async () => {
      try {
        const emojiImageUrl = await fetchEmojiByCountryCode(country.code);
        setEmojiImage(emojiImageUrl);
      } catch (error) {
        console.error("Error fetching emoji image:", error);
      }
    };

    fetchEmojiImage();
  }, [country.code]);

  return (
    <Box
      onClick={toggleExpansion}
      p={4}
      borderRadius="10px"
      boxShadow={isExpanded ? "lg" : "md"}
      transition="box-shadow 0.3s ease"
      width={{ base: "44vw", sm: "30vw", md: "22vw", lg: "18vw" }}
      height={{ base: "25vh", sm: "30vh", md: "35vh", lg: "40vh" }}
      border="2px"
      display="flex"
      flexDirection="column"
      textColor="white"
      backgroundColor={isExpanded ? "teal.400" : "gray.700"}
      cursor="pointer"
      _hover={hoverStyle}
    >
      {!isExpanded && emojiImage && (
        <>
          <Image
            src={emojiImage}
            alt={country.name + " Flag"}
            style={{ width: "80vw", height: "80vh" }}
            draggable='false'
            loading="lazy"
          />
          <Text textAlign="center" fontWeight="bold" fontSize="medium">
            {country.name}
          </Text>
        </>
      )}{" "}
      {isExpanded && emojiImage && (
        <>
          <Image
            src={emojiImage}
            alt={country.name + " Flag"}
            style={{ width: "20vw", height: "20vh", display: "block", margin: "0 auto" }}
            draggable='false'
            loading="lazy"
          />
          <Text textAlign="center" fontWeight="bold" fontSize={{base: "sm", md: "md", lg: "lg"}} mb={{base:2, lg:4}}>
            {country.name}
          </Text>
          <Text fontWeight="medium" fontSize={{ base: "12px", md: "14px", lg: "17px" }}>Capital City : {country.capital}</Text>
          <Text fontWeight="medium" fontSize={{ base: "12px", md: "14px", lg: "17px" }}>Currency : {country.currency}</Text>
          <Text fontWeight="medium" fontSize={{ base: "12px", md: "14px", lg: "17px" }}>
            Language :{" "}
            {truncateText(
              country.languages.map((language) => language.name).join(", "),
              2 
            )}
          </Text>
          <Text fontWeight="medium" fontSize={{ base: "12px", md: "14px", lg: "17px" }}>Continent : {country.continent.name}</Text>
        </>
      )}
    </Box>
  );
};

export default CountryCard;
