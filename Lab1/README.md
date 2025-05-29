# Лабораторная работа №1: Консольное приложение для анализа транзакций

## Цель работы
Ознакомление с основами синтаксиса JavaScript, структурой классов и обработкой JSON-данных через создание консольного приложения для анализа транзакций.

## Описание
Приложение позволяет загружать список транзакций из файла `transactions.json` и выполнять разнообразный анализ с использованием класса `TransactionAnalyzer`. Реализованы методы фильтрации, сортировки и анализа данных по дате, типу транзакции, диапазону суммы и другим параметрам.

## Структура проекта
lab1/
│
├── transactions.json # Исходный файл с транзакциями
├── index.js # Основной файл с логикой приложения
└── README.md # Документация

markdown
Копировать
Редактировать

## Основной функционал
Класс `TransactionAnalyzer` реализует следующие методы:

- `addTransaction(transaction)` — добавляет новую транзакцию
- `getAllTransaction()` — возвращает все транзакции
- `getUniqueTransactionType()` — возвращает список уникальных типов транзакций
- `calculateTotalAmount()` — считает общую сумму всех транзакций
- `calculateTotalAmountByDate(year, month, day)` — считает сумму транзакций за заданную дату
- `getTransactionByType(type)` — фильтрует транзакции по типу (`debit` / `credit`)
- `getTransactionsInDateRange(startDate, endDate)` — транзакции в диапазоне дат
- `getTransactionsByMerchant(merchantName)` — транзакции по названию магазина
- `calculateAverageTransactionAmount()` — средняя сумма транзакции
- `getTransactionsByAmountRange(minAmount, maxAmount)` — транзакции по диапазону суммы
- `calculateTotalDebitAmount()` — сумма дебетовых транзакций
- `findMostTransactionsMonth()` — месяц с наибольшим числом транзакций
- `findMostDebitTransactionMonth()` — месяц с наибольшим числом дебетовых транзакций
- `mostTransactionTypes()` — возвращает тип транзакций, которых больше (или equal)
- `getTransactionsBeforeDate(date)` — транзакции до указанной даты
- `findTransactionById(id)` — поиск транзакции по ID
- `mapTransactionDescriptions()` — возвращает массив описаний всех транзакций

Каждая транзакция имеет метод `string()`, возвращающий строку в формате JSON.

## Как запустить

1. Убедитесь, что у вас установлен [Node.js](https://nodejs.org/).
2. Клонируйте или скопируйте репозиторий.
3. Поместите файл `transactions.json` в корень проекта.
4. Запустите приложение:
   ```bash
   node index.js