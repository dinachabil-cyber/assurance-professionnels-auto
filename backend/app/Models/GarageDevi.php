<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GarageDevi extends Model
{
    use HasFactory;

    protected $table = 'garage_devis';

    /**
     * Les répondes de devis associées.
     */
    public function reponses(): HasMany
    {
        return $this->hasMany(GarageDeviReponse::class, 'garage_devis_id');
    }
}
