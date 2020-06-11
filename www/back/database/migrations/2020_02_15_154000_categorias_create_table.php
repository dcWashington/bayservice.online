<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CategoriasCreateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::create('categoria', function (Blueprint $table) {
            //core
            $table->string('titulo');
            $table->string('descricao');

            //relacionamentos
	        $table->increments('id');
            
            //track
            $table->timestamps();
            $table->softDeletes();
	    });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
    	Schema::dropIfExists('categoria');
    }
}