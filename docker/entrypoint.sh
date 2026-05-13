#!/bin/sh
set -e

echo "=== Starting Assurance Pro Auto ==="

# Run database migrations
echo "Running migrations..."
php artisan migrate --force

# Clear and cache configuration
echo "Caching configuration..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Ensure storage directories exist
mkdir -p /var/www/html/storage/framework/{sessions,views,cache}
mkdir -p /var/www/html/storage/logs
chown -R www-data:www-data /var/www/html/storage

# Start supervisor (nginx + php-fpm managed via supervisord, or just php-fpm)
echo "Starting PHP-FPM and Nginx..."

# Start PHP-FPM in background
php-fpm -D

# Start Nginx in foreground
exec nginx -g 'daemon off;'