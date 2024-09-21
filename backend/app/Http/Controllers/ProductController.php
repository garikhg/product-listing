<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ProductController extends Controller
{
    public function fetchProducts() {
        $response = Http::get('https://dummyjson.com/products');
        return $response->json();
    }
}
