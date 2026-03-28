# ═══════════════════════════════════════════════════════════════
# Qualidoc - Frontend
# Angular 19 + Nginx
# ═══════════════════════════════════════════════════════════════

# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ENV NODE_OPTIONS=--max-old-space-size=4096
RUN npm run build -- --configuration=production

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

COPY --from=build /app/dist/kiss-drive/browser /usr/share/nginx/html

ENV BACKEND_URL=http://qualidoc-backend:8081

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
