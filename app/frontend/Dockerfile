FROM node:8.17-alpine as build
WORKDIR /usr/src/app
COPY . .
RUN npm ci
# RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]