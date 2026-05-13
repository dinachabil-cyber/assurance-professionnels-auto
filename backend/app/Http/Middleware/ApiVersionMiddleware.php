<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiVersionMiddleware
{
    public function handle(Request $request, Closure $next, string $version = 'v1'): Response
    {
        $request->headers->set('X-API-Version', $version);
        return $next($request);
    }
}