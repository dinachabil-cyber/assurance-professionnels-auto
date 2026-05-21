<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable([
    'nom', 'prenom', 'raison_sociale', 'activite', 'demarrage',
    'assure', 'ancienne', 'motif_resiliation', 'code_postal', 'email', 'telephone',
])]
class Devi extends Model
{
    use HasFactory;

    protected $table = 'devis';
    public $timestamps = true;
    const UPDATED_AT = null;

    public function reponses(): HasMany
    {
        return $this->hasMany(DeviReponse::class, 'devis_id');
    }
}