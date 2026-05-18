<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class SiteController extends Controller
{
    public function info(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'nom' => 'AKSAM ASSURANCES',
                'description' => 'Assurance professionnelle automobile',
            ],
        ]);
    }

    public function recherche(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [],
        ]);
    }
}