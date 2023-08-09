import React, { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";

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
      width="18vw"
      height="40vh"
      border="2px"
      display="flex"
      flexDirection="column"
      textColor="white"
      backgroundColor={isExpanded ? "teal.400" : "gray.700"}
      cursor="pointer"
    >
      {!isExpanded && emojiImage && (
        <>
          <img
            src={emojiImage}
            alt={country.name + " Flag"}
            style={{ width: "80vw", height: "80vh" }}
          />
          <Text textAlign="center" fontWeight="bold" fontSize="medium">
            {country.name}
          </Text>
        </>
      )}{" "}
      {isExpanded && emojiImage && (
        <>
          <img
            src={emojiImage}
            alt={country.name + " Flag"}
            style={{ width: "18vw", height: "18vh" }}
          />
          <Text textAlign="center" fontWeight="bold" fontSize="large">
            {country.name}
          </Text>
          <Text>Capital City : {country.capital}</Text>
          <Text>Currency : {country.currency}</Text>
          <Text>
            Language:{" "}
            {truncateText(
              country.languages.map((language) => language.name).join(", "),
              2 // Maximum number of words before truncation
            )}
          </Text>
          <Text>Continent : {country.continent.name}</Text>
        </>
      )}
    </Box>
  );
};

export default CountryCard;
