<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Devi;
use App\Models\Parametre;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SiteController extends Controller
{
    /**
     * Informations du site.
     */
    public function info(): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'nom' => Parametre::valeur('societe_nom', 'Aksam Assurance'),
                'adresse' => Parametre::valeur('societe_adresse', '10 Rue de Penthièvre, 75008 Paris'),
                'telephone' => Parametre::valeur('societe_telephone', '01 82 83 48 00'),
                'email' => Parametre::valeur('societe_email', 'contact@aksam-assurances.fr'),
                'rcs' => Parametre::valeur('societe_rcs', '840 653 463'),
                'activites' => Parametre::valeur('activites', []),
                'faq' => Parametre::valeur('faq_categories', []),
            ],
        ]);
    }

    /**
     * Recherche de devis pour auto-complétion.
     */
    public function recherche(Request $request): JsonResponse
    {
        $term = $request->input('q', '');

        $devis = Devi::when($term, function ($query, $term) {
            $query->where('nom', 'like', "%{$term}%")
                  ->orWhere('prenom', 'like', "%{$term}%")
                  ->orWhere('email', 'like', "%{$term}%")
                  ->orWhere('telephone', 'like', "%{$term}%");
        })
        ->orderBy('created_at', 'desc')
        ->limit(10)
        ->get(['id', 'nom', 'prenom', 'email', 'telephone', 'statut', 'created_at']);

        return response()->json([
            'success' => true,
            'data' => $devis,
        ]);
    }
}