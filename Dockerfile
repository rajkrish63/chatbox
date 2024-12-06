# Use Node.js version 16
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the remaining app files
COPY . .

# Expose the application's port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
