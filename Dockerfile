FROM node:20-slim AS build
WORKDIR /clip-clappy
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM build AS app
ARG dockerport=3000
WORKDIR /clip-clappy
COPY --from=build ./clip-clappy ./
EXPOSE $dockerport
