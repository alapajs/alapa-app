# Use the official Node.js full image (Debian-based)
FROM node:23

# Copy package.json files and other project files to the container
COPY package*.json ./
COPY . .

# Install dependencies
RUN npm install

# Run migrations
RUN npm run migration:generate
RUN npm run migration:run

ENV NODE_ENV=production
# Build the application
RUN npm run build

# Set environment variables


# Expose the port that the app runs on
EXPOSE ${PORT}

# Start the application
CMD ["npm", "start"]
