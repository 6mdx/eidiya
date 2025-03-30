FROM oven/bun:latest as base

# Install dependencies only when needed
FROM base as deps

WORKDIR /app

# Copy package.json and other dependency files
COPY package.json bun.lock* ./
# Install dependencies
RUN bun install

# Rebuild the source code only when needed
FROM base as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN bun run production:build


# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder ./app/.output ./

EXPOSE 3000

ENV PORT 3000

# Start the application
CMD HOSTNAME=0.0.0.0 bun run server/index.mjs
