<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConcorrenteChangeDetalhesEndereco extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::table('concorrente', function($table) {
            $table->mediumText('detalhes')->change();
            $table->mediumText('endereco')->change();
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
            $table->longText('detalhes');
            $table->longText('endereco');
        });
    }
}