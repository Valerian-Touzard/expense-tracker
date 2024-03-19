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
import React, { ChangeEvent, FormEvent } from "react";
import { GlobalContext, useGlobalState } from "../../context";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const TransactionForm = ({ isOpen, onClose }: Props) => {
  const { value, setValue } = useGlobalState();

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setFormData({
    //   ...formData,
    //   [e.target.name]: e.target.value,
    // });
  };

  const handleSubmit = (e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    // handleFormSubmit();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
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
                onChange={handleFormChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Enter Amount</FormLabel>
              <Input
                placeholder="Enter Transaction Amount"
                name="amount"
                type="number"
                onChange={handleFormChange}
              />
            </FormControl>
            <RadioGroup mt="5" value={value} onChange={setValue}>
              <Radio
                // checked={formData.type === "income"}
                value="income"
                colorScheme="blue"
                name="type"
                onChange={handleFormChange}
              >
                Income
              </Radio>
              <Radio
                // checked={formData.type === "expense"}
                value="expense"
                colorScheme="red"
                name="type"
                onChange={handleFormChange}
              >
                Expense
              </Radio>
            </RadioGroup>
          </ModalBody>
          <ModalFooter>
            <Button mr={"4"} onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" onClick={onClose}>Add</Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default TransactionForm;
