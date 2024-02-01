import React, { useRef } from "react";
import {
  Box,
  FormLabel,
  Input,
  Textarea,
  Image,
  Button,
  Text,
} from "@chakra-ui/react";

export interface I_CourseInfo {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  tags: string;
  level: string;
  thumbnail: string;
}

interface Props {
  courseInfo: I_CourseInfo;
  setCourseInfo: React.Dispatch<React.SetStateAction<I_CourseInfo>>;
  handleMove: (move: number) => void;
}

export const CourseInfoForm: React.FC<Props> = ({
  courseInfo,
  setCourseInfo,
  handleMove,
}) => {
  // handle change
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setCourseInfo({ ...courseInfo, [e.target.name]: e.target.value });
  };

  const thumbnailRef = useRef<HTMLInputElement>(null);

  const handleThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    let image = e.target.files[0];
    const reader = new FileReader();

    if (image) {
      reader.onload = () => {
        if (reader.readyState == 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result as string });
        }
      };

      reader.readAsDataURL(image);
    }
  };

  return (
    <Box>
      <form
        onSubmit={() => {
          handleMove(1);
        }}
      >
        <Box color={"#ccd6f6"}>
          <FormLabel>Course name</FormLabel>
          <Input
            as="input"
            required
            type="text"
            placeholder="enter course name"
            id="name"
            name="name"
            border={"1px solid"}
            borderColor="#a8b2d1"
            value={courseInfo.name}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Box>

        <Box my={"15px"} color={"#ccd6f6"}>
          <FormLabel>Course description</FormLabel>
          <Textarea
            rows={9}
            required
            placeholder="enter course description"
            id="name"
            name="description"
            border={"1px solid"}
            borderColor="#a8b2d1"
            value={courseInfo.description}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Box>

        <Box
          my={"15px"}
          display={"flex"}
          justifyContent={"space-evenly"}
          color={"#ccd6f6"}
        >
          <Box w={"49%"}>
            <FormLabel>Course price</FormLabel>
            <Input
              as="input"
              required
              type="number"
              placeholder="enter course price"
              id="price"
              name="price"
              border={"1px solid"}
              borderColor="#a8b2d1"
              value={courseInfo.price}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Box>

          <Box w="49%">
            <FormLabel>Estimated price</FormLabel>
            <Input
              as="input"
              type="number"
              placeholder="enter course estimated price"
              id="estimatedPrice"
              name="estimatedPrice"
              border={"1px solid"}
              borderColor="#a8b2d1"
              value={courseInfo.estimatedPrice}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </Box>
        </Box>

        <Box my={"15px"} color={"#ccd6f6"}>
          <FormLabel>Course tags (separated by commas)</FormLabel>
          <Input
            as="input"
            required
            type="text"
            placeholder="enter course tags"
            id="tags"
            name="tags"
            border={"1px solid"}
            borderColor="#a8b2d1"
            value={courseInfo.tags}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Box>

        <Box my={"15px"} color={"#ccd6f6"}>
          <FormLabel>Course level</FormLabel>
          <Input
            as="input"
            required
            type="text"
            placeholder="enter course name"
            id="level"
            name="level"
            border={"1px solid"}
            borderColor="#a8b2d1"
            value={courseInfo.level}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </Box>

        <Box my={"15px"} key={"thumbnail"}>
          {!courseInfo.thumbnail && (
            <Box
              my={"15px"}
              color={"#ccd6f6"}
              border={"1px solid"}
              borderColor="#a8b2d1"
              p={"15px"}
              textAlign={"center"}
              cursor={"pointer"}
              onClick={() => {
                if (thumbnailRef.current) {
                  thumbnailRef.current.click();
                }
              }}
            >
              <Input
                ref={thumbnailRef}
                as="input"
                required
                type="file"
                id="thumbnail"
                name="thumbnail"
                onChange={(e) => {
                  handleThumbnail(e);
                }}
                display={"none"}
              />
              <Text>Click here to upload thumbnail</Text>
            </Box>
          )}
          {courseInfo.thumbnail && (
            <Box position={"relative"}>
              <Button
                position={"absolute"}
                right={"0"}
                backgroundColor={"#0000009e"}
                sx={{
                  _hover: {
                    backgroundColor: "#0000009e",
                  },
                }}
                onClick={() => {
                  setCourseInfo({ ...courseInfo, thumbnail: "" });
                }}
              >
                X
              </Button>

              <Image
                src={courseInfo.thumbnail}
                width={"100%"}
                height={"350px"}
              />
            </Box>
          )}
        </Box>

        <Button
          color={"#ccd6f6"}
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
