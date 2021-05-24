<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/',function(){
    return view('board');
});

Route::get('/admin', function () {
    return view('welcome');
});

Route::get('/sudoku', function(){
    return view('Sudoku');
});

Route::get('/pacman', function(){
    return view('Pacman');
});

Route::get('/tictactoe',function(){
    return view('Tictactoe');
});

Route::get('/sudoku/create', [App\Http\Controllers\SudokuGenerator::class,'create']);

Route::get('/pacman/create', [App\Http\Controllers\PacmanGenerator::class, 'create']);

Route::get('/image/pacman', [App\Http\Controllers\ImageController::class, 'get']);

Route::get('/image', [App\Http\Controllers\ImageController::class, 'getThumbnail']);

Route::post('/image',[App\Http\Controllers\ImageController::class, 'create']);

Route::get('/solve',[App\Http\Controllers\TicController::class, 'solve']);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
