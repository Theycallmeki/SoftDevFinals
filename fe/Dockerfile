# Step 1: Build React app
FROM node:18 AS build

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build production files
RUN npm run build

# Step 2: Use nginx to serve static build
FROM nginx:alpine

# Copy custom nginx config (important for React routes)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built files from previous stage
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80 (nginx listens here)
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
