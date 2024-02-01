import React from "react";
import { Box, Text, Image, Heading } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

interface I_Products {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

const ListElement: React.FC<{ product: I_Products }> = ({ product }) => {
  return (
    <Box
      data-section="list_item"
      display={"flex"}
      gap={"10px"}
      p="10px"
      bg={"#112240"}
      borderRadius={"5px"}
      cursor={"pointer"}
      width={"100%"}
      transition={"all .2s ease-in-out"}
      sx={{
        _hover: {
          transform: "scale(1.05)",
        },
      }}
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={{ base: "35%", sm: "35%", md: "20%", lg: "20%" }}
      />
      <Box data-section="lint-label">
        <Text color={"#ccd6f6"} fontSize={"19px"}>
          {product.title}
        </Text>
        <Text color={"#8892b0"} fontSize={"15px"}>
          {product.description}
        </Text>
      </Box>
    </Box>
  );
};

export const List: React.FC = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const data = await fetch("https://dummyjson.com/products");
      return await data.json();
    },
  });

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
      alignItems={"center"}
      bg={"#0a192f"}
      height={"100%"}
      minH={"100vh"}
      width={"100%"}
    >
      <Heading color={"#ccd6f6"}>Products</Heading>

      {isLoading ? (
        <Text color={"#ccd6f6"}>Loading...</Text>
      ) : error ? (
        <Text color={"red"}>Error occured while loading list</Text>
      ) : (
        <Box
          data-section="list-container"
          display={"flex"}
          flexDir={"column"}
          gap={"15px"}
          w={{ base: "70%", sm: "70%", md: "50%", lg: "50%" }}
          mb={"10px"}
        >
          {data?.products.length > 0 &&
            data.products.map((product: I_Products) => {
              return <ListElement product={product} key={product.id} />;
            })}
        </Box>
      )}
    </Box>
  );
};
