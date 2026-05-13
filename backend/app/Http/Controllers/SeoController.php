<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\View\View;

class SeoController extends Controller
{
    /**
     * Génère le JSON-LD structuré dynamiquement.
     */
    public function schema(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'InsuranceAgency',
            'name' => 'Aksam Assurance',
            'url' => url('/'),
            'logo' => asset('image/logo.png'),
            'image' => asset('image/og-image.jpg'),
            'telephone' => '+33182834800',
            'priceRange' => '€€',
            'description' => 'Spécialiste de l\'assurance des professionnels de l\'automobile.',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '10 rue de Penthièvre',
                'addressLocality' => 'Paris',
                'addressRegion' => 'Île-de-France',
                'postalCode' => '75008',
                'addressCountry' => 'FR',
            ],
            'openingHoursSpecification' => [
                [
                    '@type' => 'OpeningHoursSpecification',
                    'dayOfWeek' => ['Monday','Tuesday','Wednesday','Thursday','Friday'],
                    'opens' => '09:00',
                    'closes' => '18:00',
                ],
            ],
            'areaServed' => 'France',
            'contactPoint' => [
                '@type' => 'ContactPoint',
                'telephone' => '+33182834800',
                'contactType' => 'Customer service',
                'availableLanguage' => ['French', 'English'],
            ],
        ];
    }
}