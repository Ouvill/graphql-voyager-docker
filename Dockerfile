FROM node:alpine as build

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm ci

ADD . .
RUN npm run build

FROM node:alpine as prod
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json /app/package-lock.json ./
CMD npm run start

EXPOSE 80
