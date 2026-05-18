<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

#[Fillable([
    'nom',
    'prenom',
    'raison_sociale',
    'demarrage',
    'assure',
    'ancienne',
    'motif_resiliation',
    'email',
    'telephone',
    'statut',
    'notes',
])]
class LoueurDevi extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'loueur_devis';

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
        'deleted_at' => 'datetime',
    ];

    /**
     * Les réponses de devis associées.
     */
    public function reponses(): HasMany
    {
        return $this->hasMany(LoueurDeviReponse::class, 'loueur_devis_id');
    }
}
