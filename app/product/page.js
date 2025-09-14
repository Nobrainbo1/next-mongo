"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function Home() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;
  console.debug("API_BASE", API_BASE);
  const { register, handleSubmit } = useForm();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  async function fetchProducts() {
    const data = await fetch(`${API_BASE}/product`);
    // const data = await fetch(`http://localhost:3000/product`);
    const p = await data.json();
    setProducts(p);
  }

  async function fetchCategory() {
    const data = await fetch(`${API_BASE}/category`);
    const c = await data.json();
    setCategory(c);
  }

  const createProduct = (data) => {
    fetch(`${API_BASE}/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchProducts());
  };

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;
    
    await fetch(`${API_BASE}/product/${id}`, {
      method: "DELETE",
    });
    fetchProducts();
  }

  useEffect(() => {
    fetchCategory();
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 p-4">
      <div className="flex flex-row gap-6 max-w-7xl mx-auto">
        <div className="flex-1 bg-gray-900 rounded-lg shadow-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Add Product</h2>
          <form onSubmit={handleSubmit(createProduct)}>
            <div className="grid grid-cols-2 gap-4 max-w-lg">
              <div className="text-gray-300 font-medium">Code:</div>
              <div>
                <input
                  name="code"
                  type="text"
                  {...register("code", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div className="text-gray-300 font-medium">Name:</div>
              <div>
                <input
                  name="name"
                  type="text"
                  {...register("name", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                />
              </div>
              <div className="text-gray-300 font-medium">Description:</div>
              <div>
                <textarea
                  name="description"
                  {...register("description", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  rows="3"
                />
              </div>
              <div className="text-gray-300 font-medium">Price:</div>
              <div>
                <input
                  name="price"
                  type="number"
                  {...register("price", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white placeholder-gray-400"
                  step="0.01"
                />
              </div>
              <div className="text-gray-300 font-medium">Category:</div>
              <div>
                <select
                  name="category"
                  {...register("category", { required: true })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-white"
                >
                  <option value="">Select a category</option>
                  {category.map((c) => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 mt-4">
                <input
                  type="submit"
                  value="Add Product"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
                />
              </div>
            </div>
          </form>
        </div>
        
        <div className="flex-1 bg-gray-900 rounded-lg shadow-2xl p-6 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Products ({products.length})</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {products.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No products yet. Add your first product!</p>
              </div>
            ) : (
              products.map((p) => (
                <div key={p._id} className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-colors border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Link href={`/product/${p._id}`} className="font-semibold text-blue-400 hover:text-blue-300 text-lg">
                        {p.name}
                      </Link>
                      <p className="text-gray-300 text-sm mt-1">{p.description}</p>
                    </div>
                    <button 
                      onClick={deleteById(p._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors ml-4"
                      title="Delete product"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
