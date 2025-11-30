# Use a lightweight Node image
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the frontend (Vite or React build)
RUN npm run build

# Cloud Run uses PORT env var
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start your server
CMD ["npm", "start"]

fix: add full Dockerfile for Cloud Run deployment

