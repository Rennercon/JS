/**
 * Получает случайную активность с API BoredAPI.
 * @async
 * @returns {Promise<string>} Текст активности или сообщение об ошибке.
 * @throws {Error} Если запрос к API завершился неудачей.
 */
export async function getRandomActivity() {
    try {
        const response = await fetch('http://www.boredapi.com/api/activity/');
        if (!response.ok) {
            throw new Error('Не удалось получить данные с сервера');
        }
        const data = await response.json();
        return data.activity;
    } catch (error) {
        console.error('Ошибка при получении активности:', error);
        return 'К сожалению, произошла ошибка';
    }
}