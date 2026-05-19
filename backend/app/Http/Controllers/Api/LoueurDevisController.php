<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\LoueurDevi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class LoueurDevisController extends Controller
{
    /**
     * Crée un nouveau devis loueur de véhicule.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'raison_sociale' => ['nullable', 'string', 'max:255'],
            'demarrage' => ['nullable', Rule::in(['OUI', 'NON'])],
            'assure' => ['nullable', Rule::in(['OUI', 'NON'])],
            'ancienne' => ['nullable', Rule::in(['OUI', 'NON'])],
            'motif_resiliation' => ['nullable', 'string', 'in:Sinistre,Non paiement,Amiable,Échéance'],
            'email' => ['nullable', 'email', 'max:255'],
            'telephone' => ['nullable', 'string', 'regex:/^0[1-9][0-9]{8}$/'],
        ], [
            'nom.required' => 'Le nom est obligatoire.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'email.email' => 'Veuillez saisir un email valide.',
            'telephone.regex' => 'Le numéro de téléphone est invalide.',
        ]
        );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors(),
            ], 422);
        }

        $loueurDevis = LoueurDevi::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Votre demande de devis loueur a bien été enregistrée.',
            'data' => $loueurDevis,
        ], 201);
    }

    /**
     * Affiche un devis loueur spécifique.
     */
    public function show(string $id): JsonResponse
    {
        $loueurDevis = LoueurDevi::with('reponses')->find($id);

        if (!$loueurDevis) {
            return response()->json([
                'success' => false,
                'message' => 'Devis non trouvé.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $loueurDevis,
        ]);
    }

    /**
     * Met à jour un devis loueur.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $loueurDevis = LoueurDevi::find($id);

        if (!$loueurDevis) {
            return response()->json([
                'success' => false,
                'message' => 'Devis non trouvé.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'notes' => ['sometimes', 'nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $loueurDevis->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Devis mis à jour.',
            'data' => $loueurDevis,
        ]);
    }
}
