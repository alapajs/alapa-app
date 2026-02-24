FROM node:24-alpine

# Use a non-root user for security
USER node

# Set working directory
WORKDIR /home/node/app

# Copy package.json files and other project files to the container
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install

COPY --chown=node:node . .

ENV DEV_SERVER_PORT=35730
ENV PORT=3000
ENV NODE_ENV=production
ENV APP_NAME=alapa-app
ENV HOST=localhost
ENV APP_URL=http://localhost
# Build the application
RUN npm run build

# Run migrations
#RUN npm run migration:generate
#RUN npm run migration:run

# Expose the port that the app runs on
EXPOSE ${PORT}

# Start the application
CMD ["npm", "start"]