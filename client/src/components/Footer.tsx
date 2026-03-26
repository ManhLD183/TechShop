import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-[color:var(--theme-outline)] bg-[color:var(--theme-bg)] text-[color:var(--theme-text)]">
      <div className="theme-container py-10">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h5 className="mb-3 text-lg font-bold">TECH SHOP</h5>
            <p className="text-sm text-[color:var(--theme-text-muted)]">
              Hệ thống bán lẻ điện thoại và phụ kiện chính hãng. Refactor theo blueprint,
              giữ nguyên logic dữ liệu từ hệ thống hiện tại.
            </p>
          </div>
          <div>
            <h6 className="mb-3 font-semibold">Sản phẩm</h6>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/shops"
                  className="text-sm text-[color:var(--theme-text-muted)] transition hover:text-[color:var(--theme-text)]"
                >
                  Tất cả sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="/Home"
                  className="text-sm text-[color:var(--theme-text-muted)] transition hover:text-[color:var(--theme-text)]"
                >
                  Nổi bật
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="mb-3 font-semibold">Tài khoản</h6>
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  to="/profileDetail"
                  className="text-sm text-[color:var(--theme-text-muted)] transition hover:text-[color:var(--theme-text)]"
                >
                  Thông tin cá nhân
                </Link>
              </li>
              <li>
                <Link
                  to="/orderClient"
                  className="text-sm text-[color:var(--theme-text-muted)] transition hover:text-[color:var(--theme-text)]"
                >
                  Lịch sử đơn hàng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="mb-3 font-semibold">Liên hệ</h6>
            <p className="mb-1 text-sm text-[color:var(--theme-text-muted)]">
              Hotline: 0904 798 514
            </p>
            <p className="mb-0 text-sm text-[color:var(--theme-text-muted)]">
              Email: support@techshop.vn
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-[color:var(--theme-outline)] py-3">
        <div className="theme-container text-center text-xs text-[color:var(--theme-text-muted)]">
          © 2026 Tech Shop. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
