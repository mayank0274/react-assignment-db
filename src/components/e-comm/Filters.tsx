import {
  Box,
  Text,
  Select,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

interface Props {
  priceFilter: number;
  setPriceFilter: React.Dispatch<React.SetStateAction<number>>;
}

export const ProductFilters: React.FC<Props> = ({
  priceFilter,
  setPriceFilter,
}) => {
  // handle categoies in query params
  const [searchParams, setSearchParams] = useSearchParams();
  let category = searchParams.get("category") || "";
  let sort = searchParams.get("sort") || "desc";
  let rating = searchParams.get("rating") || "";

  // fetch categories list
  const { data: categroies, error } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const data = await fetch("https://fakestoreapi.com/products/categories");
      return await data.json();
    },
  });

  // set category
  const handleCategories = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prev) => {
      prev.set("category", e.target.value);
      return prev;
    });
  };

  // handle sort options
  const handlePriceOptions = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchParams((prev) => {
      prev.set("sort", e.target.value);
      prev.delete("category");
      return prev;
    });
  };

  // handle rating
  const handleRating = (value: string) => {
    setSearchParams((prev) => {
      prev.set("rating", value);
      prev.delete("category");
      prev.delete("sort");
      return prev;
    });
  };

  return (
    <Box
      w="100%"
      alignSelf={"center"}
      borderColor={"#a8b2d1"}
      minH={"95vh"}
      bg={"#112240"}
      m={"20px"}
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      gap={"10px"}
    >
      <Box width={"90%"} display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text color={"#ccd6f6"} fontSize={"22px"} fontWeight={"bold"}>
          Filters
        </Text>

        <Box data-section="categories" width={"80%"}>
          <Text color={"#ccd6f6"} fontSize={"19px"} fontWeight={"bold"}>
            Categories
          </Text>
          <Select
            size={"sm"}
            color={"#ccd6f6"}
            mt={"12px"}
            onChange={(e) => {
              handleCategories(e);
            }}
            value={category}
          >
            {error && (
              <option style={{ color: "red" }} value={""} disabled>
                Error occured in loading categories
              </option>
            )}
            <option value={""}>Select category</option>
            {categroies &&
              categroies.map((elem: any) => {
                return (
                  <option
                    value={elem}
                    key={elem}
                    style={{
                      color: "black",
                    }}
                  >
                    {elem}
                  </option>
                );
              })}
          </Select>
        </Box>
      </Box>

      <Box
        data-section="sorting"
        width={"90%"}
        display={"flex"}
        flexDir={"column"}
        gap={"10px"}
      >
        <Text color={"#ccd6f6"} fontSize={"22px"} fontWeight={"bold"}>
          Sorting
        </Text>

        <Box data-section="price" width={"90%"}>
          <Text color={"#ccd6f6"} fontSize={"19px"} fontWeight={"bold"}>
            Price and popularity
          </Text>
          <Select
            size={"sm"}
            color={"#ccd6f6"}
            mt={"12px"}
            onChange={(e) => {
              handlePriceOptions(e);
            }}
            value={sort}
          >
            <option
              key={"desc"}
              value={"desc"}
              style={{
                color: "black",
              }}
            >
              Descending
            </option>

            <option
              key={"asc"}
              value={"asc"}
              style={{
                color: "black",
              }}
            >
              Ascending
            </option>
          </Select>

          <Box display={"flex"} gap={"20px"} alignItems={"center"}>
            <Slider
              defaultValue={500}
              min={0}
              max={200}
              step={40}
              my={"20px"}
              onChange={(val) => setPriceFilter(val)}
              value={priceFilter}
            >
              <SliderTrack bg="red.100">
                <SliderFilledTrack bg="tomato" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>

            <Text color={"#fff"} fontSize={"16px"}>
              {priceFilter}
            </Text>
          </Box>

          <Box>
            <Text color={"#ccd6f6"} fontSize={"19px"} fontWeight={"bold"}>
              Rating
            </Text>
            t
            <RadioGroup
              defaultValue="1"
              color={"#ccd6f6"}
              onChange={(e) => {
                handleRating(e);
              }}
              value={rating}
            >
              <Stack>
                <Radio value="greater_than_4"> Greater than 4</Radio>
                <Radio value="greater_than_2"> Greater than 2</Radio>
              </Stack>
            </RadioGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
