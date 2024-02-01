import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { CourseImportantPoints } from "./CoursePreview";

const courseTotalContent = [
  {
    title: "Access to complete course and bonus videos",
  },
  {
    title: "Access to complete course source code",
  },
  {
    title: "Quick support for your queries related to support",
  },
  {
    title: "Lifetime access",
  },
  {
    title: "Certificate of completion",
  },
];

export const CoursePayment: React.FC<{
  course: any;
}> = ({ course }) => {
  return (
    <Box
      w={{ base: "100%", sm: "100%", md: "40%", lg: "40%" }}
      display={"flex"}
      flexDir={"column"}
      gap={"15px"}
    >
      <Image src={course.thumbnail} alt={course.name} />
      <Box display={"flex"} alignItems={"center"} gap={"40px"}>
        <Button
          colorScheme="red"
          borderRadius={"25px"}
          width={{ base: "53%", sm: "53%", md: "40%", lg: "40%" }}
        >
          {`Buy @ $${course?.price}`}
        </Button>

        <Text fontSize={"20px"}>Price : ${course?.price}</Text>
      </Box>

      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Heading fontFamily={"'Poppins', sans-serif"} fontSize={"25px"}>
          What will you get ?
        </Heading>
        <CourseImportantPoints list={courseTotalContent} />
      </Box>
    </Box>
  );
};
