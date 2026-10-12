# Stage 1: build the Vite app
FROM node:20-alpine AS build
WORKDIR /app
COPY LostFoundPortal/package*.json ./
RUN npm ci
COPY LostFoundPortal/ .
RUN npm run build

# Stage 2: serve the built files with nginx
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80