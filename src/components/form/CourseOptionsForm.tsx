import React from "react";
import { Box, Button, FormLabel, Input, Text } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";

interface I_Element {
  title: string;
}

interface Props {
  handleBenefits: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
      }[]
    >
  >;
  benefits: I_Element[];
  handlePrerequisites: React.Dispatch<
    React.SetStateAction<
      {
        title: string;
      }[]
    >
  >;
  prerequisites: I_Element[];
  handleMove: (move: number) => void;
}

export const CourseOptionsForm: React.FC<Props> = ({
  handleBenefits,
  benefits,
  prerequisites,
  handlePrerequisites,
  handleMove,
}) => {
  // add new benefit
  const addBenefit = (): void => {
    handleBenefits([...benefits, { title: "" }]);
  };

  // handle change in benefit filed
  const handleBenefitsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let result = benefits.map((benefit, i) => {
      if (i == index) {
        return { title: e.target.value };
      }

      return benefit;
    });

    handleBenefits(result);
  };

  // add new prerequisite
  const addPrerequisite = (): void => {
    handlePrerequisites([...prerequisites, { title: "" }]);
  };

  // handle chnage in prequisite field
  const handlePrerequisiteChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let result = prerequisites.map((prerequisite, i) => {
      if (i == index) {
        return { title: e.target.value };
      }

      return prerequisite;
    });

    handlePrerequisites(result);
  };

  // remove benefit
  const removeBenefit = (benefitIndex: number) => {
    const result = benefits.filter((_elem: I_Element, i: number) => {
      return benefitIndex != i;
    });

    handleBenefits(result);
  };

  // remove prerequisite
  const removePrerequisite = (prerequisiteIndex: number) => {
    const result = prerequisites.filter((_elem: I_Element, i: number) => {
      return prerequisiteIndex != i;
    });

    handlePrerequisites(result);
  };

  return (
    <Box>
      <form
        onSubmit={() => {
          handleMove(1);
        }}
      >
        <Box display={"flex"} flexDir={"column"} gap={"10px"} color={"#ccd6f6"}>
          <Text fontSize={"25px"}>Course benefits</Text>
          {benefits.map((item: I_Element, index: number) => {
            return (
              <Box key={index}>
                <Box
                  display={"flex"}
                  gap={"3px"}
                  alignItems={"center"}
                  mb={"5px"}
                >
                  <FormLabel>Enter benefit</FormLabel>
                  <Button
                    padding={"0"}
                    minWidth={"30px"}
                    minHeight={"30px"}
                    height={"30px"}
                    onClick={() => {
                      removeBenefit(index);
                    }}
                  >
                    <MdDelete size={20} color="#af3435" />
                  </Button>
                </Box>
                <Input
                  as="input"
                  required
                  type="text"
                  placeholder="enter course benefit"
                  id="name"
                  name="name"
                  border={"1px solid"}
                  borderColor="#a8b2d1"
                  value={item.title}
                  onChange={(e) => {
                    handleBenefitsChange(e, index);
                  }}
                />
              </Box>
            );
          })}
          <Button
            w={"2%"}
            onClick={() => {
              addBenefit();
            }}
          >
            +
          </Button>
        </Box>

        <Box
          display={"flex"}
          flexDir={"column"}
          gap={"10px"}
          my={"25px"}
          color={"#ccd6f6"}
        >
          <Text fontSize={"25px"}>Course prerequisites</Text>
          {prerequisites.map((item: I_Element, index: number) => {
            return (
              <Box key={index}>
                <Box
                  display={"flex"}
                  gap={"3px"}
                  alignItems={"center"}
                  mb={"5px"}
                >
                  <FormLabel>Enter prerequisite</FormLabel>
                  <Button
                    padding={"0"}
                    minWidth={"30px"}
                    minHeight={"30px"}
                    height={"30px"}
                    onClick={() => {
                      removePrerequisite(index);
                    }}
                  >
                    <MdDelete size={20} color="#af3435" />
                  </Button>
                </Box>
                <Input
                  as="input"
                  required
                  type="text"
                  placeholder="enter course prerequisite"
                  id="name"
                  name="name"
                  border={"1px solid"}
                  borderColor="#a8b2d1"
                  value={item.title}
                  onChange={(e) => {
                    handlePrerequisiteChange(e, index);
                  }}
                />
              </Box>
            );
          })}
          <Button
            w={"2%"}
            onClick={() => {
              addPrerequisite();
            }}
          >
            +
          </Button>
        </Box>

        <Button
          type="submit"
          backgroundColor={"#3b82f6"}
          float={"right"}
          my={"15px"}
        >
          Next
        </Button>
      </form>
    </Box>
  );
};
