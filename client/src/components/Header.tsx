import { useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FiChevronDown,
  FiMenu,
  FiSearch,
  FiShoppingCart,
  FiSmartphone,
  FiX,
} from "react-icons/fi";

import { getCategories } from "../api/category";
import { useGetCartOfUserQuery } from "../api/cart";
import { useGetProfileByAcountQuery } from "../api/acount";

type Category = {
  _id: string;
  name: string;
};

type ProductSearchItem = {
  _id: string;
  name: string;
  images: { url: string }[];
};

const Header = () => {
  const [token, setToken] = useState<string | undefined>(Cookies.get("token"));
  const [categories, setCategories] = useState<Category[]>([]);
  const [keyword, setKeyword] = useState("");
  const [searchResult, setSearchResult] = useState<ProductSearchItem[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isMobileCategoryMenuOpen, setIsMobileCategoryMenuOpen] =
    useState(false);

  const navigate = useNavigate();
  const categoryMenuRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const { data: carts, isLoading } = useGetCartOfUserQuery(token);
  const { data: profile } = useGetProfileByAcountQuery(token);

  const featuredCategories = useMemo(
    () => categories.slice(0, 3),
    [categories],
  );

  const cartCount = useMemo(
    () =>
      token
        ? carts?.reduce(
            (accumulator: number, currentValue: { quantity: number }) =>
              accumulator + currentValue.quantity,
            0,
          ) || 0
        : 0,
    [carts, token],
  );

  useEffect(() => {
    getCategories().then((data) => setCategories(data.data || []));
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!keyword.trim()) {
        setSearchResult([]);
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/api/products?q=${keyword.trim()}`,
      );
      setSearchResult(response.data || []);
    };

    const id = setTimeout(fetchSearch, 250);
    return () => clearTimeout(id);
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        categoryMenuRef.current &&
        !categoryMenuRef.current.contains(target)
      ) {
        setIsCategoryMenuOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("firstName");
    Cookies.remove("lastName");
    Cookies.remove("avatar");
    Cookies.remove("token");
    setToken(undefined);
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoryMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 border-b border-[color:var(--theme-outline)] bg-[color:rgba(255,252,247,0.88)] text-[color:var(--theme-text)] shadow-[0_12px_32px_rgba(38,52,77,0.08)] backdrop-blur-xl">
      <div className="theme-container py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight"
            >
              <FiSmartphone
                className="text-[color:var(--theme-primary)]"
                size={22}
              />
              <span className="hidden sm:inline">TECH SHOP</span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/Home"
                className="text-sm font-medium text-[color:var(--theme-text-muted)] hover:text-[color:var(--theme-text)] transition-colors"
              >
                Trang chủ
              </Link>
              <Link
                to="/shops"
                className="text-sm font-medium text-[color:var(--theme-text-muted)] hover:text-[color:var(--theme-text)] transition-colors"
              >
                Tất cả
              </Link>
              {featuredCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/categories/${category._id}`}
                  className="text-sm font-medium text-[color:var(--theme-text-muted)] hover:text-[color:var(--theme-text)] transition-colors"
                >
                  {category.name}
                </Link>
              ))}
              {categories.length > 3 ? (
                <div className="relative" ref={categoryMenuRef}>
                  <button
                    type="button"
                    className="flex items-center gap-1 text-sm font-medium text-[color:var(--theme-text-muted)] transition-colors hover:text-[color:var(--theme-text)]"
                    onClick={() =>
                      setIsCategoryMenuOpen((previous) => !previous)
                    }
                    aria-expanded={isCategoryMenuOpen}
                    aria-label="Mở danh sách danh mục"
                  >
                    Danh mục
                    <FiChevronDown
                      size={14}
                      className={`transition-transform ${
                        isCategoryMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isCategoryMenuOpen ? (
                    <div className="absolute left-0 top-full mt-3 w-[260px] rounded-2xl border border-[color:var(--theme-outline)] bg-[color:var(--theme-surface)] p-3 shadow-[0_20px_40px_rgba(38,52,77,0.10)]">
                      <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--theme-text-muted)]">
                        Tất cả danh mục
                      </div>
                      <div className="grid max-h-[320px] gap-1 overflow-auto no-scrollbar">
                        {categories.map((category) => (
                          <Link
                            key={category._id}
                            to={`/categories/${category._id}`}
                            className="rounded-xl px-3 py-2 text-sm font-medium text-[color:var(--theme-text)] transition hover:bg-[color:rgba(49,95,214,0.08)]"
                            onClick={() => setIsCategoryMenuOpen(false)}
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <Link
                to="/promotions"
                className="text-sm font-medium text-[color:var(--theme-text-muted)] hover:text-[color:var(--theme-text)] transition-colors"
              >
                Khuyến mãi
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative hidden lg:block">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[color:var(--theme-text-muted)]"
                size={14}
              />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                className="h-10 w-[260px] rounded-full border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.88)] px-10 text-sm text-[color:var(--theme-text)] placeholder:text-[color:var(--theme-text-muted)] shadow-[0_12px_24px_rgba(38,52,77,0.06)] focus:border-[color:var(--theme-primary)] focus:outline-none transition-all"
                placeholder="Tìm kiếm..."
              />
              {keyword ? (
                <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-xl border border-[color:var(--theme-outline)] bg-[color:var(--theme-surface)] p-2 shadow-[0_20px_40px_rgba(38,52,77,0.10)]">
                  {searchResult.length === 0 ? (
                    <small className="px-2 text-[color:var(--theme-text-muted)]">
                      Không có kết quả.
                    </small>
                  ) : (
                    searchResult.slice(0, 6).map((item) => (
                      <button
                        key={item._id}
                        onClick={() => {
                          navigate(`/products/${item._id}`);
                          setKeyword("");
                          setSearchResult([]);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-[color:var(--theme-text)] transition hover:bg-[color:rgba(49,95,214,0.08)]"
                        type="button"
                      >
                        <img
                          src={item.images?.[0]?.url}
                          alt={item.name}
                          width={36}
                          height={36}
                          className="h-9 w-9 rounded object-cover"
                        />
                        <span>{item.name}</span>
                      </button>
                    ))
                  )}
                </div>
              ) : null}
            </div>

            <Link
              to="/cart"
              className="relative text-[color:var(--theme-text-muted)] hover:text-[color:var(--theme-text)] transition-colors"
            >
              <FiShoppingCart size={20} />
              {cartCount > 0 ? (
                <span className="absolute -top-2 -right-3 rounded-full bg-[color:var(--theme-primary)] px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              ) : null}
            </Link>

            {token ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  className="flex items-center gap-2 rounded-full border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.68)] px-3 py-1.5 text-sm transition hover:bg-[color:rgba(49,95,214,0.08)]"
                  onClick={() => setIsUserMenuOpen((previous) => !previous)}
                  type="button"
                >
                  <img
                    src={profile?.customer?.avatar}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="h-6 w-6 rounded-full object-cover"
                  />
                  <span className="hidden md:inline">
                    {profile?.customer?.firstName} {profile?.customer?.lastName}
                  </span>
                </button>
                {isUserMenuOpen ? (
                  <div className="absolute right-0 mt-2 min-w-[180px] rounded-xl border border-[color:var(--theme-outline)] bg-[color:var(--theme-surface)] p-2 shadow-[0_20px_40px_rgba(38,52,77,0.10)]">
                    <Link
                      to="/profileDetail"
                      className="block rounded-lg px-3 py-1.5 text-sm text-[color:var(--theme-text)] hover:bg-[color:rgba(49,95,214,0.08)]"
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      to="/orderClient"
                      className="block rounded-lg px-3 py-1.5 text-sm text-[color:var(--theme-text)] hover:bg-[color:rgba(49,95,214,0.08)]"
                    >
                      Lịch sử đơn hàng
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full rounded-lg px-3 py-1.5 text-left text-sm text-red-400 hover:bg-red-500/10"
                      type="button"
                    >
                      Đăng xuất
                    </button>
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link
                  to="/signin"
                  className="rounded-full border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.68)] px-3 py-1.5 text-sm transition hover:bg-[color:rgba(49,95,214,0.08)]"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full bg-[color:var(--theme-primary)] px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
                >
                  Đăng ký
                </Link>
              </div>
            )}

            <button
              className="md:hidden text-[color:var(--theme-text-muted)] hover:text-[color:var(--theme-text)] transition-colors"
              onClick={() => setIsMobileMenuOpen((previous) => !previous)}
              type="button"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen ? (
          <nav className="md:hidden mt-3 border-t border-[color:var(--theme-outline)] pt-3">
            <div className="flex flex-col gap-2">
              <Link
                to="/Home"
                className="text-lg font-bold text-[color:var(--theme-text)] hover:text-[color:var(--theme-primary)] transition-colors"
                onClick={closeMobileMenu}
              >
                Trang chủ
              </Link>
              <Link
                to="/shops"
                className="text-lg font-bold text-[color:var(--theme-text)] hover:text-[color:var(--theme-primary)] transition-colors"
                onClick={closeMobileMenu}
              >
                Tất cả
              </Link>
              {featuredCategories.map((category) => (
                <Link
                  key={category._id}
                  to={`/categories/${category._id}`}
                  className="text-sm text-[color:var(--theme-text)] hover:text-[color:var(--theme-text-muted)] transition-colors"
                  onClick={closeMobileMenu}
                >
                  {category.name}
                </Link>
              ))}
              {categories.length > 3 ? (
                <div className="rounded-2xl border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.7)] p-2">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left text-sm font-semibold text-[color:var(--theme-text)] transition hover:bg-[color:rgba(49,95,214,0.08)]"
                    onClick={() =>
                      setIsMobileCategoryMenuOpen((previous) => !previous)
                    }
                    aria-expanded={isMobileCategoryMenuOpen}
                  >
                    <span>Tất cả danh mục</span>
                    <FiChevronDown
                      size={16}
                      className={`transition-transform ${
                        isMobileCategoryMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isMobileCategoryMenuOpen ? (
                    <div className="mt-2 grid gap-1 border-t border-[color:var(--theme-outline)] pt-2">
                      {categories.map((category) => (
                        <Link
                          key={category._id}
                          to={`/categories/${category._id}`}
                          className="rounded-xl px-2 py-2 text-sm text-[color:var(--theme-text)] transition hover:bg-[color:rgba(49,95,214,0.08)]"
                          onClick={() => {
                            setIsMobileCategoryMenuOpen(false);
                            setIsMobileMenuOpen(false);
                          }}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : null}
              <Link
                to="/promotions"
                className="text-lg font-bold text-[color:var(--theme-text)] hover:text-[color:var(--theme-primary)] transition-colors"
                onClick={closeMobileMenu}
              >
                Khuyến mãi
              </Link>

              {token ? (
                <Link
                  to="/profileDetail"
                  className="text-sm text-[color:var(--theme-text)] hover:text-[color:var(--theme-text-muted)] transition-colors"
                  onClick={closeMobileMenu}
                >
                  Tài khoản
                </Link>
              ) : (
                <Link
                  to="/signin"
                  className="w-full rounded-xl bg-[color:var(--theme-primary)] py-3 text-center font-bold text-white transition-colors hover:brightness-110"
                  onClick={closeMobileMenu}
                >
                  Đăng nhập
                </Link>
              )}
            </div>
          </nav>
        ) : null}
      </div>

      {isLoading ? (
        <div className="border-b border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.74)] py-1 text-center text-xs text-[color:var(--theme-text-muted)]">
          Đang tải giỏ hàng...
        </div>
      ) : null}
    </header>
  );
};

export default Header;
