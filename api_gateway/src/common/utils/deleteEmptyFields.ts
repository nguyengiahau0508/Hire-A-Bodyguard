
export function deleteEmptyFields(obj: any): void {
  // Kiểm tra nếu obj không phải là đối tượng hoặc là null
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && obj[key] === '') {
        delete obj[key]; // Xóa trường nếu giá trị là chuỗi rỗng
      }
    }
  }
}

