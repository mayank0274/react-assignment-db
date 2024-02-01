import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Divider,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOndemandVideo } from "react-icons/md";
import { IoVideocam } from "react-icons/io5";
import { I_CourseData } from "./CourseDataForm";

const getTime = (duration: number): string => {
  const min = Math.floor(duration / 60);
  const sec = duration % 60;
  return `${min}m ${sec}s`;
};

const CourseOverview = ({
  courseData,
  section,
}: {
  courseData: I_CourseData[];
  section: string;
}): React.ReactNode => {
  return (
    <List spacing={2} width={"80%"}>
      {courseData.map((video: any, i: number) => {
        if (video.videoSection == section) {
          return (
            <ListItem
              key={video.videoUrl}
              color={"#ccd6f6"}
              fontSize={"15px"}
              padding={"3px"}
              cursor={"pointer"}
            >
              <Box display={"flex"} alignItems={"center"} mb="10px">
                <ListIcon as={IoVideocam} fontSize={"23px"} />
                <Text as={"section"}>
                  <Text>
                    {video.title} {i}
                  </Text>
                  <Text color={"#8892b0"} fontSize={"12px"}>
                    Duration : {getTime(video.videoDuration)}
                  </Text>
                </Text>
              </Box>

              <Divider />
            </ListItem>
          );
        }
      })}
    </List>
  );
};

export const CourseList = ({ courseData }: { courseData: any }) => {
  const uniqueCourseSection = (data: any): string[] => {
    return [...new Set<string>(data.map((item: any) => item.videoSection))];
  };

  const sections = uniqueCourseSection(courseData);
  const iconColor = useColorModeValue("#26bf65", "#64ffda");
  return (
    <Accordion
      w={{ base: "100%", sm: "100%", md: "85%", lg: "85%" }}
      allowToggle
      bg={"secondaryBgColor"}
    >
      {sections.map((item: any) => {
        return (
          <AccordionItem key={item}>
            <h2>
              <AccordionButton>
                <Box
                  as="span"
                  flex="1"
                  textAlign="left"
                  color={"#ccd6f6"}
                  display={"flex"}
                  gap={"15px"}
                >
                  <MdOndemandVideo color={iconColor} fontSize={"23px"} /> {item}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} color={"#ccd6f6"}>
              <CourseOverview section={item} courseData={courseData} />
            </AccordionPanel>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};
