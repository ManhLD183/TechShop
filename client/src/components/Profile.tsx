import { Link } from "react-router-dom";

const accountLinks = [
  {
    href: "/profileDetail",
    icon: "bi-person-vcard-fill",
    title: "Thông tin cá nhân",
    description:
      "Cập nhật hồ sơ, địa chỉ giao hàng và các thông tin liên hệ của bạn.",
  },
  {
    href: "/changepassword",
    icon: "bi-shield-lock-fill",
    title: "Bảo mật tài khoản",
    description: "Đổi mật khẩu và kiểm soát thông tin đăng nhập an toàn hơn.",
  },
  {
    href: "/OrderClient",
    icon: "bi-bag-check-fill",
    title: "Lịch sử đơn hàng",
    description: "Theo dõi tiến trình đơn hàng và xem lại các lần mua trước.",
  },
];

const Profile = () => {
  return (
    <div className="theme-page">
      <div className="theme-container py-10 md:py-14">
        <section className="rounded-[2rem] border border-[color:var(--theme-outline)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-6 py-8 md:px-10 md:py-12">
          <span className="inline-flex rounded-full border border-[color:rgba(177,199,243,0.28)] bg-[color:rgba(177,199,243,0.12)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[color:var(--theme-primary)]">
            Tài khoản
          </span>
          <h1 className="mt-5 text-3xl font-semibold text-[color:var(--theme-text)] md:text-5xl">
            Quản lý hồ sơ và đơn hàng của bạn
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--theme-text-muted)] md:text-base">
            Tập trung toàn bộ thông tin cá nhân, bảo mật và lịch sử mua sắm
            trong một không gian gọn, dễ theo dõi và dễ thao tác hơn.
          </p>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {accountLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="group rounded-[1.75rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.03)] p-6 text-[color:var(--theme-text)] no-underline transition-all duration-200 hover:-translate-y-1 hover:border-[color:rgba(177,199,243,0.35)] hover:bg-[color:rgba(255,255,255,0.05)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:rgba(177,199,243,0.2)] bg-[color:rgba(177,199,243,0.12)] text-xl text-[color:var(--theme-primary)]">
                <i className={`bi ${item.icon}`}></i>
              </div>
              <h2 className="mt-5 text-xl font-semibold text-[color:var(--theme-text)]">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[color:var(--theme-text-muted)]">
                {item.description}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--theme-secondary)]">
                Mở trang
                <i className="bi bi-arrow-right-short text-lg transition-transform duration-200 group-hover:translate-x-1"></i>
              </span>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Profile;
