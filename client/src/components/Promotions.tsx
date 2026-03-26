import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowRight, FiGift, FiPercent, FiRefreshCcw, FiShield, FiTruck, FiZap } from "react-icons/fi";
import { useGetAllProductsQuery } from "../api/product";

type PromoProduct = {
  _id: string;
  name: string;
  images?: { url: string }[];
  minPrice?: number;
  maxPrice?: number;
};

function formatPrice(price: number | undefined) {
  if (typeof price !== "number") return "Liên hệ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
}

export default function Promotions() {
  const navigate = useNavigate();
  const { data: products } = useGetAllProductsQuery({
    sort: "purchases",
    order: "desc",
    dataCategories: [],
    page: 1,
    limit: 3,
  });

  const flashSaleProducts =
    (products as unknown as PromoProduct[] | undefined)?.slice(0, 3) ?? [];

  const categories = [
    {
      icon: <FiPercent size={32} />,
      title: "Giảm giá 50%",
      desc: "Ưu đãi nổi bật cho các dòng sản phẩm chính hãng.",
      colorClass: "text-[color:var(--theme-primary)]",
      bgClass: "bg-[color:rgba(177,199,243,0.12)]",
      iconBgClass: "bg-[color:rgba(177,199,243,0.12)]",
    },
    {
      icon: <FiZap size={32} />,
      title: "Flash Sale",
      desc: "Deal sốc cập nhật theo ngày. Nhanh tay sở hữu.",
      colorClass: "text-[color:var(--theme-secondary)]",
      bgClass: "bg-[color:rgba(255,181,156,0.12)]",
      iconBgClass: "bg-[color:rgba(255,181,156,0.12)]",
    },
    {
      icon: <FiGift size={32} />,
      title: "Quà Tặng",
      desc: "Quà tặng kèm theo chương trình ưu đãi.",
      colorClass: "text-[color:var(--theme-secondary)]",
      bgClass: "bg-[color:rgba(255,181,156,0.12)]",
      iconBgClass: "bg-[color:rgba(255,181,156,0.12)]",
    },
  ];

  return (
    <main className="theme-page pt-24 pb-20 overflow-hidden">
      {/* Hero Banner */}
      <section className="relative h-[60vh] flex items-center justify-center mb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-[color:rgba(177,199,243,0.35)] to-[color:rgba(255,181,156,0.30)] z-0" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/promo/1920/1080?blur=5')] bg-cover bg-center opacity-30" />

        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[color:rgba(177,199,243,0.18)] border border-[color:rgba(177,199,243,0.35)] rounded-full text-[color:var(--theme-primary)] text-xs font-bold uppercase tracking-widest mb-8">
            <FiZap size={14} /> Flash Sale Đang Diễn Ra
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase leading-none">
            SIÊU ƯU ĐÃI <br />{" "}
            <span className="text-[color:var(--theme-primary)]">MÙA HÈ</span>
          </h1>
          <p className="text-[color:var(--theme-text-muted)] text-xl mb-12 max-w-2xl mx-auto">
            Giảm giá hấp dẫn cho các dòng iPhone, Samsung và phụ kiện cao cấp. Đừng bỏ lỡ cơ hội sở hữu công nghệ đỉnh cao.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-4 bg-white/5 border border-[color:var(--theme-outline)] px-8 py-4 rounded-3xl backdrop-blur-xl">
              <FiRefreshCcw
                className="text-[color:var(--theme-primary)]"
                size={24}
              />
              <div className="text-left">
                <p className="text-[10px] font-bold text-[color:var(--theme-text-muted)] uppercase tracking-widest">
                  Kết thúc sau
                </p>
                <p className="text-xl font-mono font-bold">12:45:32</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => navigate("/Home")}
              className="px-10 py-5 bg-[color:var(--theme-primary)] text-[#0f172a] font-bold rounded-3xl hover:brightness-110 transition-all shadow-2xl shadow-[color:rgba(177,199,243,0.25)] flex items-center gap-2"
            >
              Săn Deal Ngay <FiArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <div className="theme-container space-y-32">
        {/* Promotion Categories */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((item, idx) => (
            <div
              key={idx}
              className="p-10 bg-white/5 border border-[color:var(--theme-outline)] rounded-[3rem] hover:border-[color:rgba(177,199,243,0.45)] transition-all group"
            >
              <div
                className={`w-16 h-16 ${item.iconBgClass} rounded-2xl flex items-center justify-center mb-8`}
              >
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-[color:var(--theme-text-muted)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </section>

        {/* Flash Sale Products */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-bold tracking-tighter">DEAL SỐC HÔM NAY</h2>
              <p className="text-[color:var(--theme-text-muted)] mt-2">
                Số lượng có hạn, nhanh tay sở hữu ngay.
              </p>
            </div>
            <Link
              to="/"
              className="text-[color:var(--theme-primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all"
            >
              Xem tất cả <FiArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {flashSaleProducts.map((product, idx) => (
              <div
                key={product._id ?? idx}
                className="group relative bg-white/5 border border-[color:var(--theme-outline)] rounded-[3rem] overflow-hidden hover:border-[color:rgba(177,199,243,0.45)] transition-all duration-500"
              >
                <div className="absolute top-6 left-6 z-10">
                  <div className="px-4 py-2 bg-[color:rgba(255,181,156,0.25)] text-[#0f172a] text-xs font-bold rounded-full shadow-lg">
                    -20% OFF
                  </div>
                </div>

                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.images?.[0]?.url || "https://picsum.photos/seed/no-image/400/400"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-3xl font-bold text-[color:var(--theme-primary)]">{formatPrice(product.minPrice)}</span>
                    <span className="text-sm text-[color:var(--theme-text-muted)] line-through">
                      {formatPrice(product.maxPrice ?? product.minPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="w-full py-5 bg-white/5 border border-[color:var(--theme-outline)] rounded-2xl text-sm font-bold text-[color:var(--theme-text)] hover:brightness-110 transition-all flex items-center justify-center gap-3 group/btn"
                  >
                    <FiTruck size={20} className="group-hover/btn:scale-110 transition-transform" />
                    Mua Ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter / Promo Signup */}
        <section className="relative p-12 md:p-20 bg-[color:var(--theme-primary)] rounded-[4rem] overflow-hidden text-center">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">ĐĂNG KÝ NHẬN TIN</h2>
            <p className="text-[#0f172a] text-lg mb-12">
              Nhận ngay voucher giảm giá cho đơn hàng đầu tiên và cập nhật sớm nhất các chương trình khuyến mãi.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-grow bg-white/20 border border-white/30 rounded-2xl px-6 py-4 text-[#0f172a] placeholder:text-[#0f172a]/70 focus:outline-none focus:bg-white/30 transition-all"
              />
              <button className="px-10 py-4 bg-[#0f172a] text-[color:var(--theme-primary)] font-bold rounded-2xl hover:brightness-110 transition-colors shadow-xl shadow-black/10">
                Đăng Ký
              </button>
            </form>

            <p className="mt-6 text-[#0f172a] text-xs flex items-center justify-center gap-2">
              <FiShield size={14} /> Chúng tôi cam kết bảo mật thông tin của bạn.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

