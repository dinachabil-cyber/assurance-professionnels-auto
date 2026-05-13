<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'devis_id',
    'compagnie',
    'type_garantie',
    'prime_annuelle',
    'prime_mensuelle',
    'franchise',
    'delai_carence_mois',
    'garanties',
    'conditions_particulieres',
])]
class DeviReponse extends Model
{
    use HasFactory;

    protected $table = 'devis_reponses';

    protected $casts = [
        'prime_annuelle' => 'decimal:2',
        'prime_mensuelle' => 'decimal:2',
    ];

    /**
     * Le devis parent.
     */
    public function devi(): BelongsTo
    {
        return $this->belongsTo(Devi::class, 'devis_id');
    }
}