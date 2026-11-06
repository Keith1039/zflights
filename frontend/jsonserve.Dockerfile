FROM node:22-alpine

WORKDIR /app

# Install json-server
RUN npm install -g json-server

# Copy database file
COPY data/db.json ./data/db.json

# Expose json-server port
EXPOSE 3000

# Start json-server
CMD ["json-server", "--watch", "data/db.json", "--host", "0.0.0.0", "--port", "3000"]