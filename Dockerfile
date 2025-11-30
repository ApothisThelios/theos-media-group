# Use a lightweight Node image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --production=false

# Copy the rest of the source code
COPY . .

# Build the frontend (Vite React app)
RUN npm run build

# Environment
ENV NODE_ENV=production
ENV PORT=8080

# Cloud Run listens on 8080
EXPOSE 8080

# Start the app (server.js should use PORT)
CMD ["npm", "start"]
