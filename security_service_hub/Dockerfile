# Sử dụng Node.js phiên bản mới
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép package.json và package-lock.json trước
COPY package*.json ./

# Cài đặt dependencies
RUN npm install --only=production

# Sao chép toàn bộ code vào container
COPY . .

# Build dự án
RUN npm run build

# Mở cổng cho service
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "run", "start"]

