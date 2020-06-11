<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConcorrenteAddDetalhesEndereco extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::table('concorrente', function($table) {
            $table->longText('detalhes');
            $table->longText('endereco');
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
            $table->dropColumn('detalhes');
            $table->dropColumn('endereco');
        });
    }
}