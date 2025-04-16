"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IProduct } from "@/utils/interface";

// Hàm helper để đảm bảo URL hợp lệ cho component Image
function getImageUrl(url?: string): string {
  if (!url) return "/placeholder.svg";
  // Nếu URL đã bắt đầu bằng '/' hoặc 'http', trả về luôn
  if (url.startsWith("/") || url.startsWith("http")) return url;
  // Nếu không, giả sử đó là đường dẫn tương đối và thêm '/' ở đầu
  return `/${url}`;
}

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Hiệu ứng hiển thị (animation fade in)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Fetch products từ API khi component mount
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await res.json();
        // Giả sử API trả về dữ liệu theo cấu trúc: { data: [...] }
        setProducts(data.data || data);
      } catch (err: any) {
        console.error("Error fetching products:", err);
        setError("Error fetching products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={product._id}
          className={`transform rounded-lg bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
            <Image
              src={getImageUrl(product.image)}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="mb-4 text-gray-600">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">
                {product.price}
              </span>
              <Link
                href="#"
                className="group flex items-center text-sm font-medium text-green-600 hover:text-green-700"
              >
                Chi tiết
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
