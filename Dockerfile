# =============================================================================
# Frontend - React + Vite
# =============================================================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci --ignore-scripts

COPY frontend/ .
RUN npm run build

# =============================================================================
# Backend - Laravel
# =============================================================================
FROM php:8.3-fpm-alpine AS backend

# System dependencies
RUN apk add --no-cache \
    nginx \
    curl \
    libpng-dev \
    libzip-dev \
    zip \
    unzip \
    oniguruma-dev \
    && docker-php-ext-install pdo pdo_mysql zip

# PHP extensions
RUN docker-php-ext-install mbstring exif pcntl bcmath opcache

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy backend code
COPY backend/ .

# Copy built frontend
COPY --from=frontend-builder /app/backend/public/frontend /var/www/html/public/frontend

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Nginx config
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Entrypoint
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]