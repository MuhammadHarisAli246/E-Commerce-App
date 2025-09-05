import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch products from Fakestore API
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading products...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="border p-3 rounded shadow hover:bg-gray-50 flex flex-col items-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-contain mb-2"
            />
            <h2 className="font-semibold text-center">{product.title}</h2>
            <p className="text-gray-600 font-medium">${product.price}</p>
            <Link
              to={`/dashboard/product/${product.id}`}
              className="text-blue-600 underline mt-2"
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
