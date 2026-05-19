<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('auto_ecole_devis', function (Blueprint $table) {
            $table->id();
            $table->string('nom');
            $table->string('prenom');
            $table->string('raison_sociale')->nullable();
            $table->string('demarrage', 3)->nullable();
            $table->string('assure', 3)->nullable();
            $table->string('ancienne', 3)->nullable();
            $table->string('motif_resiliation')->nullable();
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
    }

    public function down(): void
    {
        Schema::dropIfExists('auto_ecole_devis');
    }
};
