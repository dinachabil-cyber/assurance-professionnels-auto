<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Devi;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class DevisController extends Controller
{
    /**
     * Liste les devis (avec pagination et filtres).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Devi::query()->withCount('reponses');

        // Filtres optionnels
        if ($request->has('statut')) {
            $query->where('statut', $request->input('statut'));
        }

        if ($request->has('recherche')) {
            $recherche = $request->input('recherche');
            $query->where(function ($q) use ($recherche) {
                $q->where('nom', 'like', "%{$recherche}%")
                  ->orWhere('prenom', 'like', "%{$recherche}%")
                  ->orWhere('email', 'like', "%{$recherche}%")
                  ->orWhere('telephone', 'like', "%{$recherche}%");
            });
        }

        $devis = $query->latest()->paginate($request->get('per_page', 15));

        return response()->json([
            'success' => true,
            'data' => $devis->items(),
            'meta' => [
                'total' => $devis->total(),
                'page' => $devis->currentPage(),
                'per_page' => $devis->perPage(),
                'last_page' => $devis->lastPage(),
            ],
        ]);
    }

    /**
     * Crée un nouveau devis (appelé depuis le formulaire React).
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'raison_sociale' => ['nullable', 'string', 'max:255'],
            'activite' => ['nullable', 'string', 'max:255'],
            'demarrage' => ['nullable', Rule::in(['OUI', 'NON'])],
            'assure' => ['nullable', Rule::in(['OUI', 'NON'])],
            'ancienne' => ['nullable', Rule::in(['OUI', 'NON'])],
            'motif_resiliation' => ['nullable', 'string', 'in:Sinistre,Non paiement,Amiable,Echéance'],
            'code_postal' => ['nullable', 'string', 'regex:/^[0-9]{5}$/'],
            'email' => ['nullable', 'email', 'max:255'],
            'telephone' => ['nullable', 'string', 'regex:/^0[1-9][0-9]{8}$/'],
        ], [
            'nom.required' => 'Le nom est obligatoire.',
            'prenom.required' => 'Le prénom est obligatoire.',
            'email.email' => 'Veuillez saisir un email valide.',
            'telephone.regex' => 'Le numéro de téléphone est invalide.',
            'code_postal.regex' => 'Le code postal doit contenir 5 chiffres.',
        ]
        );

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation',
                'errors' => $validator->errors(),
            ], 422);
        }

        $devis = Devi::create($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Votre demande de devis a bien été enregistrée.',
            'data' => $devis,
        ], 201);
    }

    /**
     * Affiche un devis spécifique.
     */
    public function show(string $id): JsonResponse
    {
        $devis = Devi::with('reponses')->find($id);

        if (!$devis) {
            return response()->json([
                'success' => false,
                'message' => 'Devis non trouvé.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $devis,
        ]);
    }

    /**
     * Met à jour un devis.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $devis = Devi::find($id);

        if (!$devis) {
            return response()->json([
                'success' => false,
                'message' => 'Devis non trouvé.',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'statut' => ['sometimes', Rule::in(['nouveau', 'en_cours', 'traite', 'refuse', 'accepte'])],
            'notes' => ['sometimes', 'nullable', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Erreur de validation.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $devis->update($validator->validated());

        return response()->json([
            'success' => true,
            'message' => 'Devis mis à jour.',
            'data' => $devis,
        ]);
    }

    /**
     * Supprime un devis.
     */
    public function destroy(string $id): JsonResponse
    {
        $devis = Devi::find($id);

        if (!$devis) {
            return response()->json([
                'success' => false,
                'message' => 'Devis non trouvé.',
            ], 404);
        }

        $devis->delete();

        return response()->json([
            'success' => true,
            'message' => 'Devis supprimé.',
        ]);
    }
}