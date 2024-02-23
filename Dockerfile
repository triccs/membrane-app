FROM node:14-alpine AS builder
ENV NODE_ENV production

# Add a work directory
WORKDIR /app

# Cache and Install dependencies
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm i

# Copy app files
COPY . .

# Build the app
RUN npm run build

# Expose port
EXPOSE 3000
