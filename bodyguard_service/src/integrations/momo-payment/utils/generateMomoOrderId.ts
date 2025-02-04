import { randomUUID } from "crypto";

/**
 * Tạo momoOrderId đảm bảo phù hợp với định dạng regex.
 * Regex yêu cầu: ^[0-9a-zA-Z]+([-_.:]+[0-9a-zA-Z]+)*$
 * 
 * @param transactionId - ID giao dịch cần kết hợp.
 * @returns momoOrderId hợp lệ.
 */
export function generateMomoOrderId(transactionId: string): string {
  // Lấy UUID ngắn gọn và đảm bảo phù hợp với regex
  const uniquePart = randomUUID().replace(/[^0-9a-zA-Z]/g, ''); // Loại bỏ ký tự không hợp lệ
  return `${transactionId}-${uniquePart}`; // Kết hợp transactionId với uniquePart
}

