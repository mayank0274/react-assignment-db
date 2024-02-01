import React, { useState } from "react";
import { Box, Heading, Text, List, ListItem, ListIcon } from "@chakra-ui/react";
import { BsCheck2All } from "react-icons/bs";
import { CourseList } from "./CourseList";
import { CoursePayment } from "./CoursePayment";
import { I_CourseInfo } from "./CourseInfoForm";
import { I_CourseData } from "./CourseDataForm";

export const CourseImportantPoints = ({
  list,
}: {
  list: any;
}): React.ReactNode => {
  return (
    <List spacing={2}>
      {list.map((listItem: any, i: number) => {
        return (
          <ListItem color={"#8892b0"} fontSize={"15px"} key={i}>
            <ListIcon as={BsCheck2All} />
            {listItem.title}
          </ListItem>
        );
      })}
    </List>
  );
};

interface Props {
  courseInfo: I_CourseInfo;
  benefits: { title: string }[];
  prerequesites: { title: string }[];
  courseData: I_CourseData[];
}

export const CoursePreview: React.FC<Props> = ({
  courseInfo,
  courseData,
  benefits,
  prerequesites,
}) => {
  const [course, _setCourse] = useState({
    ...courseInfo,
    prerequesites: prerequesites,
    courseData,
    benefits,
  });
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDir={{
        base: "column-reverse",
        sm: "column-reverse",
        md: "row",
        lg: "row",
      }}
      justifyContent={"space-around"}
      padding={"20px"}
      color={"#ccd6f6"}
    >
      <Box
        as="section"
        w={{ base: "100%", sm: "100%", md: "70%", lg: "70%" }}
        display={"flex"}
        flexDir={"column"}
        gap={"25px"}
      >
        <Heading fontSize={"35px"} fontFamily={"'Poppins', sans-serif"}>
          {course.name}
        </Heading>

        <Box display={"flex"} flexDir={"column"} gap={"10px"}>
          <Heading fontFamily={"'Poppins', sans-serif"} fontSize={"25px"}>
            What you will learn from this course
          </Heading>
          <CourseImportantPoints list={course.benefits} />
        </Box>

        <Box display={"flex"} flexDir={"column"} gap={"10px"}>
          <Heading fontFamily={"'Poppins', sans-serif"} fontSize={"25px"}>
            What are prerequisites for this course ?
          </Heading>
          <CourseImportantPoints list={course.prerequesites} />
        </Box>

        <Box display={"flex"} flexDir={"column"} gap={"10px"}>
          <Heading fontFamily={"'Poppins', sans-serif"} fontSize={"25px"}>
            Course Overview
          </Heading>
          <Text color={"#8892b0"} fontSize={"15px"}>
            {course.description}
          </Text>
          <CourseList courseData={course.courseData} />
        </Box>
      </Box>
      <CoursePayment course={course} />
    </Box>
  );
};
