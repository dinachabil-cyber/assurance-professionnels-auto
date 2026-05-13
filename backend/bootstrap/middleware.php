<?php

namespace Illuminate\Foundation\Configuration;

return function (Middleware $middleware) {
    $middleware->web(append: [
        \App\Http\Middleware\ApiVersionMiddleware::class,
    ]);

    $middleware->api(append: [
        \Illuminate\Routing\Middleware\SubstituteBindings::class,
    ]);

    $middleware->alias([
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'auth' => \Illuminate\Auth\Middleware\Authenticate::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
    ]);

    // Global CORS for frontend
    $middleware->prepend(\Illuminate\Http\Middleware\HandleCors::class);
};