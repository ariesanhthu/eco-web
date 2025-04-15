"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Sample product data
const products = [
  {
    id: 1,
    name: "Túi vải tự nhiên",
    description: "Túi vải được làm từ bông hữu cơ 100%, thân thiện với môi trường và có thể tái sử dụng nhiều lần.",
    image: "/images/product-1.jpg",
    price: "150.000đ",
  },
  {
    id: 2,
    name: "Bình nước thủy tinh",
    description: "Bình nước thủy tinh cao cấp, không chứa BPA, an toàn cho sức khỏe và thân thiện với môi trường.",
    image: "/images/product-2.jpg",
    price: "280.000đ",
  },
  {
    id: 3,
    name: "Ống hút tre tự nhiên",
    description: "Ống hút làm từ tre tự nhiên, thay thế hoàn hảo cho ống hút nhựa, có thể phân hủy sinh học.",
    image: "/images/product-3.jpg",
    price: "75.000đ",
  },
  {
    id: 4,
    name: "Xà phòng hữu cơ",
    description: "Xà phòng làm từ nguyên liệu hữu cơ, không chứa hóa chất độc hại, an toàn cho da và môi trường.",
    image: "/images/product-4.jpg",
    price: "120.000đ",
  },
]

export default function FeaturedProducts() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className={`transform rounded-lg bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="p-6">
            <h3 className="mb-2 text-xl font-semibold text-gray-800">{product.name}</h3>
            <p className="mb-4 text-gray-600">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">{product.price}</span>
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
  )
}
