const fs = require('fs');

class Transaction {
    constructor(data) {
        Object.assign(this, data);
    }

    string() {
        return JSON.stringify(this, null, 2);
    }
}

class TransactionAnalyzer {
    constructor(transactions = []) {
        this.transactions = transactions.map(t => new Transaction(t));
    }

    addTransaction(transaction) {
        this.transactions.push(new Transaction(transaction));
    }

    getAllTransaction() {
        return this.transactions;
    }

    getUniqueTransactionType() {
        return [...new Set(this.transactions.map(t => t.transaction_type))];
    }

    calculateTotalAmount() {
        return this.transactions.reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
    }

    calculateTotalAmountByDate(year, month, day) {
        return this.transactions.filter(t => {
            const d = new Date(t.transaction_date);
            return (!year || d.getFullYear() === year) &&
                   (!month || d.getMonth() + 1 === month) &&
                   (!day || d.getDate() === day);
        }).reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
    }

    getTransactionByType(type) {
        return this.transactions.filter(t => t.transaction_type === type);
    }

    getTransactionsInDateRange(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return this.transactions.filter(t => {
            const d = new Date(t.transaction_date);
            return d >= start && d <= end;
        });
    }

    getTransactionsByMerchant(merchantName) {
        return this.transactions.filter(t => t.merchant_name === merchantName);
    }

    calculateAverageTransactionAmount() {
        if (this.transactions.length === 0) return 0;
        return this.calculateTotalAmount() / this.transactions.length;
    }

    getTransactionsByAmountRange(min, max) {
        return this.transactions.filter(t => {
            const amount = parseFloat(t.transaction_amount);
            return amount >= min && amount <= max;
        });
    }

    calculateTotalDebitAmount() {
        return this.getTransactionByType('debit')
                   .reduce((sum, t) => sum + parseFloat(t.transaction_amount), 0);
    }

    findMostTransactionsMonth() {
        const count = {};
        this.transactions.forEach(t => {
            const d = new Date(t.transaction_date);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            count[key] = (count[key] || 0) + 1;
        });
        return Object.entries(count).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    findMostDebitTransactionMonth() {
        const debitTx = this.getTransactionByType('debit');
        const count = {};
        debitTx.forEach(t => {
            const d = new Date(t.transaction_date);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            count[key] = (count[key] || 0) + 1;
        });
        return Object.entries(count).reduce((a, b) => a[1] > b[1] ? a : b)[0];
    }

    mostTransactionTypes() {
        const debitCount = this.getTransactionByType('debit').length;
        const creditCount = this.getTransactionByType('credit').length;
        if (debitCount > creditCount) return 'debit';
        if (creditCount > debitCount) return 'credit';
        return 'equal';
    }

    getTransactionsBeforeDate(dateStr) {
        const target = new Date(dateStr);
        return this.transactions.filter(t => new Date(t.transaction_date) < target);
    }

    findTransactionById(id) {
        return this.transactions.find(t => t.transaction_id === id);
    }

    mapTransactionDescriptions() {
        return this.transactions.map(t => t.transaction_description);
    }
}

// Загрузка данных из transactions.json
const data = fs.readFileSync('transactions.json', 'utf8');
const transactions = JSON.parse(data);

// Использование класса
const analyzer = new TransactionAnalyzer(transactions);

// Примеры использования
console.log("Общая сумма:", analyzer.calculateTotalAmount().toFixed(2));
console.log("Типы транзакций:", analyzer.getUniqueTransactionType());
console.log("Средняя сумма:", analyzer.calculateAverageTransactionAmount().toFixed(2));
console.log("Месяц с наибольшим числом транзакций:", analyzer.findMostTransactionsMonth());
console.log("Месяц с наибольшим числом дебетовых транзакций:", analyzer.findMostDebitTransactionMonth());
console.log("Транзакции до 2020-01-01:", analyzer.getTransactionsBeforeDate("2020-01-01").length);

