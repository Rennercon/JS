# Лабораторная работа №3

## Цель

Познакомить студентов с основами взаимодействия JavaScript с DOM-деревом на примере веб-приложения для учёта личных финансов.

---

## Структура проекта

project-root/
│
├── index.html # Основной HTML-файл
├── style.css # Стилизация интерфейса
├── script.js # Основная логика приложения
└── README.md # Документация проекта

markdown
Копировать
Редактировать

---

## Как запустить

1. Скачайте или клонируйте репозиторий.
2. Откройте файл `index.html` в любом современном браузере.
3. Начните вносить транзакции — они будут отображаться в таблице и суммироваться автоматически.

---

## Функциональность

### Представление транзакций

- Используется массив `transactions`, каждый объект содержит:
   - `id` — уникальный идентификатор
   - `date` — дата и время
   - `amount` — сумма
   - `category` — категория
   - `description` — описание

### Отображение

- Таблица с колонками:
   - ID
   - Дата и время
   - Категория
   - Краткое описание (первые 4 слова)
   - Действие (кнопка удаления)

- Цвет строки:
   - Зелёный — положительная сумма
   - Красный — отрицательная сумма

### Добавление транзакций

- Функция `addTransaction()`:
   - Считывает данные формы
   - Создаёт объект транзакции
   - Добавляет в `transactions`
   - Обновляет таблицу

### Удаление транзакций

- Каждая строка содержит кнопку "Удалить"
- При нажатии:
   - Удаляется строка таблицы
   - Удаляется элемент из массива `transactions`
- Используется делегирование событий на элементе `<table>`

### Подсчёт суммы

- Функция `calculateTotal()`
   - Пересчитывает итоговую сумму
   - Отображает её на странице

### Полное описание

- При клике на строку с транзакцией:
   - В отдельном блоке отображается полное описание транзакции

---

## Пример JSDoc

```js
/**
 * Добавляет транзакцию в таблицу и массив.
 * @param {Object} transaction - Объект транзакции
 * @param {number} transaction.amount - Сумма транзакции
 * @param {string} transaction.category - Категория
 * @param {string} transaction.description - Описание
 */
function addTransaction(transaction) {
  // ...
}