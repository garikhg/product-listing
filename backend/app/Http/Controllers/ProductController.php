<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    protected $apiBaseUrl = "https://dummyjson.com/products";

    /**
     * Get all products with optional pagination.
     */
    public function index(Request $request)
    {
        $this->validatePagination($request);
        $limit = $request->query('limit', 30);
        $skip = $request->query('skip', 0);

        return $this->fetchFromApi('', ['limit' => $limit, 'skip' => $skip]);
    }

    /**
     * Get a single product by ID.
     */
    public function getProduct($id)
    {
        return $this->fetchFromApi("/{$id}");
    }

    /**
     * Search products by query string.
     */
    public function searchProducts(Request $request)
    {
        $query = $request->query('q');
        if (!$query) {
            return response()->json(['error' => 'Search query is required.'], 400);
        }

        return $this->fetchFromApi('/search', ['q' => $query]);
    }

    /**
     * Get a limited set of products.
     */
    public function getLimitedProducts(Request $request)
    {
        $this->validatePagination($request);
        $limit = $request->query('limit', 10);
        $skip = $request->query('skip', 0);
        $select = $request->query('select');

        return $this->fetchFromApi('', [
            'limit' => $limit,
            'skip' => $skip,
            'select' => $select,
        ]);
    }

    /**
     * Sort products by field and order.
     */
    public function sortProducts(Request $request)
    {
        $this->validateSortParams($request);
        $sortBy = $request->query('sortBy', 'title');
        $order = $request->query('order', 'asc');

        return $this->fetchFromApi('', ['sortBy' => $sortBy, 'order' => $order]);
    }

    /**
     * Get all product categories (cached).
     */
    public function getCategories()
    {
        return Cache::remember('product_categories', 3600, function () {
            return $this->fetchFromApi('/categories');
        });
    }

    /**
     * Get products by category.
     */
    public function getProductsByCategory($category)
    {
        return $this->fetchFromApi("/category/{$category}");
    }

    /**
     * Add a new product.
     */
    public function addProduct(Request $request)
    {
        $this->validateProductData($request);
        $response = Http::post("{$this->apiBaseUrl}/add", $request->all());

        return response()->json($response->json(), $response->status());
    }

    /**
     * Update a product by ID.
     */
    public function updateProduct(Request $request, $id)
    {
        $this->validateProductData($request);
        $response = Http::put("{$this->apiBaseUrl}/{$id}", $request->all());

        return response()->json($response->json(), $response->status());
    }

    /**
     * Delete a product by ID.
     */
    public function deleteProduct($id)
    {
        $response = Http::delete("{$this->apiBaseUrl}/{$id}");

        return response()->json($response->json(), $response->status());
    }

    /**
     * Helper method to fetch data from the external API.
     */
    protected function fetchFromApi($endpoint = '', $params = [])
    {
        try {
            $response = Http::get("{$this->apiBaseUrl}{$endpoint}", $params);

            if ($response->failed()) {
                return response()->json(['error' => 'Failed to fetch data from API'], 500);
            }

            return response()->json($response->json());
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while processing your request.'], 500);
        }
    }

    /**
     * Validate pagination parameters.
     */
    protected function validatePagination(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'limit' => 'integer|min:1|max:100',
            'skip' => 'integer|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400)->throwResponse();
        }
    }

    /**
     * Validate sorting parameters.
     */
    protected function validateSortParams(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sortBy' => 'string|in:title,price,rating',
            'order' => 'string|in:asc,desc',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400)->throwResponse();
        }
    }

    /**
     * Validate product data.
     */
    protected function validateProductData(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400)->throwResponse();
        }
    }
}
