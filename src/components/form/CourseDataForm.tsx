import React from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  FormLabel,
  Input,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiAttachment2 } from "react-icons/ri";

interface I_Links {
  title: string;
  url: string;
}

export interface I_CourseData {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoDuration: number;
  links: I_Links[];
}

interface Props {
  courseData: I_CourseData[];
  addCourseData: React.Dispatch<React.SetStateAction<I_CourseData[]>>;
  handleMove: (move: number) => void;
}

interface CourseDataProps {
  video: I_CourseData;
  handleChange: (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  index: number;
  addNewResource: (index: number) => void;
  changeResourceField: (
    videoIndex: number,
    resourceIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  deleteResource: (videoIndex: number, resourceIndex: number) => void;
}

const CourseContent = ({
  video,
  handleChange,
  index,
  addNewResource,
  changeResourceField,
  deleteResource,
}: CourseDataProps): React.ReactNode => {
  return (
    <Box display={"flex"} flexDir={"column"} gap={"10px"}>
      <Box>
        <FormLabel>Video name</FormLabel>
        <Input
          as="input"
          required
          type="text"
          placeholder="enter video name"
          id="title"
          name="title"
          border={"1px solid"}
          borderColor="#a8b2d1"
          value={video.title}
          onChange={(e) => {
            handleChange(index, e);
          }}
        />
      </Box>

      <Box>
        <FormLabel>Video description</FormLabel>
        <Textarea
          rows={4}
          required
          placeholder="enter video description"
          id="description"
          name="description"
          border={"1px solid"}
          borderColor="#a8b2d1"
          value={video.description}
          onChange={(e) => {
            handleChange(index, e);
          }}
        />
      </Box>

      <Box>
        <FormLabel>Video section</FormLabel>
        <Input
          as="input"
          required
          type="text"
          placeholder="enter video section"
          id="videoSection"
          name="videoSection"
          border={"1px solid"}
          borderColor="#a8b2d1"
          value={video.videoSection}
          onChange={(e) => {
            handleChange(index, e);
          }}
        />
      </Box>

      <Box>
        <FormLabel>Video url</FormLabel>
        <Input
          as="input"
          required
          type="text"
          placeholder="enter video url(i.e cloudinary or aws s3)"
          id="videoUrl"
          name="videoUrl"
          border={"1px solid"}
          borderColor="#a8b2d1"
          value={video.videoUrl}
          onChange={(e) => {
            handleChange(index, e);
          }}
        />
      </Box>

      <Box>
        <FormLabel>Video duration (in seconds)</FormLabel>
        <Input
          as="input"
          required
          type="number"
          placeholder="enter video duration"
          id="videoDuration"
          name="videoDuration"
          border={"1px solid"}
          borderColor="#a8b2d1"
          value={video.videoDuration}
          onChange={(e) => {
            handleChange(index, e);
          }}
        />
      </Box>

      <Box display={"flex"} flexDir={"column"} gap={"10px"}>
        <Text fontSize={"25px"}>Course resources</Text>
        {video.links.map((item: I_Links, i: number) => {
          return (
            <Box key={i}>
              <Box display={"flex"} alignItems={"center"} gap={"10px"}>
                <RiAttachment2 size={20} />
                <FormLabel fontSize={"20px"}>Resource {i + 1}</FormLabel>
                <Button
                  padding={"0"}
                  minWidth={"30px"}
                  minHeight={"30px"}
                  height={"30px"}
                  onClick={() => {
                    deleteResource(index, i);
                  }}
                >
                  <MdDelete size={20} color="#af3435" />
                </Button>
              </Box>
              <Box>
                <FormLabel>Enter title</FormLabel>
                <Input
                  as="input"
                  required
                  type="text"
                  placeholder="enter resource title"
                  id="title"
                  name="title"
                  border={"1px solid"}
                  borderColor="#a8b2d1"
                  value={item.title}
                  onChange={(e) => {
                    changeResourceField(index, i, e);
                  }}
                />
              </Box>

              <Box>
                <FormLabel>Enter url</FormLabel>
                <Input
                  as="input"
                  required
                  type="text"
                  placeholder="enter resource url"
                  id="url"
                  name="url"
                  border={"1px solid"}
                  borderColor="#a8b2d1"
                  value={item.url}
                  onChange={(e) => {
                    changeResourceField(index, i, e);
                  }}
                />
              </Box>
            </Box>
          );
        })}
        <Button
          w={"2%"}
          onClick={() => {
            addNewResource(index);
          }}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

export const CourseDataForm: React.FC<Props> = ({
  courseData,
  addCourseData,
  handleMove,
}) => {
  // add course data to courseData array
  const addNewVideo = (): void => {
    addCourseData([
      ...courseData,
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
  };

  // handle change in coursedata values
  const handleCourseDataFieldsChange = (
    index: number,
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const result = courseData.map((video: I_CourseData, i: number) => {
      if (i === index && e) {
        return {
          ...video,
          [e.target.name]: e.target.value,
        };
      }

      return video;
    });

    addCourseData(result);
  };

  // add new resource

  const addNewResource = (index: number): void => {
    const result = courseData.map((elem: I_CourseData, i: number) => {
      if (i === index) {
        elem.links.push({ title: "", url: "" });
        return elem;
      }

      return elem;
    });

    addCourseData(result);
  };

  // change in resource filed
  const changeResourceField = (
    videoIndex: number,
    resourceIndex: number,
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const result = courseData.map((video: I_CourseData, i: number) => {
      if (i === videoIndex) {
        video.links.map((elem: I_Links, i: number) => {
          if (i === resourceIndex) {
            if (e.target.name.toString() == "title") {
              elem.title = e.target.value;
            }

            if (e.target.name.toString() == "url") {
              elem.url = e.target.value;
            }

            return elem;
          }

          return elem;
        });
      }

      return video;
    });

    addCourseData(result);
  };

  // delete resource
  const deleteResource = (videoIndex: number, resourceIndex: number) => {
    const result = courseData.map((video: I_CourseData, i: number) => {
      if (i === videoIndex) {
        video.links.map((elem: I_Links, i: number) => {
          if (i === resourceIndex && resourceIndex > -1) {
            video.links.splice(resourceIndex, 1);
          }

          return elem;
        });
      }

      return video;
    });

    addCourseData(result);
  };

  return (
    <Box display={"flex"} flexDir={"column"} gap={"10px"}>
      <form
        onSubmit={() => {
          handleMove(1);
        }}
      >
        <Accordion w={"100%"} allowToggle bg={"secondaryBgColor"}>
          {courseData.map((video: I_CourseData, i: number) => {
            return (
              <AccordionItem key={i}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "#172925", color: "#10ae7a" }}
                  >
                    <Box as="span" flex="1" textAlign="left" color={"#ccd6f6"}>
                      {video?.title ? video.title : `Video`}
                    </Box>
                    <FaEdit
                      style={{
                        color: "#ccd6f6",
                      }}
                    />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} color={"#ccd6f6"}>
                  <CourseContent
                    video={video}
                    handleChange={handleCourseDataFieldsChange}
                    index={i}
                    addNewResource={addNewResource}
                    changeResourceField={changeResourceField}
                    deleteResource={deleteResource}
                  />
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>

        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button
            onClick={() => {
              addNewVideo();
            }}
            backgroundColor={"#3b82f6"}
          >
            Add new video
          </Button>

          <Button
            type="submit"
            backgroundColor={"#3b82f6"}
            float={"right"}
            my={"15px"}
          >
            Next
          </Button>
        </Box>
      </form>
    </Box>
  );
};
