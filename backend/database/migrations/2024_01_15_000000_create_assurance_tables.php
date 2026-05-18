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
        
    }

    public function down(): void
    {
        Schema::dropIfExists('devis_reponses');
        
        Schema::dropIfExists('devis');
    }
};