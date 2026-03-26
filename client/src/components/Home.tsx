import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiRefreshCcw, FiShield, FiStar, FiTruck } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { getCategories } from "../api/category";
import { useGetAllProductsQuery } from "../api/product";

interface Category {
  _id: string;
  name: string;
  image: string;
  description?: string;
}

type ProductCard = {
  _id: string;
  name: string;
  minPrice?: number;
  maxPrice?: number;
  images?: { url: string }[];
};

type BannerItem = { image: string; name?: string };

const features = [
  { icon: FiTruck, title: "Giao hàng miễn phí", desc: "Cho đơn hàng từ 2tr" },
  { icon: FiShield, title: "Bảo hành 12 tháng", desc: "Chính hãng Apple/Samsung" },
  { icon: FiRefreshCcw, title: "Đổi trả 30 ngày", desc: "Nếu có lỗi nhà sản xuất" },
  { icon: FiStar, title: "Ưu đãi thành viên", desc: "Giảm thêm đến 5%" },
];

const Home = () => {
  const navigate = useNavigate();

  const { data: products } = useGetAllProductsQuery({
    sort: "purchases",
    order: "desc",
    dataCategories: [],
    page: 1,
    limit: 8,
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/getBanners");
        setBanners(response.data);
      } finally {
        setIsLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);

  const featuredProducts = useMemo(
    () => ((products as ProductCard[] | undefined) ?? []).slice(0, 8),
    [products],
  );

  const heroImage =
    banners[0]?.image ||
    "https://picsum.photos/seed/techbg/1920/1080?blur=10";

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== "number") return "Liên hệ";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="theme-page pt-16 sm:pt-20">
      <section className="relative h-[80vh] flex items-center overflow-hidden border-b border-[color:var(--theme-outline)]">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            className="w-full h-full object-cover opacity-30"
            alt="Hero Background"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="theme-container relative z-10 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-[color:rgba(177,199,243,0.18)] text-[color:var(--theme-primary)] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6 border border-[color:rgba(177,199,243,0.35)]">
              Mới ra mắt
            </span>
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter mb-6 leading-none">
              CÔNG NGHỆ MỚI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[color:var(--theme-primary)] to-[color:var(--theme-secondary)]">
                CHO MỌI NHU CẦU
              </span>
            </h1>
            <p className="text-lg text-[color:var(--theme-text-muted)] mb-10 max-w-lg leading-relaxed">
              Dữ liệu sản phẩm, danh mục và banner được lấy trực tiếp từ hệ thống hiện tại.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                className="bg-[color:var(--theme-primary)] text-[#0f172a] px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all flex items-center gap-2 group"
                onClick={() => navigate("/shops")}
                type="button"
              >
                Mua ngay
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                className="bg-white/5 backdrop-blur-md border border-[color:var(--theme-outline)] text-[color:var(--theme-text)] px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all"
                onClick={() => navigate("/blog")}
                type="button"
              >
                Tìm hiểu thêm
              </button>
            </div>
            {isLoadingBanners ? (
              <p className="text-xs mt-4 text-[color:var(--theme-text-muted)]">
                Đang tải banner...
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-16 border-b border-[color:var(--theme-outline)] bg-white/5">
        <div className="theme-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="flex flex-col items-center text-center group">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[color:rgba(177,199,243,0.18)] transition-colors">
                  <feature.icon
                    className="text-[color:var(--theme-primary)]"
                    size={24}
                  />
                </div>
                <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-[color:var(--theme-text-muted)]">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="theme-container">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Sản phẩm nổi bật</h2>
              <p className="text-[color:var(--theme-text-muted)]">
                Những mẫu điện thoại tốt nhất hiện nay
              </p>
            </div>
            <Link
              to="/shops"
              className="text-[color:var(--theme-primary)] text-sm font-bold hover:underline"
            >
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white/5 border border-[color:var(--theme-outline)] rounded-3xl overflow-hidden hover:border-[color:rgba(177,199,243,0.45)] transition-all"
                >
                <Link to={`/products/${product._id}`} className="relative aspect-square block overflow-hidden bg-white/5">
                  <img
                    src={product.images?.[0]?.url || "https://picsum.photos/seed/no-image/400/400"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="p-6">
                  <Link to={`/products/${product._id}`}>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-[color:var(--theme-primary)] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-[color:var(--theme-text)]">
                      {product.minPrice === product.maxPrice
                        ? formatPrice(product.maxPrice)
                        : `${formatPrice(product.minPrice)} - ${formatPrice(product.maxPrice)}`}
                    </span>
                    <button
                      className="w-10 h-10 bg-[color:var(--theme-primary)] text-[#0f172a] rounded-full flex items-center justify-center hover:brightness-110 transition-all shadow-xl"
                      onClick={() => navigate(`/products/${product._id}`)}
                      type="button"
                    >
                      <FiArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-white/10 bg-white/[0.02]">
        <div className="theme-container">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Danh mục nổi bật</h2>
          </div>
              {isLoadingCategories ? (
            <p className="text-[color:var(--theme-text-muted)]">Đang tải danh mục...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <Link
                  to={`/categories/${category._id}`}
                  key={category._id}
                  className="rounded-2xl overflow-hidden border border-[color:var(--theme-outline)] bg-white/5 hover:border-[color:rgba(177,199,243,0.5)] transition-all"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[color:var(--theme-primary)] to-[color:var(--theme-secondary)] rounded-[3rem] p-12 sm:p-20 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">
              Nâng cấp trải nghiệm di động của bạn
            </h2>
            <p className="text-[color:rgba(255,255,255,0.9)] mb-10 max-w-xl mx-auto text-lg">
              Theo dõi chương trình khuyến mãi và sản phẩm mới ngay trên hệ thống hiện tại.
            </p>
            <button
              className="bg-[#0f172a] text-[color:var(--theme-primary)] px-10 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-2xl"
              onClick={() => navigate("/shops")}
              type="button"
            >
              Khám phá ngay
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
