<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConcorrenteAddNome extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::table('concorrente', function($table) {
            $table->string('nome');
            $table->renameColumn('titulo', 'nomeFantasia');
         });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    	Schema::table('concorrente', function($table) {
            $table->dropColumn('nome');
            $table->renameColumn('nomeFantasia', 'titulo');
        });
    }
}