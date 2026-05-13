<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Devi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class StatistiquesController extends Controller
{
    /**
     * Statistiques globales du site.
     */
    public function index(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'total_devis' => Devi::count(),
                'devis_nouveaux' => Devi::where('statut', 'nouveau')->count(),
                'devis_en_cours' => Devi::where('statut', 'en_cours')->count(),
                'devis_traites' => Devi::count(),
                'devis_acceptes' => Devi::where('statut', 'accepte')->count(),
                'tendance_semaine' => $this->tendanceSemaine(),
            ],
        ]);
    }

    /**
     * Tendance des demandes sur les 7 derniers jours.
     */
    private function tendanceSemaine(): array
    {
        $result = [];
        for ($i = 6; $i >= 0; $i--) {
            $date = now()->subDays($i);
            $result[] = [
                'date' => $date->toDateString(),
                'label' => $date->isoFormat('ddd DD'),
                'count' => Devi::whereDate('created_at', $date->toDateString())->count(),
            ];
        }
        return $result;
    }
}