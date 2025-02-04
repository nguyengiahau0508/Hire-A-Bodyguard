
import { DateTime } from 'luxon';

/**
 * Định dạng thời gian theo múi giờ Việt Nam
 * @param date - Thời gian kiểu Date hoặc string
 * @returns Chuỗi thời gian định dạng dd/MM/yyyy HH:mm:ss
 */
export function formatDateToVn(date: Date | string): string {
  return DateTime.fromJSDate(new Date(date))
    .setZone('Asia/Ho_Chi_Minh')
    .toFormat('HH:mm:ss dd/MM/yyyy');
}

