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
            <div className="flex items-center gap-4 rounded-3xl border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.76)] px-8 py-4 shadow-[0_18px_40px_rgba(38,52,77,0.08)] backdrop-blur-xl">
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
              className="flex items-center gap-2 rounded-3xl bg-[color:var(--theme-primary)] px-10 py-5 font-bold text-white shadow-[0_20px_40px_rgba(49,95,214,0.2)] transition-all hover:brightness-110"
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
              className="rounded-[3rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.84)] p-10 shadow-[0_18px_44px_rgba(38,52,77,0.08)] transition-all group hover:border-[color:rgba(49,95,214,0.28)]"
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
                className="group relative overflow-hidden rounded-[3rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.84)] shadow-[0_18px_44px_rgba(38,52,77,0.08)] transition-all duration-500 hover:border-[color:rgba(49,95,214,0.28)]"
              >
                <div className="absolute top-6 left-6 z-10">
                  <div className="rounded-full border border-[color:rgba(212,123,76,0.16)] bg-[color:rgba(255,181,156,0.28)] px-4 py-2 text-xs font-bold text-[color:#9a4f25] shadow-[0_12px_24px_rgba(212,123,76,0.12)]">
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
                    className="flex w-full items-center justify-center gap-3 rounded-2xl border border-[color:rgba(49,95,214,0.14)] bg-[color:rgba(49,95,214,0.08)] py-5 text-sm font-bold text-[color:var(--theme-primary)] transition-all hover:bg-[color:rgba(49,95,214,0.12)]"
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
        <section className="relative overflow-hidden rounded-[4rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.9)] p-12 text-center shadow-[0_24px_56px_rgba(38,52,77,0.1)] md:p-20">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(49,95,214,0.14),rgba(212,123,76,0.08),transparent)]" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase">ĐĂNG KÝ NHẬN TIN</h2>
            <p className="text-[color:var(--theme-text-muted)] text-lg mb-12">
              Nhận ngay voucher giảm giá cho đơn hàng đầu tiên và cập nhật sớm nhất các chương trình khuyến mãi.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                className="flex-grow rounded-2xl border border-[color:var(--theme-outline)] bg-white px-6 py-4 text-[color:var(--theme-text)] placeholder:text-[color:var(--theme-text-muted)] transition-all focus:outline-none focus:ring-2 focus:ring-[color:rgba(49,95,214,0.18)]"
              />
              <button className="rounded-2xl bg-[color:var(--theme-primary)] px-10 py-4 font-bold text-white shadow-[0_18px_36px_rgba(49,95,214,0.18)] transition-colors hover:brightness-110">
                Đăng Ký
              </button>
            </form>

            <p className="mt-6 flex items-center justify-center gap-2 text-xs text-[color:var(--theme-text-muted)]">
              <FiShield size={14} /> Chúng tôi cam kết bảo mật thông tin của bạn.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

