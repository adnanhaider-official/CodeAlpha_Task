import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <section className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="inline-block bg-indigo-100 text-indigo-600 px-4 py-2 rounded-full text-sm font-medium">
              New Collection 2026
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Discover Your{" "}
              <span className="text-indigo-600">Perfect Style</span>
            </h1>

            <p className="mt-6 text-gray-600 text-base sm:text-lg leading-8 max-w-xl mx-auto lg:mx-0">
              Explore premium fashion, electronics, accessories and much more.
              Shop high-quality products at the best prices with fast delivery
              and a secure shopping experience.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/products"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-3 rounded-lg font-medium transition"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="border border-gray-300 hover:bg-gray-100 text-gray-800 px-7 py-3 rounded-lg font-medium transition"
              >
                Explore Products
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">10K+</h2>

                <p className="text-sm text-gray-500">Customers</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">500+</h2>

                <p className="text-sm text-gray-500">Products</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900">24/7</h2>

                <p className="text-sm text-gray-500">Support</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={heroImage}
                alt="Shopping Hero"
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
