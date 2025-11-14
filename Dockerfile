# Dockerfile
FROM php:8.3-apache

COPY php/ /var/www/html/

RUN chmod -R u+rwX,g+rX,o+rX /var/www/html
