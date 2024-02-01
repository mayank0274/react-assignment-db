import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Image,
  Heading,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
} from "@chakra-ui/react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ProductFilters } from "./Filters";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../../hooks/useDebounce";
import { FaFilter } from "react-icons/fa";

export interface I_Products {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: { rate: number; count: number };
}

const ProductCard: React.FC<{ product: I_Products }> = ({ product }) => {
  return (
    <Card
      direction={{ base: "column", sm: "row" }}
      overflow="hidden"
      variant="outline"
      bg={"#112240"}
      color={"#ccd6f6"}
      minW={"100%"}
    >
      <Image
        objectFit="cover"
        maxW={{ base: "0%", sm: "200px" }}
        src={product.image}
        alt={product.title}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{product.title}</Heading>

          <Text py="2">{product.description}</Text>
        </CardBody>

        <CardFooter>
          <Button variant="solid" colorScheme="blue">
            Buy Now for ${product.price}
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export const ProductsList: React.FC = () => {
  const [searchParams, _setSearchParams] = useSearchParams();
  let category = searchParams.get("category") || "";
  let sort = searchParams.get("sort") || "desc";
  let rating = searchParams.get("rating") || "";
  const [products, setProducts] = useState<I_Products[]>([]);
  const [priceFilter, setPriceFilter] = useState(200);

  const { isLoading, error, data } = useQuery({
    queryKey: [`products-e_comm-${category}-${sort}`],
    queryFn: async () => {
      let url = `https://fakestoreapi.com/products?sort=${sort}`;
      if (category) {
        url = `https://fakestoreapi.com/products/category/${category}?sort=${sort}`;
      }
      const data = await fetch(url);
      return await data.json();
    },
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    setProducts(data);
  }, [data]);

  // ptice filter based on slider value
  const getFilteredProducts = (): void => {
    let arr = data;
    if (arr) {
      let res = arr.filter((elem: I_Products) => {
        return elem.price <= priceFilter;
      });

      setProducts(res);
      console.table(res);
    }
  };

  useEffect(() => {
    const debouncedFn = useDebounce(getFilteredProducts, 1500);

    debouncedFn();
  }, [priceFilter, data]);

  // filter products based on rating
  useEffect(() => {
    let arr = data;
    let res;
    if (rating == "greater_than_4" && arr) {
      res = arr.filter((elem: I_Products) => {
        return elem.rating.rate >= 4;
      });
    }

    if (rating == "greater_than_2" && arr) {
      res = arr.filter((elem: I_Products) => {
        return elem.rating.rate >= 2;
      });
    }

    setProducts(res);
  }, [rating]);

  // modal for filters in mobiles
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      display={"flex"}
      flexDir={{ base: "column", sm: "column", md: "row", lg: "row" }}
      gap={"15px"}
      bg={"#0a192f"}
      height={"100vh"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={{ base: "center", sm: "center", md: "normal", lg: "normal" }}
    >
      <Box
        width={"25%"}
        overflow={"hidden"}
        display={{ base: "none", sm: "none", md: "block", lg: "block" }}
      >
        <ProductFilters
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />
      </Box>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalCloseButton zIndex={999999} bg={"#fff"} onClick={onClose} />
          <ModalContent>
            <ModalOverlay>
              <Box width={"97%"} overflow={"hidden"}>
                <ProductFilters
                  priceFilter={priceFilter}
                  setPriceFilter={setPriceFilter}
                />
              </Box>
            </ModalOverlay>
          </ModalContent>
        </Modal>
      )}

      <Box
        width={"72%"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={"10px"}
        h="100%"
        overflow={"scroll"}
      >
        <Box
          display={"flex"}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Heading color={"#ccd6f6"}>Products</Heading>
          <Box display={{ base: "block", sm: "block", md: "none", lg: "none" }}>
            <FaFilter color="#fff" size={25} onClick={onOpen} />
          </Box>
        </Box>

        {isLoading ? (
          <Text color={"#ccd6f6"}>Loading...</Text>
        ) : error ? (
          <Text color={"red"}>Error occured while loading list</Text>
        ) : (
          <Box
            data-section="list-container"
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"center"}
            gap={"15px"}
            w="100%"
            mb={"10px"}
          >
            {products?.length > 0 &&
              products?.map((product: I_Products) => {
                return <ProductCard product={product} key={product.id} />;
              })}
          </Box>
        )}
      </Box>
    </Box>
  );
};
