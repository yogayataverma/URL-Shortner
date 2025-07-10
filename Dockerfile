# --- build stage ---
    FROM node:20-bookworm AS builder
    WORKDIR /app
    COPY package*.json ./
    RUN npm ci --omit=dev
    COPY . .
    RUN npm run build
    
    # --- production stage ---
    FROM node:20-slim
    WORKDIR /app
    ENV NODE_ENV=production
    COPY --from=builder /app/dist ./dist
    COPY --from=builder /app/node_modules ./node_modules
    COPY .env.example .env
    CMD ["node", "dist/main.js"]
    