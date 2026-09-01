FROM node:22-bookworm-slim AS dependencies
WORKDIR /app
COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY apps/khadamat-gostar-admin/package.json apps/khadamat-gostar-admin/package.json
COPY packages ./packages
RUN npm ci --ignore-scripts

FROM dependencies AS builder
ARG APP
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build --workspace=${APP}

FROM node:22-bookworm-slim AS runner
ARG APP
WORKDIR /app
ENV APP=${APP}
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
COPY --from=builder /app/apps/${APP}/.next/standalone ./
COPY --from=builder /app/apps/${APP}/public ./apps/${APP}/public
COPY --from=builder /app/apps/${APP}/.next/static ./apps/${APP}/.next/static
USER node
EXPOSE 3000
CMD ["sh", "-c", "node apps/${APP}/server.js"]
