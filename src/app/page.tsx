import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Leaf, Recycle, Droplets, Shield } from "lucide-react"

import FeaturedProducts from "@/components/featured-products"
import ProjectsCarousel from "@/components/projects-carousel"
import SocialLinks from "@/components/social-links"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Banner/Message Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/nature-banner.jpg" alt="Thiên nhiên xanh mát" fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="container relative z-10 mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            Tôn vinh thiên nhiên – Sống xanh mỗi ngày
          </h1>
          <p className="mb-8 max-w-2xl text-lg md:text-xl">
            Chúng tôi cung cấp các sản phẩm thân thiện với môi trường, góp phần xây dựng một tương lai bền vững cho thế
            hệ mai sau.
          </p>
          <Link
            href="#products"
            className="group flex items-center rounded-full bg-green-600 px-6 py-3 text-lg font-medium text-white transition-all hover:bg-green-700"
          >
            Khám phá ngay
            <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Dịch vụ của chúng tôi</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Chúng tôi cung cấp các giải pháp toàn diện giúp bạn và doanh nghiệp sống và làm việc theo phong cách bền
              vững.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Leaf className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">Sản phẩm hữu cơ</h3>
              <p className="text-gray-600">
                Các sản phẩm được sản xuất từ nguyên liệu tự nhiên, không chứa hóa chất độc hại.
              </p>
            </div>

            <div className="group rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Recycle className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">Tái chế bền vững</h3>
              <p className="text-gray-600">
                Giải pháp tái chế toàn diện cho doanh nghiệp và cá nhân, giảm thiểu rác thải.
              </p>
            </div>

            <div className="group rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Droplets className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">Tiết kiệm nước</h3>
              <p className="text-gray-600">
                Các sản phẩm và giải pháp giúp tiết kiệm nước trong sinh hoạt và sản xuất.
              </p>
            </div>

            <div className="group rounded-lg bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Shield className="h-7 w-7" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">Tư vấn môi trường</h3>
              <p className="text-gray-600">
                Dịch vụ tư vấn chuyên nghiệp về các giải pháp bảo vệ môi trường cho doanh nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section id="products" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Sản phẩm tiêu biểu</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Khám phá các sản phẩm thân thiện với môi trường, được thiết kế để giúp bạn sống xanh mỗi ngày.
            </p>
          </div>

          <FeaturedProducts />
        </div>
      </section>

      {/* Projects Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-800 md:text-4xl">Công trình kinh nghiệm</h2>
            <p className="mx-auto max-w-2xl text-gray-600">
              Những dự án tiêu biểu mà chúng tôi đã thực hiện, mang lại giá trị bền vững cho khách hàng và môi trường.
            </p>
          </div>

          <ProjectsCarousel />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-gray-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-4 text-xl font-bold text-white">Về chúng tôi</h3>
              <p className="mb-4">
                Chúng tôi là đơn vị tiên phong trong lĩnh vực cung cấp các sản phẩm và giải pháp thân thiện với môi
                trường tại Việt Nam.
              </p>
              <SocialLinks />
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-white">Liên kết nhanh</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Dịch vụ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-white">Dịch vụ</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Sản phẩm hữu cơ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Tái chế bền vững
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Tiết kiệm nước
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400">
                    Tư vấn môi trường
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold text-white">Liên hệ</h3>
              <address className="not-italic">
                <p className="mb-2">123 Đường Xanh, Quận 1, TP.HCM</p>
                <p className="mb-2">Email: info@ecogreen.vn</p>
                <p className="mb-2">Điện thoại: (028) 1234 5678</p>
              </address>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} EcoGreen. Tất cả các quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
