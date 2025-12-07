## Build front-end assets using Node.js
FROM node:20-alpine AS builder
WORKDIR /app

# Install dependencies separately to leverage Docker layer caching
COPY package*.json ./
RUN npm ci --omit=dev=false

# Copy the rest of the source tree and create the production bundle
COPY . .
RUN npm run build

## Serve the compiled assets with NGINX
FROM nginx:1.27-alpine AS runner

# Remove default NGINX static assets and replace with the Vite build output
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
