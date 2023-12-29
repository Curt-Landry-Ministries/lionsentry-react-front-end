# Use the specified Node.js version as base image
FROM node:18.16.1

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY client/package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY client/ ./

# Run the app using npm
CMD ["npm", "run", "web"]
