FROM mongo:latest

RUN mkdir -p /data/db
COPY db /data/db

EXPOSE 27017