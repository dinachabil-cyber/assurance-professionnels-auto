<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Page d'accueil SPA
Route::get('/devis', function () {
    return view('welcome');
});

// Pages légales SPA
Route::get('/mentions-legales', function () {
    return view('welcome');
});

Route::get('/politique-confidentialite', function () {
    return view('welcome');
});