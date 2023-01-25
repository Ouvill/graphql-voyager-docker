FROM node:lts-slim as build

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

ADD . .
RUN npm run build

FROM node:lts-slim as prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm ci --production
CMD npm run start

EXPOSE 80
