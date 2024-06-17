# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY ./src ./src

# Build the Next.js application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine AS runner

# Set the working directory inside the container
WORKDIR /app

# Install 'serve' to serve the built application
RUN npm install -g serve

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# If your app uses environment variables, you can set them here
ENV NEXT_PUBLIC_API_URL=https://demo.lionsentry.com

# Expose the port that the application will run on
EXPOSE 3000

# Run the application using 'serve'
CMD ["serve", "-s", "public", "-l", "3000"]
