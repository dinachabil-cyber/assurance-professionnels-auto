<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('devis', function (Blueprint $table) {
            $table->dropColumn(['updated_at', 'deleted_at']);
        });

        Schema::table('garage_devis', function (Blueprint $table) {
            $table->dropColumn(['updated_at', 'deleted_at']);
        });

        Schema::table('loueur_devis', function (Blueprint $table) {
            $table->dropColumn(['updated_at', 'deleted_at']);
        });

        Schema::table('auto_ecole_devis', function (Blueprint $table) {
            $table->dropColumn(['updated_at', 'deleted_at']);
        });

        Schema::table('negociants_devis', function (Blueprint $table) {
            $table->dropColumn(['updated_at', 'deleted_at']);
        });
    }

    public function down(): void
    {
        $tables = ['devis', 'garage_devis', 'loueur_devis', 'auto_ecole_devis', 'negociants_devis'];

        foreach ($tables as $table) {
            DB::statement("
                ALTER TABLE `{$table}`
                ADD COLUMN `created_at` TIMESTAMP NULL,
                ADD COLUMN `updated_at` TIMESTAMP NULL,
                ADD COLUMN `deleted_at` TIMESTAMP NULL
            ");
            Schema::table($table, function (Blueprint $t) {
                $t->softDeletes();
            });
        }
    }
};
