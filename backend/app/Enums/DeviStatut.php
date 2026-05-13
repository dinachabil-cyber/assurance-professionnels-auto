<?php

namespace App\Enums;

enum DeviStatut: string
{
    case NOUVEAU = 'nouveau';
    case EN_COURS = 'en_cours';
    case TRAITE = 'traite';
    case REFUSE = 'refuse';
    case ACCEPTE = 'accepte';

    public function label(): string
    {
        return match ($this) {
            self::NOUVEAU => 'Nouveau',
            self::EN_COURS => 'En cours',
            self::TRAITE => 'Traitée',
            self::REFUSE => 'Refusée',
            self::ACCEPTE => 'Acceptée',
        };
    }

    public function badgeClass(): string
    {
        return match ($this) {
            self::NOUVEAU => 'badge-brand',
            self::EN_COURS => 'badge-info',
            self::TRAITE => 'badge-warning',
            self::REFUSE => 'badge-danger',
            self::ACCEPTE => 'badge-success',
        };
    }
}