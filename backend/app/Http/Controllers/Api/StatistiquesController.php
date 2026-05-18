<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class StatistiquesController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_devis' => 0,
                'devis_en_cours' => 0,
                'devis_traités' => 0,
            ],
        ]);
    }
}