# 🏗 STAGE 1: Build Vue App
FROM node:18-alpine AS builder
WORKDIR /app

# Cài đặt dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy toàn bộ code và build ứng dụng Vue 3
COPY . .
RUN npm run build

# 🚀 STAGE 2: Serve với Vite Preview
FROM node:18-alpine AS runner
WORKDIR /app

# Cài đặt Vite Preview
RUN npm install -g vite

# Copy file build từ builder stage
COPY --from=builder /app/dist ./dist

# Mở cổng 4173 (mặc định của Vite Preview)
EXPOSE 5173

# Chạy Vite Preview để phục vụ ứng dụng
CMD ["vite", "preview", "--port", "5173", "--host"]
