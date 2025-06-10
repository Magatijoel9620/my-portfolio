FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy app code
COPY frontend/ .

# Build the app (if needed)
RUN npm run build

# Start the app (adjust for Next.js or your framework)
CMD ["npm", "run", "start"]
