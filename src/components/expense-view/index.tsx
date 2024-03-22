import { Box, Button, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { FormData } from "../../context";
import { EditIcon } from "@chakra-ui/icons";

type Props = {
  type: string;
  data: FormData[];
};

const ExpenseView = ({ type, data }: Props) => {
  return (
    <Box
      flex={1}
      w="full"
      bg={"white"}
      mr={"4"}
      mt={"10"}
      p={"5"}
      pb={"4"}
      border={"1px solid"}
      borderColor={"gray.100"}
      borderRadius={"12"}
    >
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading size={"md"} color={"red.700"}>
          {type === "income" ? "Income" : "Expense"}
        </Heading>
      </Flex>
      {data.map((item) => (
        <div key={item.id}>
          <Flex
            bg={type === "expense" ? "red.50" : "blue.50"}
            mt={"4"}
            justifyContent={"space-between"}
            alignItems={"center"}
            border={"1px solid"}
            borderColor={type === "expense" ? "red.100" : "blue.100"}
            p={"4"}
            borderRadius={"8"}
          >
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Text ml="3" fontWeight="bold" color="gray.600">
                <IconButton
                  variant="solid"
                  aria-label="Edit transaction"
                  colorScheme="teal"
                  icon={<EditIcon />}
                />
                {item.description}
              </Text>
            </Flex>
            <Text>$ {item.amount}</Text>
          </Flex>
        </div>
      ))}
    </Box>
  );
};

export default ExpenseView;
