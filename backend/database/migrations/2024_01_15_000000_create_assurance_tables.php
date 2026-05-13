<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // Table des devis
        Schema::create('devis', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('raison_sociale')->nullable();
            $table->string('activite')->nullable();
            $table->string('demarrage', 3)->nullable();
            $table->string('assure', 3)->nullable();
            $table->string('ancienne', 3)->nullable();
            $table->string('motif_resiliation')->nullable();
            $table->string('code_postal', 10)->nullable();
            $table->string('email')->nullable();
            $table->string('telephone', 20)->nullable();
            $table->string('statut')->default('nouveau');
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['nom', 'prenom']);
            $table->index('email');
            $table->index('statut');
            $table->index('created_at');
        });

        // Table des réponses de devis (propositions des compagnies)
        Schema::create('devis_reponses', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('devis_id');
            $table->string('compagnie');
            $table->string('type_garantie')->nullable();
            $table->decimal('prime_annuelle', 10, 2)->nullable();
            $table->decimal('prime_mensuelle', 10, 2)->nullable();
            $table->text('garanties')->nullable();
            $table->string('franchise')->nullable();
            $table->integer('delai_carence_mois')->nullable();
            $table->text('conditions_particulieres')->nullable();
            $table->timestamps();

            $table->foreign('devis_id')
                ->references('id')
                ->on('devis')
                ->onDelete('cascade');
        });

        // Table des paramètres système
        Schema::create('parametres', function (Blueprint $table) {
            $table->id();
            $table->string('cle')->unique();
            $table->text('valeur')->nullable();
            $table->string('type')->default('string');
            $table->timestamps();
        });

        // Seed des paramètres par défaut
        \Illuminate\Support\Facades\DB::table('parametres')->insert([
            ['cle' => 'societe_nom', 'valeur' => 'AKSAM ASSURANCES', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['cle' => 'societe_adresse', 'valeur' => '10 Rue de Penthièvre, 75008 Paris', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['cle' => 'societe_telephone', 'valeur' => '01 82 83 48 00', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['cle' => 'societe_email', 'valeur' => 'contact@aksam-assurances.fr', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['cle' => 'societe_rcs', 'valeur' => '840 653 463', 'type' => 'string', 'created_at' => now(), 'updated_at' => now()],
            ['cle' => 'faq_categories', 'valeur' => json_encode([
                ['question' => "Qu'est-ce que l'assurance professionnelle automobile ?",
                 'answer' => "L'assurance professionnelle automobile est une couverture conçue pour les entreprises et professionnels travaillant dans le secteur automobile. Elle protège contre les risques spécifiques liés à leur activité professionnelle."],
                ['question' => 'Qui doit souscrire une assurance professionnelle auto ?',
                 'answer' => "Tous les professionnels utilisant un véhicule dans le cadre de leur activité : garagistes, auto-écoles, loueurs, concessionnaires, dépanneurs, négociants, transporteurs, etc."],
                ['question' => 'Comment obtenir un devis rapidement ?',
                 'answer' => 'Remplissez notre formulaire en ligne en quelques minutes. Nous comparons les offres de nos compagnies partenaires et revenons vers vous avec les meilleures propositions.'],
                ['question' => 'Quelles garanties sont incluses ?',
                 'answer' => "Nos contrats peuvent inclure la responsabilité civile professionnelle, les dommages aux véhicules de clients, les biens professionnels, la perte d'exploitation, la protection juridique et bien d'autres options selon votre métier."],
                ['question' => 'Puis-je changer d\'assurance professionnelle facilement ?',
                 'answer' => "Oui, vous pouvez résilier votre contrat actuel et souscrire chez nous. Nous vous accompagnons dans toutes les démarches."],
                ['question' => 'Proposez-vous des tarifs compétitifs ?',
                 'answer' => "Grâce à notre réseau de partenaires assureurs et notre volume de dossiers, nous négocions les meilleurs tarifs du marché pour chaque profil."],
            ]), 'type' => 'json', 'created_at' => now(), 'updated_at' => now()],
            ['cle' => 'activites', 'valeur' => json_encode([
                ['icone' => '🏠', 'label' => 'Garagistes', 'description' => 'Ateliers de réparation, entretien et maintenance automobile.', 'slug' => 'garage-automobile'],
                ['icone' => '🏢', 'label' => 'Concessionnaires', 'description' => 'Vente de véhicules neufs et occasions.', 'slug' => 'concessionnaires-auto'],
                ['icone' => '🚗', 'label' => 'Loueurs de véhicules', 'description' => 'Location courte et longue durée.', 'slug' => 'loueur-voiture'],
                ['icone' => '🚛', 'label' => 'Dépanneurs', 'description' => 'Remorquage et assistance routière.', 'slug' => 'depanneurs'],
                ['icone' => '⛽', 'label' => 'Stations-services', 'description' => 'Distribution de carburant.', 'slug' => 'stations-service'],
                ['icone' => '🔬', 'label' => 'Centres techniques', 'description' => 'Contrôle technique et diagnostics.', 'slug' => 'centres-techniques'],
                ['icone' => '🤝', 'label' => 'Négociants auto', 'description' => 'Achat et revente de véhicules.', 'slug' => 'negociants-auto'],
                ['icone' => '📚', 'label' => 'Auto-écoles', 'description' => 'Enseignement de la conduite.', 'slug' => 'auto-ecole'],
            ]), 'type' => 'json', 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down(): void
    {
        Schema::dropIfExists('devis_reponses');
        Schema::dropIfExists('parametres');
        Schema::dropIfExists('devis');
    }
};