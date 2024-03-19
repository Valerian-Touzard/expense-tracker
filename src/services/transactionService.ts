class TransactionService {
  async getAllTransactions() {
    return await fetch("http://localhost:8080/transactions")
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
}

export const transactionService = Object.freeze(new TransactionService)
