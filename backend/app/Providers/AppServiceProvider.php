<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // Share global data with all Blade/SPA views
        View::share('societe', [
            'nom' => 'AKSAM ASSURANCES',
            'telephone' => '01 82 83 48 00',
            'email' => 'contact@aksam-assurances.fr',
        ]);
    }
}