<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('garage_devis', function (Blueprint $table) {
            $table->dropIndex(['statut']);
            $table->dropColumn('statut');
        });

        Schema::table('loueur_devis', function (Blueprint $table) {
            $table->dropIndex(['statut']);
            $table->dropColumn('statut');
        });

        Schema::table('devis', function (Blueprint $table) {
            $table->dropIndex(['statut']);
            $table->dropColumn('statut');
        });
    }

    public function down(): void
    {
        Schema::table('garage_devis', function (Blueprint $table) {
            $table->string('statut')->default('nouveau');
            $table->index('statut');
        });

        Schema::table('loueur_devis', function (Blueprint $table) {
            $table->string('statut')->default('nouveau');
            $table->index('statut');
        });

        Schema::table('devis', function (Blueprint $table) {
            $table->string('statut')->default('nouveau');
            $table->index('statut');
        });
    }
};