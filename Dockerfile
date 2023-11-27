# Etapa de compilación
FROM node:latest as build-stage
WORKDIR /app
COPY package.json /app/
RUN yarn install
COPY ./ /app/
RUN yarn run build

# Etapa de ejecución
FROM nginx:stable-alpine
COPY --from=build-stage /app/dist/frontend-bbdd /usr/share/nginx/html
# COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/default.conf
# Si tienes una configuración personalizada de Nginx, descomenta la siguiente línea
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
