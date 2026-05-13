<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['cle', 'valeur', 'type'])]
class Parametre extends Model
{
    use HasFactory;

    protected $table = 'parametres';

    public $timestamps = true;

    protected $primaryKey = 'id';

    /**
     * Récupérer une valeur de paramètre par sa clé.
     */
    public static function valeur(string $cle, mixed $defaut = null): mixed
    {
        $parametre = static::where('cle', $cle)->first();

        if (!$parametre) {
            return $defaut;
        }

        return match ($parametre->type) {
            'json' => json_decode($parametre->valeur, true),
            'integer' => (int) $parametre->valeur,
            'float' => (float) $parametre->valeur,
            'boolean' => (bool) $parametre->valeur,
            default => $parametre->valeur,
        };
    }
}