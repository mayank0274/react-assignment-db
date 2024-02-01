import React, { useState } from "react";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import { CourseInfoForm } from "./CourseInfoForm";
import { I_CourseInfo } from "./CourseInfoForm";
import { CourseOptionsForm } from "./CourseOptionsForm";
import { CourseDataForm } from "./CourseDataForm";
import { I_CourseData } from "./CourseDataForm";
import { CoursePreview } from "./CoursePreview";

const steps = [
  { title: "First", description: "Course information" },
  { title: "Second", description: "Course options" },
  { title: "Third", description: "Course content" },
  { title: "Fourth", description: "Preview" },
];

export const CreateCourseMainForm: React.FC = () => {
  // form steeper
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const handleMove = (move: number): void => {
    setActiveIndex((prev) => {
      return prev + move;
    });
  };

  //course data states
  const [courseInfo, setCourseInfo] = useState<I_CourseInfo>({
    name: "",
    description: "",
    price: 0,
    estimatedPrice: 0,
    tags: "",
    level: "",
    thumbnail: "",
  });
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseData, setCourseData] = useState<I_CourseData[]>([
    {
      title: "",
      description: "",
      videoUrl: "",
      videoSection: "",
      videoDuration: 0,
      links: [
        {
          title: "",
          url: "",
        },
      ],
    },
  ]);

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
      gap={"20px"}
      minH={"100vh"}
      height={"100%"}
      backgroundColor={"#0a192f"}
      padding={"10px"}
      justifyContent={"center"}
      alignItems={{ base: "center", sm: "center", md: "normal", lg: "normal" }}
    >
      <Box
        as="section"
        w="75%"
        display={"flex"}
        flexDir={"column"}
        gap={"10px"}
      >
        {activeIndex === 1 && (
          <CourseInfoForm
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            handleMove={handleMove}
          />
        )}

        {activeIndex === 2 && (
          <CourseOptionsForm
            benefits={benefits}
            handleBenefits={setBenefits}
            prerequisites={prerequisites}
            handlePrerequisites={setPrerequisites}
            handleMove={handleMove}
          />
        )}

        {activeIndex === 3 && (
          <CourseDataForm
            courseData={courseData}
            addCourseData={setCourseData}
            handleMove={handleMove}
          />
        )}

        {activeIndex === 4 && (
          <CoursePreview
            courseData={courseData}
            courseInfo={courseInfo}
            benefits={benefits}
            prerequesites={prerequisites}
          />
        )}
      </Box>

      <Stepper
        index={activeIndex}
        orientation="vertical"
        height="300px"
        gap="0"
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            onClick={() => {
              if (activeIndex > 1 && index + 1 == activeIndex - 1) {
                handleMove(-1);
              }
            }}
            style={{
              cursor: "pointer",
              color: "#ccd6f6",
            }}
          >
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0" color={"#ccd6f6"}>
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
