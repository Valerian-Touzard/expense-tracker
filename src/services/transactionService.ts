import { FormulaireTransaction } from "../context";

class TransactionService {
  async getAllTransactions() {
    return await fetch("http://localhost:8080/transactions")
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
  async AddTransaction(transaction: FormulaireTransaction) {
    return await fetch("http://localhost:8080/transactions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }).catch((err) => console.error(err));
  }
}

export const transactionService = Object.freeze(new TransactionService());
