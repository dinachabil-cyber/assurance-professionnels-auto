<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        // devis: statut already removed by 2026_05_18_000001, only drop notes
        Schema::table('devis', function (Blueprint $table) {
            $table->dropColumn('notes');
        });

        // garage_devis: statut already removed by 2026_05_18_000001, only drop notes
        Schema::table('garage_devis', function (Blueprint $table) {
            $table->dropColumn('notes');
        });

        // loueur_devis: statut already removed by 2026_05_18_000001, only drop notes
        Schema::table('loueur_devis', function (Blueprint $table) {
            $table->dropColumn('notes');
        });

        // auto_ecole_devis: drop both statut (with index) and notes
        Schema::table('auto_ecole_devis', function (Blueprint $table) {
            $table->dropIndex(['statut']);
        });
        Schema::table('auto_ecole_devis', function (Blueprint $table) {
            $table->dropColumn(['statut', 'notes']);
        });

        // negociants_devis: drop both statut (with index) and notes
        Schema::table('negociants_devis', function (Blueprint $table) {
            $table->dropIndex(['statut']);
        });
        Schema::table('negociants_devis', function (Blueprint $table) {
            $table->dropColumn(['statut', 'notes']);
        });
    }

    public function down(): void
    {
        Schema::table('devis', function (Blueprint $table) {
            $table->text('notes')->nullable();
            $table->string('statut')->default('nouveau');
            $table->index('statut');
        });

        Schema::table('garage_devis', function (Blueprint $table) {
            $table->text('notes')->nullable();
            $table->string('statut')->default('nouveau');
            $table->index('statut');
        });

        Schema::table('loueur_devis', function (Blueprint $table) {
            $table->text('notes')->nullable();
            $table->string('statut')->default('nouveau');
            $table->index('statut');
        });

        Schema::table('auto_ecole_devis', function (Blueprint $table) {
            $table->text('notes')->nullable();
            $table->string('statut')->default('nouveau');
            $table->index('statut');
        });

        Schema::table('negociants_devis', function (Blueprint $table) {
            $table->text('notes')->nullable();
            $table->string('statut')->default('nouveau');
            $table->index('statut');
        });
    }
};