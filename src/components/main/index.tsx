import { Button, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Summary from "../summary";
import ExpenseView from "../expense-view";
import { useGlobalState } from "../../context";

const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    totalIncome,
    setTotalIncome,
    totalExpense,
    setTotalExpense,
    allTransaction,
    setAllTransaction,
  } = useGlobalState();

  useEffect(() => {
    let income = 0;
    let expense = 0;

    allTransaction.forEach((item) =>
      item.transaction.type === "income"
        ? (income = income + parseFloat(item.transaction.amount))
        : (expense = expense + parseFloat(item.transaction.amount))
    );
    setTotalExpense(expense);
    setTotalIncome(income)
  }, [allTransaction]);

  return (
    <Flex textAlign={"center"} flexDirection={"column"} pr={"5"} pl={"5"}>
      <Flex alignItems={"center"} justifyContent={"space-between"} mt={"12"}>
        <Heading
          color={"blue.400"}
          display={["none", "block", "block", "block", "block"]}
        >
          Expense Tracker
        </Heading>
        <Flex alignItems={"center"}>
          <Button onClick={onOpen} bg={"blue.300"} color={"black"} ml={"4"}>
            Add New Transaction
          </Button>
        </Flex>
      </Flex>
      <Summary totalExpense={totalExpense} totalIncome={totalIncome} isOpen={isOpen} onClose={onClose} />
      <Flex
        w="full"
        alignItems={"flex-start"}
        justifyContent={"space-evenly"}
        flexDirection={["column", "column", "column", "row", "row"]}
      >
        <ExpenseView />
        <ExpenseView />
      </Flex>
    </Flex>
  );
};

export default Main;
