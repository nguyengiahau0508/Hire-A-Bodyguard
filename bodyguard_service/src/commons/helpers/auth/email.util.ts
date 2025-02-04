
/**
 * Kiểm tra định dạng email sinh viên
 * @param email - Địa chỉ email cần kiểm tra
 * @returns `true` nếu email hợp lệ, ngược lại `false`
 */
export function isValidStudentEmail(email: string): boolean {
  // Định dạng regex cho email sinh viên
  const studentEmailRegex = /^[0-9]{13}@student\.tdmu\.edu\.vn$/;

  // Kiểm tra email với regex
  return studentEmailRegex.test(email);
}

export function extractStudentId(email: string): string | null {
  const regex = /^(\d+)@student\.tdmu\.edu\.vn$/;
  const match = email.match(regex);
  if (match) {
    return match[1];  // Trả về phần mã số sinh viên (mssv)
  }
  return null;  // Trả về null nếu email không khớp với định dạng
}
