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
    });

    Route::prefix('garage-devis')->middleware('throttle:devis')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\GarageDevisController::class, 'store']);
        Route::get('/{id}', [\App\Http\Controllers\Api\GarageDevisController::class, 'show']);
        Route::put('/{id}', [\App\Http\Controllers\Api\GarageDevisController::class, 'update']);
    });

    Route::prefix('loueur-devis')->middleware('throttle:devis')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\LoueurDevisController::class, 'store']);
        Route::get('/{id}', [\App\Http\Controllers\Api\LoueurDevisController::class, 'show']);
        Route::put('/{id}', [\App\Http\Controllers\Api\LoueurDevisController::class, 'update']);
    });

    Route::prefix('negociants-devis')->middleware('throttle:devis')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\NegociantsDevisController::class, 'store']);
    });

    Route::prefix('auto-ecole-devis')->middleware('throttle:devis')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\AutoEcoleDevisController::class, 'store']);
        Route::get('/{id}', [\App\Http\Controllers\Api\AutoEcoleDevisController::class, 'show']);
        Route::put('/{id}', [\App\Http\Controllers\Api\AutoEcoleDevisController::class, 'update']);
    });
});