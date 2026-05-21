<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Devi extends Model
{
    use HasFactory;

    protected $table = 'devis';

    /**
     * Les réponses de devis associées.
     */
    public function reponses(): HasMany
    {
        return $this->hasMany(DeviReponse::class, 'devis_id');
    }
}