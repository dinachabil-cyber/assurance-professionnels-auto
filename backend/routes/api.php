<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;

RateLimiter::for('devis', function (Illuminate\Http\Request $request) {
    return Limit::perHour(10)->by($request->ip());
});

Route::prefix('v1')->group(function () {
    Route::prefix('devis')->middleware('throttle:devis')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\DevisController::class, 'index']);
        Route::post('/', [\App\Http\Controllers\Api\DevisController::class, 'store']);
        Route::get('/{id}', [\App\Http\Controllers\Api\DevisController::class, 'show']);
        Route::put('/{id}', [\App\Http\Controllers\Api\DevisController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\DevisController::class, 'destroy']);
    });

    Route::prefix('garage-devis')->middleware('throttle:devis')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\GarageDevisController::class, 'store']);
    });

    Route::prefix('loueur-devis')->middleware('throttle:devis')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\LoueurDevisController::class, 'store']);
    });
});