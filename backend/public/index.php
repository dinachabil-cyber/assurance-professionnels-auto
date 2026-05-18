<?php
if (getenv('APP_ENV') !== 'production') {
    $uri = $_SERVER['REQUEST_URI'] ?? '/';
    if (!str_starts_with($uri, '/api/')) {
        header('HTTP/1.1 302 Temporary Redirect');
        header('Location: http://host.docker.internal:3000' . $uri);
        exit;
    }
}

define('LARAVEL_START', microtime(true));

if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance;
}

require __DIR__.'/../vendor/autoload.php';

$app = require_once __DIR__.'/../bootstrap/app.php';

$kernel = $app->make(\Illuminate\Contracts\Http\Kernel::class);

$response = $kernel->handle(
    $request = \Illuminate\Http\Request::capture()
);

$response->send();

$kernel->terminate($request, $response);