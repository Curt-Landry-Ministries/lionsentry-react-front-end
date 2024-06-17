# Use the official Node.js 14 image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js is running on (default: 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
