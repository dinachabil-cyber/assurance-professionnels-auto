<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'nom', 'prenom', 'raison_sociale', 'demarrage',
    'assure', 'ancienne', 'motif_resiliation', 'email', 'telephone',
])]
class GarageDevi extends Model
{
    use HasFactory;
    protected $table = 'garage_devis';
    const UPDATED_AT = null;

    public function reponses(): HasMany
    {
        return $this->hasMany(GarageDeviReponse::class, 'garage_devis_id');
    }
}
