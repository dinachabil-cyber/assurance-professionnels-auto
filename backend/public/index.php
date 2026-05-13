<?php
// In production, nginx serves the built frontend from /frontend/
// In development, Vite dev server handles everything.
// This file is only a fallback for non-Vite setups.
if (getenv('APP_ENV') !== 'production') {
    // Dev: redirect to Vite dev server
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    header('HTTP/1.1 302 Temporary Redirect');
    header('Location: http://host.docker.internal:3000' . $uri);
    exit;
}

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';
$app->handleRequest(\Illuminate\Http\Request::capture());