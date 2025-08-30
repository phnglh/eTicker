FROM node:22-alpine AS base

RUN npm install -g pnpm

FROM base AS development
