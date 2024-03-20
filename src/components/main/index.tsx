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
    getAllTransaction
  } = useGlobalState();

  useEffect(() => {
    let income = 0;
    let expense = 0;

    allTransaction.forEach((transaction) =>
      transaction.type === "income"
        ? (income = income + parseFloat(transaction.amount))
        : (expense = expense + parseFloat(transaction.amount))
    );
    setTotalExpense(expense);
    setTotalIncome(income)
  }, [allTransaction]);

  useEffect(() => {
    getAllTransaction()
  }, [])

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
        <ExpenseView data={allTransaction.filter(item => item.type === 'expense')} type="expense"/>
        <ExpenseView data={allTransaction.filter(item => item.type === 'income')} type="income" />
      </Flex>
    </Flex>
  );
};

export default Main;
