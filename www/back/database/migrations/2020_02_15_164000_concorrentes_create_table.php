<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class ConcorrentesCreateTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    	Schema::create('concorrente', function (Blueprint $table) {
            //core
            $table->string('titulo');
            $table->string('telefone');
            $table->string('email');
            $table->string('site');
            $table->string('instagram');
            $table->string('facebook');
            $table->string('descricao');

            //relacionamentos
            $table->increments('concorrente_id');

            $table->unsignedBigInteger('categoria_id');
            $table->foreign('categoria_id')->references('id')->on('categoria');
            
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
    	Schema::dropIfExists('concorrente');
    }
}