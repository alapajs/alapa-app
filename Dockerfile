# Use the official Node.js full image (Debian-based)
FROM node:24

# Copy package.json files and other project files to the container
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Run migrations
RUN npm run migration:generate
RUN npm run migration:run


# Set environment variables
ENV NODE_ENV=production

# Expose the port that the app runs on
EXPOSE ${PORT}

# Start the application
CMD ["npm", "start"]
