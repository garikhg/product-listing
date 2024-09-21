import React, {useEffect, useState} from "react";
import axios from 'axios';
import {Card, CardContent, CardHeader} from "./ui/card";
import {Input} from "./ui/input.tsx";

interface Product {
    id: number;
    title: string;
    price: number;
    image: [];
    thumbnail: string;
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>( [] );
    const [searchTerm, setSearchTerm] = useState( '' );
    const [loading, setLoading] = useState( true );
    const backendUrl = import.meta.env.VITE_LARAVEL_BACKEND_URL || 'http://localhost:8000';

    useEffect( () => {
        const fetchProducts = async () => {
            try {
                setLoading( true );
                const response = await axios.get( `${backendUrl}/api/products` );
                setProducts( response?.data?.products );
                setLoading( false ); // Set loading after fetch
            } catch (error) {
                console.error( 'Error fetching products:', error );
                setLoading( false );
            }
        }
        fetchProducts();
    }, [] );

    // Handle search input and filter products
    const filteredProducts = searchTerm
        ? products.filter( (product) => product.title.toLowerCase().includes( searchTerm.toLowerCase() ) )
        : products; // Display all products when searchTerm is empty

    return (
        <div>
            <div className="mb-10">
                <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm( e.target.value )}
                />
            </div>
            {loading ? Array( 30 ).fill( 0 ).map( (_, index) => (
                <div key={index}>Loading products...</div>
            ) ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map( (product) => (
                            <div key={product.id}>
                                <Card>
                                    <CardHeader className="p-0 min-h-[335px]">
                                        <img src={product.thumbnail}
                                             alt={product.title}
                                             loading="lazy"
                                             className="w-full h-full object-cover"
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        {product.title}
                                    </CardContent>
                                </Card>
                            </div>
                        ) )
                    ) : (
                        <p>No products found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProductList;
