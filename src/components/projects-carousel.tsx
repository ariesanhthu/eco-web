"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample projects data
const projects = [
  {
    id: 1,
    title: "Dự án trồng rừng Tây Nguyên",
    description:
      "Dự án trồng 10,000 cây xanh tại khu vực Tây Nguyên, góp phần phục hồi hệ sinh thái và chống biến đổi khí hậu.",
    image: "/images/project-1.jpg",
  },
  {
    id: 2,
    title: "Hệ thống xử lý nước thải sinh học",
    description:
      "Thiết kế và xây dựng hệ thống xử lý nước thải sinh học cho khu công nghiệp, giúp giảm thiểu ô nhiễm môi trường.",
    image: "/images/project-2.jpg",
  },
  {
    id: 3,
    title: "Chương trình tái chế rác thải nhựa",
    description:
      "Triển khai chương trình thu gom và tái chế rác thải nhựa tại các trường học, nâng cao ý thức bảo vệ môi trường.",
    image: "/images/project-3.jpg",
  },
]

export default function ProjectsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === projects.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentSlide, isAnimating])

  return (
    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-xl">
      <div
        ref={slideRef}
        className="relative flex h-[500px] w-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {projects.map((project) => (
          <div key={project.id} className="relative min-w-full">
            <div className="relative h-full w-full">
              <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <h3 className="mb-2 text-2xl font-bold">{project.title}</h3>
                <p className="mb-4 text-gray-200">{project.description}</p>
                <Link
                  href="#"
                  className="inline-flex items-center rounded-full bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                >
                  Xem chi tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-sm transition-all hover:bg-white/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-sm transition-all hover:bg-white/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (isAnimating) return
              setIsAnimating(true)
              setCurrentSlide(index)
              setTimeout(() => setIsAnimating(false), 500)
            }}
            className={`h-2 w-8 rounded-full transition-all ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
