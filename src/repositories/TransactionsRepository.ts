import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const totalIncomes = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((total, currentValue) => total + currentValue.value, 0);

    const totalOutcomes = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((total, currentValue) => total + currentValue.value, 0);

    const total = totalIncomes - totalOutcomes;

    const balance: Balance = {
      income: totalIncomes,
      outcome: totalOutcomes,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
