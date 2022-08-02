FROM node:14.19.3
COPY ./ /app
WORKDIR /app
RUN npm config set registry="https://registry.npmjs.org"
RUN npm config set metrics-registry="https://registry.npmjs.org"
RUN npm install
RUN npm run build

FROM nginx
COPY --from=0 /app/dist /app
COPY --from=0 /app/nginx.conf /etc/nginx/nginx.conf