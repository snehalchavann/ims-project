FROM node:20-alpine as build

WORKDIR /app
COPY ims-frontend/ ./

RUN npm install && npm run build

FROM nginx:alpine

COPY --from=build /app/dist/ims-frontend/browser /usr/share/nginx/html
COPY ims-frontend/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
