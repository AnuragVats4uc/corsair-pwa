# Install dependencies
FROM node:16.13.1-alpine3.13 AS deps
ARG NPM_TOKEN
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./

#Generate .npmrc file
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > /app/.npmrc
RUN yarn install --frozen-lockfile
RUN rm -f /app/.npmrc

# Rebuild the source code only when needed
FROM node:16.13.1-alpine3.13 AS pre-build
ARG API_GATEWAY_URL
ARG NEXT_PUBLIC_API_GATEWAY_URL=$API_GATEWAY_URL
ARG BACKEND_HEADER
ARG BASE_STORE_CODE
ARG ENVIRONMENT

WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
COPY .env.template .env
RUN yarn patch-package
#Replace API_GATEWAY_URL from .env file
RUN sed -i 's~^API_GATEWAY_URL=.*~API_GATEWAY_URL='${API_GATEWAY_URL}'~g' .env
RUN sed -i 's~^NEXT_PUBLIC_X_PYLOT_BACKEND=.*~NEXT_PUBLIC_X_PYLOT_BACKEND='${BACKEND_HEADER}'~g' .env
RUN sed -i 's~^NEXT_PUBLIC_ENVIRONMENT=.*~NEXT_PUBLIC_ENVIRONMENT='${ENVIRONMENT}'~g' .env
RUN sed -i 's~^NEXT_PUBLIC_STORE_CODE=.*~NEXT_PUBLIC_STORE_CODE='${BASE_STORE_CODE}'~g' .env
RUN yarn build

# Production image, copy all the files and run next
FROM node:16.13.1-alpine3.13 AS build
WORKDIR /app

ENV NODE_ENV production

COPY --from=pre-build /app/next.config.js ./
COPY --from=pre-build /app/next-i18next.config.js ./
COPY --from=pre-build /app/next-i18next-backend.js ./
COPY --from=pre-build /app/localesConfig.js ./
COPY --from=pre-build /app/public ./public
COPY --from=pre-build /app/.next ./.next
COPY --from=pre-build /app/node_modules ./node_modules
COPY --from=pre-build /app/package.json ./package.json
COPY --from=pre-build /app/.env ./.env

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app/.next
USER nextjs

EXPOSE 3000

RUN npx next telemetry disable

CMD ["yarn", "start"]

