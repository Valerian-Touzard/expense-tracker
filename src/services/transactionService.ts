import { FormulaireTransaction } from "../context";

class TransactionService {
  /**
   * Permet, via notre backend, de récupérer l'ensemble des transactions stocker dans notre base de données
   * @returns response json
   */
  async getAllTransactions() {
    return await fetch("http://localhost:8080/transactions")
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
  /**
   * Permet d'enregistrer, via notre backend, une nouvelle transaction dans notre base de données
   * @param transaction FormulaireTransaction
   */
  async AddTransaction(transaction: FormulaireTransaction) {
    return await fetch("http://localhost:8080/transactions/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    }).catch((err) => console.error(err));
  }

  /**
   * Permet de récupérer une transaction identifier par son id
   * @param idTransaction string
   * @returns La transaction identifier par son id
   */
  async getOneTransaction(idTransaction: string) {
    return await fetch(`http://localhost:8080/transactions/${idTransaction}`)
      .then((response) => response.json())
      .catch((err) => console.error(err));
  }
}

export const transactionService = Object.freeze(new TransactionService());
