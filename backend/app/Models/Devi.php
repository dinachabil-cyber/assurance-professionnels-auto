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
    'activite',
    'demarrage',
    'assure',
    'ancienne',
    'motif_resiliation',
    'code_postal',
    'email',
    'telephone',
])]
class Devi extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'devis';

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
        return $this->hasMany(DeviReponse::class, 'devis_id');
    }
}