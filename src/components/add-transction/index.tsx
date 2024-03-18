import {
    Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import React from "react";
import { GlobalContext, useGlobalState } from "../../context";

type Props = {
    isOpen: boolean;
    onClose: () => void;
}

const TransactionForm = ({isOpen, onClose}: Props) => {

  const {formData, setFormData, value, setValue} = useGlobalState()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Transaction</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Enter Description</FormLabel>
              <Input
                placeholder="Enter Transaction Description"
                name="description"
                type="text"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter Amount</FormLabel>
              <Input
                placeholder="Enter Transaction Amount"
                name="amount"
                type="number"
              />
            </FormControl>
            <RadioGroup mt="5">
              <Radio value="income" colorScheme="red" name="type">Expense</Radio>
              <Radio value="expense" colorScheme="blue" name="type">Income</Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button mr={"4"} onClick={onClose}>Cancel</Button>
            <Button>Add</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default TransactionForm;
