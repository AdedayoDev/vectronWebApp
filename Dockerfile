# Use the latest stable Node.js image as base
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if present) to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the Next.js application (with TypeScript)
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
