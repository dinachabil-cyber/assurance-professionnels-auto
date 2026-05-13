@extends('layouts.app')

@section('title', 'Politique de confidentialité - Aksam Assurance')
@section('description', 'Découvrez comment AKSAM ASSURANCES collecte, utilise et protège vos données personnelles conformément au RGPD.')

@section('content')
<div class="max-w-4xl mx-auto px-4 py-12">
    <div class="prose prose-lg max-w-none mx-auto">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Politique de confidentialité</h1>

        <section class="mb-8">
            <p class="text-gray-600 leading-relaxed">
                Ce document explique, de façon claire et transparente, comment nous utilisons et traitons vos données
                personnelles, pour que vous puissiez comprendre facilement notre démarche.
            </p>
        </section>

        <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Identité du responsable de traitement</h2>
            <p class="text-gray-600 leading-relaxed">
                Le responsable des traitements est la société <strong>AKSAM ASSURANCES SARL</strong>,
                au capital de 10 000 €, immatriculée au RCS de Paris sous le n°840 653 463,
                dont le siège social est situé 10 Rue de Penthièvre, 75008 Paris.
            </p>
        </section>

        <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Données collectées</h2>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
                <li>Données d'identification via nos formulaires</li>
                <li>Données de connexion (adresses IP, logs)</li>
                <li>Données relatives au suivi de la relation commerciale</li>
                <li>Données relatives aux moyens de paiement</li>
                <li>Données relatives à la souscription de contrats</li>
            </ul>
        </section>

        <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Finalités des traitements</h2>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
                <li>Le bon fonctionnement et l'amélioration du site</li>
                <li>La gestion de nos opérations de prospection</li>
                <li>L'élaboration et la délivrance de devis</li>
                <li>La passation et la gestion des contrats d'assurance</li>
                <li>L'élaboration de statistiques</li>
            </ul>
        </section>

        <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Durée de conservation</h2>
            <p class="text-gray-600 leading-relaxed">
                Vos données sont conservées uniquement pendant la durée nécessaire à la finalité du traitement,
                conformément aux obligations légales (entre 5 et 30 ans selon la nature du document).
            </p>
        </section>

        <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Sécurité</h2>
            <p class="text-gray-600 leading-relaxed">
                Nous prenons les précautions utiles pour préserver la sécurité des données et empêcher
                que des tiers non autorisés y aient accès. Toutes les données communiquées via nos
                formulaires en ligne sont cryptées grâce au certificat SSL.
            </p>
        </section>

        <section class="mb-8">
            <h2 class="text-xl font-semibold text-gray-800 mb-3">Vos droits</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
                Conformément à la loi n°78-17 et au RGPD, vous disposez d'un droit d'accès, de rectification,
                de mise à jour, de verrouillage ou d'effacement de vos données personnelles.
            </p>
            <p class="text-gray-600 leading-relaxed">
                Contact :
                <a href="mailto:contact@aksam-assurances.fr" class="text-brand-600 hover:underline">
                    contact@aksam-assurances.fr
                </a>
                ou par courrier à AKSAM ASSURANCES — 10 rue de Penthièvre 75008 Paris.
            </p>
        </section>
    </div>
</div>
@endsection