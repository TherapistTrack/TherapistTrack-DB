# Use the official MongoDB image from the Docker Hub
FROM mongo

# Set environment variables
ENV MONGO_INITDB_ROOT_USERNAME=${DB_ADMIN_USER}
ENV MONGO_INITDB_ROOT_PASSWORD=${DB_ADMIN_PASSWORD}
ENV MONGO_INITDB_DATABASE=${DB_NAME}
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_USER_PASSWORD=${DB_USER_PASSWORD}

# Copy initialization scripts into the container
COPY ./scripts /docker-entrypoint-initdb.d/

# Expose the MongoDB port
EXPOSE 27017

# Command to run the MongoDB server
CMD ["mongod"]