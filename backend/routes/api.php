<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index'])->name('products.index');
    Route::get('/{id}', [ProductController::class, 'getProduct'])->name('products.show'); 
    Route::get('/search', [ProductController::class, 'searchProducts'])->name('products.search');  
    Route::get('/limited', [ProductController::class, 'getLimitedProducts'])->name('products.limited');  
    Route::get('/sort', [ProductController::class, 'sortProducts'])->name('products.sort');  
    Route::get('/categories', [ProductController::class, 'getCategories'])->name('products.categories');
    Route::get('/category/{category}', [ProductController::class, 'getProductsByCategory'])->name('products.byCategory');  
    
    Route::post('/add', [ProductController::class, 'addProduct'])->name('products.add');
    Route::put('/{id}', [ProductController::class, 'updateProduct'])->name('products.update');  
    Route::delete('/{id}', [ProductController::class, 'deleteProduct'])->name('products.delete');  
});
