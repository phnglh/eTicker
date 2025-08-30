FROM node:22-alpine AS base

RUN npm install -g pnpm

FROM base AS development
WORKDIR /app
RUN chown -R node:node /app

COPY --chown=node:node package*.json pnpm-lock.yaml ./

RUN pnpm install

COPY --chown=node:node  . .

USER node
