<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;

// Rate limiters
RateLimiter::for('api', function (Illuminate\Http\Request $request) {
    return Limit::perMinute(60)->by($request->ip());
});

RateLimiter::for('devis', function (Illuminate\Http\Request $request) {
    return Limit::perHour(10)->by($request->ip());
});

// API v1 routes
Route::prefix('v1')->group(function () {
    Route::middleware('throttle:api')->group(function () {
        Route::get('site/info', [\App\Http\Controllers\Api\SiteController::class, 'info']);
        Route::get('site/recherche', [\App\Http\Controllers\Api\SiteController::class, 'recherche']);
        Route::get('parametres/{cle}', [\App\Http\Controllers\Api\ParametreController::class, 'show']);
        Route::put('parametres/{cle}', [\App\Http\Controllers\Api\ParametreController::class, 'update']);
        Route::get('statistiques', [\App\Http\Controllers\Api\StatistiquesController::class, 'index']);
    });

    Route::prefix('devis')->group(function () {
        Route::middleware('throttle:devis')->group(function () {
            Route::get('/', [\App\Http\Controllers\Api\DevisController::class, 'index']);
            Route::post('/', [\App\Http\Controllers\Api\DevisController::class, 'store']);
            Route::get('/{id}', [\App\Http\Controllers\Api\DevisController::class, 'show']);
            Route::put('/{id}', [\App\Http\Controllers\Api\DevisController::class, 'update']);
            Route::delete('/{id}', [\App\Http\Controllers\Api\DevisController::class, 'destroy']);
        });
    });
});

