import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams(); // get product id from route
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!product) return <p className="p-6 text-red-500">Product not found.</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img
        src={product.image}
        alt={product.title}
        className="w-64 h-64 object-contain rounded mb-4 shadow"
      />
      <p className="text-gray-700 mb-2 text-center">{product.description}</p>
      <p className="font-semibold text-lg mb-1">Price: ${product.price}</p>
      <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>

      <Link
        to="/dashboard"
        className="text-blue-600 underline hover:text-blue-800"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default ProductDetail;
