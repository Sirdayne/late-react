# Используем Node.js 20.18.0 для совместимости с проектом
FROM node:20.18.0-alpine AS build

RUN echo "ipv6" >> /etc/modules
ENV COREPACK_HOME /var/cache/corepack

RUN set -xe \
  && mkdir /var/cache/corepack \
  && chown 1000:1000 -R /var/cache/corepack \
  && mkdir -p /home/node/.yarn/berry \
  && chown 1000:1000 -R /home/node/.yarn/berry \
  && corepack enable \
  && yarn set version 4.3.0 \
  && yarn config set --home enableTelemetry 0

# Устанавливаем рабочую директорию
WORKDIR /app

# Удаляем Yarn, если он установлен по умолчанию, и активируем Corepack для использования Yarn 4.3.0
RUN rm -rf /usr/local/bin/yarn /usr/local/bin/yarnpkg && \
    corepack enable && \
    corepack prepare yarn@4.3.0 --activate

# Обновляем PATH с активированной версией Yarn
#RUN export PATH="$(yarn bin):/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Проверяем версии для отладки
RUN node -v && npm -v && yarn -v

COPY package.json yarn.lock ./
COPY packages ./packages
COPY games ./games
COPY tools ./tools

COPY . .

RUN rm -rf node_modules

RUN yarn install && yarn run build:plinko

# Используем Nginx для раздачи статических файлов
FROM nginx:alpine
COPY --from=build /app/games/plinko/dist /usr/share/nginx/html

# Настраиваем Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN ls -a /usr/share/nginx/html
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]
