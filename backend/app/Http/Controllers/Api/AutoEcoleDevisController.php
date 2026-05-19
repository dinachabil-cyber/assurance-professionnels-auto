<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AutoEcoleDevi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AutoEcoleDevisController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nom'              => ['required', 'string', 'max:255'],
            'prenom'           => ['required', 'string', 'max:255'],
            'raison_sociale'   => ['nullable', 'string', 'max:255'],
            'demarrage'        => ['nullable', Rule::in(['OUI', 'NON'])],
            'assure'           => ['nullable', Rule::in(['OUI', 'NON'])],
            'ancienne'         => ['nullable', Rule::in(['OUI', 'NON'])],
            'motif_resiliation'=> ['nullable', 'string', 'in:Sinistre,Non paiement,Amiable,Echéance'],
            'email'            => ['nullable', 'email', 'max:255'],
            'telephone'        => ['nullable', 'string', 'regex:/^0[1-9][0-9]{8}$/'],
        ], [
            'nom.required'    => 'Le nom est obligatoire.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'email.email'     => 'Veuillez saisir un email valide.',
            'telephone.regex' => 'Le numéro de téléphone est invalide.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false, 'message' => 'Erreur de validation', 'errors' => $validator->errors(),
            ], 422);
        }

        $autoEcoleDevis = AutoEcoleDevi::create($validator->validated());

        return response()->json([
            'success' => true, 'message' => 'Votre demande de devis auto-école a bien été enregistrée.', 'data' => $autoEcoleDevis,
        ], 201);
    }

    public function show(int $id): JsonResponse
    {
        $devis = AutoEcoleDevi::findOrFail($id);
        return response()->json(['success' => true, 'data' => $devis]);
    }

    public function update(Request $request, int $id): JsonResponse
    {
        $devis = AutoEcoleDevi::findOrFail($id);
        $devis->update($request->only(['statut', 'notes']));
        return response()->json(['success' => true, 'data' => $devis]);
    }
}