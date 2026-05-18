<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ParametreController extends Controller
{
    public function show(string $cle): JsonResponse
    {
        $parametre = \App\Models\Parametre::where('cle', $cle)->first();

        if (!$parametre) {
            return response()->json([
                'success' => false,
                'message' => 'Paramètre non trouvé.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'cle' => $parametre->cle,
                'valeur' => $parametre->valeur,
                'type' => $parametre->type,
            ],
        ]);
    }

    public function update(Request $request, string $cle): JsonResponse
    {
        $parametre = \App\Models\Parametre::where('cle', $cle)->first();

        if (!$parametre) {
            return response()->json([
                'success' => false,
                'message' => 'Paramètre non trouvé.',
            ], 404);
        }

        $parametre->update(['valeur' => $request->input('valeur')]);

        return response()->json([
            'success' => true,
            'message' => 'Paramètre mis à jour.',
            'data' => $parametre,
        ]);
    }
}