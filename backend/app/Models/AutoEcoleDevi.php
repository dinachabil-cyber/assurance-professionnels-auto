<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'nom', 'prenom', 'raison_sociale', 'demarrage', 'assure',
    'ancienne', 'motif_resiliation', 'email', 'telephone',
])]
class AutoEcoleDevi extends Model
{
    use HasFactory;
    protected $table = 'auto_ecole_devis';

    public function reponses(): HasMany
    {
        return $this->hasMany(AutoEcoleDeviReponse::class, 'auto_ecole_devis_id');
    }
}