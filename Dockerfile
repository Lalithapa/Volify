# Use Node 20 (graphql-ws requires >= node 20)
FROM node:20-alpine

# Debug: show versions during build (remove later if you want)
RUN node -v && npm -v

# Set working directory
WORKDIR /app

# Copy everything
COPY . .

# Set production mode
ENV NODE_ENV=production

# Install ONLY production deps
RUN npm install --omit=dev

# Remove Shopify CLI packages (not needed in production)
RUN npm remove @shopify/app @shopify/cli || true

# Build the Shopify Remix app
RUN npm run build

# Remove local dev database (only for SQLite-based dev setups)
RUN rm -f prisma/dev.sqlite || true

# Expose the port your app runs on
EXPOSE 3000

# Start command for production
CMD ["npm", "run", "docker-start"]
