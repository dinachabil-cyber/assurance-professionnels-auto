<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LoueurDevi extends Model
{
    use HasFactory;

    protected $table = 'loueur_devis';

    /**
     * Les réponses de devis associées.
     */
    public function reponses(): HasMany
    {
        return $this->hasMany(LoueurDeviReponse::class, 'loueur_devis_id');
    }
}
