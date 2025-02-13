import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat); // 確保 dayjs 能解析時間格式

/**
 * 生成時間區間的函式。
 *
 * @param {string} startTime - 起始時間，格式為 "HH:mm"（預設為 "9:00"）。
 * @param {string} endTime - 結束時間，格式為 "HH:mm"（預設為 "18:00"）。
 * @param {number} intervalMinutes - 每個時間區間的間隔分鐘數（預設為 30 分鐘）。
 * @returns {string[]} 返回一個包含所有時間區間的陣列，格式為 "HH:mm"。 ["9:00", "9:30", ..., "18:00"]
 */
function generateTimeSlots(
  startTime: string = '9:00',
  endTime: string = '18:00',
  intervalMinutes: number = 30
): string[] {
  const timeSlots = [];

  let currentTime = dayjs(startTime, 'HH:mm');
  const endTimeObj = dayjs(endTime, 'HH:mm');

  while (currentTime.isBefore(endTimeObj) || currentTime.isSame(endTimeObj)) {
    timeSlots.push(currentTime.format('HH:mm'));
    currentTime = currentTime.add(intervalMinutes, 'minute');
  }
  return timeSlots;
}

/**
 * 格式化日期函式
 * @param {string | Date} date - 要格式化的日期，可能是 Date 物件或字串（例如 '2025-02-01'、'2025/02/01'）。
 * @param {string} format - 預期的日期格式，例如 'YYYY-MM-DD'。
 * @returns {string} - 格式化後的日期字串，若無法解析則回傳空字串。
 */

function formatDate(date: string | Date = new Date(), format: string = 'YYYY/MM/DD'): string {
  const dateObj = dayjs(date);
  if (!dateObj.isValid()) return '';
  return dateObj.format(format);
}

/**
 * 調整日期（加減天數）
 * @param {string | Date} date - 要調整的日期，可能是 Date 物件或字串（例如 '2025-02-01'、'2025/02/01'）。
 * @param {number} days - 要加減的天數，例如 +60（增加 60 天）或 -60（減少 60 天）。
 * @param {string} format - 預期的回傳格式，例如 'YYYY-MM-DD'（預設）。
 * @returns {string} - 調整後的日期字串，若無法解析則回傳空字串。
 */
function adjustDate(date: string | Date = new Date(), days: number = 0, format: string = 'YYYY/MM/DD'): string {
  const dateObj = dayjs(date);
  if (!dateObj.isValid()) return '';
  return dateObj.add(days, 'day').format(format);
}

export { generateTimeSlots, formatDate, adjustDate };
