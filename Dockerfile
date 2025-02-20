# Use the official Node.js 22.x image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before other files for caching
COPY package.json package-lock.json ./

# Install all dependencies (production & dev)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Prune dev dependencies to reduce image size
RUN npm prune --production

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
