import { getRandomActivity } from './activity.js';

/**
 * Обновляет текст активности на странице.
 * @async
 * @param {string} activity - Текст активности для отображения.
 */
async function updateActivity(activity) {
    const activityElement = document.getElementById('activity');
    activityElement.textContent = activity;
    activityElement.classList.toggle('error', activity.includes('ошибка'));
}

/**
 * Запускает периодическое обновление активности.
 * @async
 */
async function startActivityUpdates() {
    const activity = await getRandomActivity();
    await updateActivity(activity);
    // Планируем следующее обновление через 60 секунд
    setTimeout(startActivityUpdates, 60 * 1000);
}

// Запускаем приложение немедленно и устанавливаем цикл обновлений
startActivityUpdates();