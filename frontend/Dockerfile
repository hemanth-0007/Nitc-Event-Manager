# Build Stage
FROM node:18-alpine as builder
WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

# Production Stage
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]