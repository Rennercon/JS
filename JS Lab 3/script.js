/**
 * Массив для хранения транзакций.
 * @type {Array<{id: number, date: string, amount: number, category: string, description: string}>}
 */
let transactions = [];

/**
 * Получает текущую дату и время в формате "ГГГГ-ММ-ДД ЧЧ:ММ:СС".
 * @returns {string} Форматированная строка с датой и временем.
 */
function getCurrentDateTime() {
    const now = new Date();
    return now.toISOString().replace('T', ' ').substring(0, 19);
}

/**
 * Извлекает первые 4 слова из описания.
 * @param {string} description - Полное описание транзакции.
 * @returns {string} Краткое описание (первые 4 слова).
 */
function getShortDescription(description) {
    return description.split(' ').slice(0, 4).join(' ') + (description.split(' ').length > 4 ? '...' : '');
}

/**
 * Добавляет транзакцию в массив и отображает её в таблице.
 */
function addTransaction() {
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;

    // Создаём объект транзакции
    const transaction = {
        id: transactions.length + 1,
        date: getCurrentDateTime(),
        amount: amount,
        category: category,
        description: description
    };

    // Добавляем в массив
    transactions.push(transaction);

    // Создаём строку таблицы
    const tbody = document.querySelector('#transactionTable tbody');
    const row = document.createElement('tr');
    row.classList.add(amount >= 0 ? 'positive' : 'negative');
    row.dataset.id = transaction.id;
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${getShortDescription(transaction.description)}</td>
        <td><button class="delete-btn" data-id="${transaction.id}">Удалить</button></td>
    `;
    tbody.appendChild(row);

    // Обновляем общую сумму
    calculateTotal();

    // Очищаем форму
    document.getElementById('transactionForm').reset();
}

/**
 * Удаляет транзакцию из массива и таблицы.
 * @param {number} id - Идентификатор транзакции для удаления.
 */
function deleteTransaction(id) {
    // Удаляем из массива
    transactions = transactions.filter(t => t.id !== id);

    // Удаляем строку из таблицы
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) row.remove();

    // Обновляем общую сумму
    calculateTotal();

    // Очищаем блок деталей
    document.getElementById('detailsContent').textContent = 'Выберите транзакцию для просмотра деталей.';
}

/**
 * Вычисляет и отображает общую сумму транзакций.
 */
function calculateTotal() {
    const total = transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2);
    document.getElementById('totalAmount').textContent = total;
}

/**
 * Отображает подробности транзакции в отдельном блоке.
 * @param {number} id - Идентификатор транзакции.
 */
function showTransactionDetails(id) {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
        document.getElementById('detailsContent').textContent = `
            ID: ${transaction.id}
            Дата и время: ${transaction.date}
            Сумма: ${transaction.amount}
            Категория: ${transaction.category}
            Описание: ${transaction.description}
        `.trim();
    }
}

// Обработчик отправки формы
document.getElementById('transactionForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addTransaction();
});

// Делегирование событий для таблицы (удаление и отображение деталей)
document.getElementById('transactionTable').addEventListener('click', (e) => {
    const id = parseInt(e.target.dataset.id);

    // Обработка удаления
    if (e.target.classList.contains('delete-btn')) {
        deleteTransaction(id);
        return;
    }

    // Обработка клика по строке для отображения деталей
    const row = e.target.closest('tr');
    if (row && row.dataset.id) {
        showTransactionDetails(parseInt(row.dataset.id));
    }
});