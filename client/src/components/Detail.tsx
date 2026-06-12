import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { InputNumber, Pagination, Rate, message } from "antd";
import Swal from "sweetalert2";
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiPackage,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from "react-icons/fi";

import { useGetProductQuery } from "../api/product";
import { useAddItemCartMutation, useGetCartOfUserQuery } from "../api/cart";
import { useGetAllCommentByProductQuery } from "../api/comment";
import { getCategoryDetail } from "../api/category";

const fallbackProductImage = new URL("../Assets/product2.jpg", import.meta.url)
  .href;

const Detail = () => {
  const { id } = useParams();
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const { data: product, isLoading } = useGetProductQuery(id);
  const { data: carts } = useGetCartOfUserQuery(token);
  const { data } = useGetAllCommentByProductQuery(id);
  const [addItemToCart] = useAddItemCartMutation();

  const [selectedAttributes, setSelectedAttributes] = useState<any>({});
  const [selectedImage, setSelectedImage] = useState(fallbackProductImage);
  const [category, setCategory] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [isCheckQuantity, setIsCheckQuantity] = useState(false);

  const selectedVariant = useMemo(() => {
    return product?.productVariantIds.find((item: any) =>
      item.options.every((option: any) =>
        Object.values(selectedAttributes).includes(option),
      ),
    );
  }, [product?.productVariantIds, selectedAttributes]);

  const visibleComments = useMemo(() => {
    return (
      data?.comments?.filter((item: any) => item.isHidden === false) ?? []
    );
  }, [data?.comments]);

  const averageRating = useMemo(() => {
    if (visibleComments.length === 0) return 0;

    return (
      visibleComments.reduce(
        (accumulator: number, currentValue: any) =>
          accumulator + currentValue.raiting,
        0,
      ) / visibleComments.length
    );
  }, [visibleComments]);

  const galleryImages = useMemo(() => {
    const images: string[] = [];

    if (selectedVariant?.image && !images.includes(selectedVariant.image)) {
      images.push(selectedVariant.image);
    }

    product?.images?.forEach((item: any) => {
      if (item?.url && !images.includes(item.url)) {
        images.push(item.url);
      }
    });

    if (images.length === 0) {
      images.push(fallbackProductImage);
    }

    return images;
  }, [product?.images, selectedVariant?.image]);

  const quantityProduct = useMemo(() => {
    if (!product) return 0;

    if (Object.keys(selectedAttributes).length !== product.options.length) {
      return product.productVariantIds.reduce(
        (total: number, variant: any) => total + variant.inventory,
        0,
      );
    }

    return selectedVariant?.inventory ?? 0;
  }, [product, selectedAttributes, selectedVariant]);

  const pagedRelatedProducts = useMemo(() => {
    const start = (page - 1) * 4;
    return relatedProducts.slice(start, start + 4);
  }, [page, relatedProducts]);

  useEffect(() => {
    setSelectedAttributes({});
    setSelectedImage(fallbackProductImage);
    setPage(1);
    setQuantity(1);
    setIsCheckQuantity(false);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setSelectedImage(galleryImages[0] || fallbackProductImage);
  }, [galleryImages]);

  useEffect(() => {
    let ignore = false;

    const fetchCategoryDetail = async () => {
      if (!product?.categoryId) {
        setCategory(null);
        setRelatedProducts([]);
        return;
      }

      const response = await getCategoryDetail(product.categoryId);
      if (ignore) return;

      setCategory(response?.data ?? null);
      setRelatedProducts(
        (response?.data?.productIds ?? []).filter((item: any) => item._id !== id),
      );
    };

    fetchCategoryDetail();

    return () => {
      ignore = true;
    };
  }, [product?.categoryId, id]);

  useEffect(() => {
    if (quantityProduct === 0) {
      setQuantity(1);
      return;
    }

    if (quantity > quantityProduct) {
      setQuantity(quantityProduct);
      setIsCheckQuantity(true);
    }
  }, [quantity, quantityProduct]);

  const formatPrice = (price: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price ?? 0);
  };

  const formatProductPrice = (item: any) => {
    if (item.minPrice === item.maxPrice) {
      return formatPrice(item.maxPrice);
    }

    return `${formatPrice(item.minPrice)} - ${formatPrice(item.maxPrice)}`;
  };

  const handleAttributeChange = (attributeName: string, value: string) => {
    setQuantity(1);
    setIsCheckQuantity(false);
    setSelectedAttributes((previous: any) => ({
      ...previous,
      [attributeName]: value,
    }));
  };

  const handleAddToCart = async () => {
    if (!product) return;

    if (!selectedVariant) {
      if (Object.keys(selectedAttributes).length === 0) {
        message.error("Vui lòng chọn thuộc tính của sản phẩm.");
      } else if (
        product.options.length !== Object.keys(selectedAttributes).length
      ) {
        message.error("Vui lòng chọn đủ thuộc tính sản phẩm.");
      } else {
        message.error("Biến thể không tồn tại.");
      }
      return;
    }

    if (!token) {
      message.error("Đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    const itemCart = carts?.find((item: any) => {
      return item.productVariantIds._id === selectedVariant._id;
    });

    if (itemCart && itemCart.quantity + quantity > selectedVariant.inventory) {
      Swal.fire({
        icon: "error",
        title: "Quá số lượng tồn kho",
      });
      return;
    }

    if (selectedVariant.inventory <= 0) {
      Swal.fire({
        icon: "error",
        title: "Sản phẩm đã hết hàng",
      });
      return;
    }

    const response: any = await addItemToCart({
      token,
      productVariantIds: selectedVariant._id,
      productVariantName: selectedVariant.name,
      productName: product.name,
      productVariantPrice: selectedVariant.price,
      image: selectedVariant.image || galleryImages[0],
      quantity,
    });

    if (response?.error) {
      message.error(response?.error?.data?.message);
      return;
    }

    message.success("Sản phẩm đã được thêm vào giỏ hàng.");
  };

  if (isLoading) {
    return (
      <div className="theme-page">
        <div className="theme-container pt-28 pb-16 text-center text-base text-[color:var(--theme-text-muted)]">
          Đang tải sản phẩm...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="theme-page">
        <div className="theme-container pt-28 pb-16 text-center text-base text-[color:var(--theme-text-muted)]">
          Sản phẩm không tồn tại.
        </div>
      </div>
    );
  }

  return (
    <main className="theme-page">
      <div className="theme-container space-y-8 pt-28 pb-20">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--theme-text-muted)]">
          <button
            type="button"
            className="transition hover:text-[color:var(--theme-primary)]"
            onClick={() => navigate("/shops")}
          >
            Tất cả sản phẩm
          </button>
          <span>/</span>
          <span>{category?.name || "Chi tiết sản phẩm"}</span>
          <span>/</span>
          <span className="font-medium text-[color:var(--theme-text)]">
            {product.name}
          </span>
        </div>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(380px,0.95fr)]">
          <div className="theme-surface overflow-hidden p-0">
            <div className="bg-[color:rgba(255,255,255,0.84)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
              <div className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(49,95,214,0.1),transparent_42%),rgba(248,244,236,0.92)]">
                <img
                  src={selectedImage || galleryImages[0]}
                  alt={product.name}
                  className="aspect-square w-full scale-[1.08] object-cover object-[62%_center]"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3 px-5 pb-5 pt-4 sm:grid-cols-5 sm:px-6 sm:pb-6">
              {galleryImages.map((image, index) => {
                const isSelected = selectedImage === image;

                return (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`overflow-hidden rounded-[1.25rem] border p-1.5 transition ${
                      isSelected
                        ? "border-[color:var(--theme-primary)] bg-[color:rgba(49,95,214,0.08)] shadow-[0_14px_28px_rgba(49,95,214,0.12)]"
                        : "border-[color:var(--theme-outline)] bg-white hover:border-[color:rgba(49,95,214,0.18)]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="aspect-square w-full rounded-[0.9rem] object-cover object-[62%_center]"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="theme-surface p-6 sm:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[color:rgba(49,95,214,0.1)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--theme-primary)]">
                Chính hãng
              </span>
              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                  quantityProduct > 0
                    ? "bg-[color:rgba(47,143,91,0.12)] text-[color:#2f8f5b]"
                    : "bg-[color:rgba(212,123,76,0.14)] text-[color:var(--theme-secondary)]"
                }`}
              >
                {quantityProduct > 0 ? "Còn hàng" : "Hết hàng"}
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[color:var(--theme-text)] sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-3 rounded-full border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.78)] px-4 py-2">
                <Rate allowHalf disabled value={averageRating} />
                <span className="text-sm font-semibold text-[color:var(--theme-text)]">
                  {averageRating ? averageRating.toFixed(1) : "0.0"}
                </span>
              </div>
              <span className="text-sm text-[color:var(--theme-text-muted)]">
                {visibleComments.length} đánh giá từ khách hàng
              </span>
            </div>

            <div className="mt-6 rounded-[2rem] border border-[color:var(--theme-outline)] bg-[linear-gradient(135deg,rgba(49,95,214,0.1),rgba(255,255,255,0.94))] p-5">
              <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--theme-text-muted)]">
                Giá bán hiện tại
              </div>
              <div className="mt-2 text-3xl font-bold text-[color:var(--theme-primary)]">
                {selectedVariant
                  ? formatPrice(selectedVariant.price)
                  : product.minPrice === product.maxPrice
                    ? formatPrice(product.minPrice)
                    : `${formatPrice(product.minPrice)} - ${formatPrice(
                        product.maxPrice,
                      )}`}
              </div>
              <p className="mt-2 text-sm text-[color:var(--theme-text-muted)]">
                Giá hiển thị thay đổi theo biến thể và đã bao gồm VAT.
              </p>
            </div>

            {product.options.length > 0 ? (
              <div className="mt-6 space-y-5">
                {product.options.map((productItem: any) => (
                  <div key={productItem.name} className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-[color:var(--theme-text)]">
                        {productItem.name}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.14em] text-[color:var(--theme-text-muted)]">
                        {selectedAttributes[productItem.name] || "Chưa chọn"}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {productItem.values.map((item: string) => {
                        const isSelected =
                          selectedAttributes[productItem.name] === item;

                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() =>
                              handleAttributeChange(productItem.name, item)
                            }
                            className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition ${
                              isSelected
                                ? "border-[color:var(--theme-primary)] bg-[color:rgba(49,95,214,0.1)] text-[color:var(--theme-primary)] shadow-[0_12px_24px_rgba(49,95,214,0.1)]"
                                : "border-[color:var(--theme-outline)] bg-white text-[color:var(--theme-text)] hover:border-[color:rgba(49,95,214,0.2)]"
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="mt-6 rounded-[2rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.84)] p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[color:var(--theme-text)]">
                    Tồn kho khả dụng: {quantityProduct}
                  </p>
                  <p className="mt-1 text-sm text-[color:var(--theme-text-muted)]">
                    {product.options.length > 0 &&
                    Object.keys(selectedAttributes).length <
                      product.options.length
                      ? "Chọn đủ thuộc tính để xác định chính xác biến thể."
                      : selectedVariant
                        ? `Biến thể đang chọn: ${selectedVariant.name}`
                        : "Vui lòng chọn biến thể phù hợp trước khi thêm vào giỏ."}
                  </p>
                </div>
                {isCheckQuantity ? (
                  <p className="text-sm font-medium text-[color:#d47b4c]">
                    Chỉ có thể mua tối đa {quantityProduct} sản phẩm.
                  </p>
                ) : null}
              </div>

              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[color:var(--theme-text-muted)]">
                    Số lượng
                  </p>
                  <div className="inline-flex items-center rounded-2xl border border-[color:var(--theme-outline)] bg-white px-2 py-2 shadow-[0_10px_20px_rgba(38,52,77,0.04)]">
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-semibold text-[color:var(--theme-text)] transition hover:bg-[color:rgba(49,95,214,0.08)]"
                      onClick={() => {
                        if (quantity === 1) return;
                        setQuantity(quantity - 1);
                        setIsCheckQuantity(false);
                      }}
                    >
                      -
                    </button>
                    <InputNumber
                      controls={false}
                      min={1}
                      value={quantity}
                      style={{ width: 72 }}
                      className="border-0 bg-transparent"
                      onChange={(value) => {
                        const nextValue = Number(value ?? 1);

                        if (quantityProduct === 0) {
                          setQuantity(1);
                          return;
                        }

                        if (nextValue <= quantityProduct) {
                          setQuantity(Math.max(nextValue, 1));
                          setIsCheckQuantity(false);
                          return;
                        }

                        setQuantity(quantityProduct);
                        setIsCheckQuantity(true);
                      }}
                    />
                    <button
                      type="button"
                      className="flex h-10 w-10 items-center justify-center rounded-xl text-lg font-semibold text-[color:var(--theme-text)] transition hover:bg-[color:rgba(49,95,214,0.08)]"
                      onClick={() => {
                        if (quantity >= quantityProduct) {
                          setIsCheckQuantity(true);
                          return;
                        }

                        setQuantity(quantity + 1);
                        setIsCheckQuantity(false);
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant || quantityProduct <= 0}
                  className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full bg-[color:var(--theme-primary)] px-8 py-3 text-sm font-bold text-white shadow-[0_18px_36px_rgba(49,95,214,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiShoppingBag size={18} />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.8)] p-4">
                <FiTruck
                  className="text-[color:var(--theme-primary)]"
                  size={18}
                />
                <p className="mt-3 text-sm font-semibold text-[color:var(--theme-text)]">
                  Giao hàng nhanh
                </p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--theme-text-muted)]">
                  Hỗ trợ giao toàn quốc và kiểm tra khi nhận hàng.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.8)] p-4">
                <FiShield
                  className="text-[color:var(--theme-primary)]"
                  size={18}
                />
                <p className="mt-3 text-sm font-semibold text-[color:var(--theme-text)]">
                  Bảo hành chính hãng
                </p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--theme-text-muted)]">
                  Chính sách rõ ràng, hỗ trợ sau bán hàng nhanh chóng.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.8)] p-4">
                <FiPackage
                  className="text-[color:var(--theme-primary)]"
                  size={18}
                />
                <p className="mt-3 text-sm font-semibold text-[color:var(--theme-text)]">
                  Đóng gói an toàn
                </p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--theme-text-muted)]">
                  Sản phẩm được kiểm tra và đóng gói kỹ trước khi giao đi.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1.05fr)_320px]">
          <div className="theme-surface p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:rgba(49,95,214,0.12)] text-[color:var(--theme-primary)]">
                <FiPackage size={18} />
              </span>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--theme-text)]">
                  Mô tả sản phẩm
                </h2>
                <p className="mt-1 text-sm text-[color:var(--theme-text-muted)]">
                  Thông tin chi tiết để bạn đánh giá sản phẩm kỹ hơn trước khi
                  đặt mua.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.78)] p-5">
              <p className="whitespace-pre-line leading-8 text-[color:var(--theme-text-muted)]">
                {product.description || "Sản phẩm hiện chưa có mô tả chi tiết."}
              </p>
            </div>
          </div>

          <aside className="theme-surface p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:rgba(49,95,214,0.12)] text-[color:var(--theme-primary)]">
                <FiCheckCircle size={18} />
              </span>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--theme-text)]">
                  Tổng quan đánh giá
                </h2>
                <p className="mt-1 text-sm text-[color:var(--theme-text-muted)]">
                  Tóm tắt phản hồi từ người dùng đã mua sản phẩm.
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-[1.75rem] border border-[color:var(--theme-outline)] bg-[linear-gradient(135deg,rgba(49,95,214,0.1),rgba(255,255,255,0.94))] p-5">
              <div className="text-4xl font-bold text-[color:var(--theme-primary)]">
                {averageRating ? averageRating.toFixed(1) : "0.0"}
              </div>
              <div className="mt-3">
                <Rate allowHalf disabled value={averageRating} />
              </div>
              <p className="mt-3 text-sm text-[color:var(--theme-text-muted)]">
                Dựa trên {visibleComments.length} đánh giá công khai từ khách
                hàng.
              </p>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-[1.5rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.78)] p-4">
                <p className="text-sm font-semibold text-[color:var(--theme-text)]">
                  Hoàn tiền và đổi trả
                </p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--theme-text-muted)]">
                  Chính sách hỗ trợ linh hoạt theo điều kiện áp dụng tại cửa
                  hàng.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.78)] p-4">
                <p className="text-sm font-semibold text-[color:var(--theme-text)]">
                  Tư vấn trước khi mua
                </p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--theme-text-muted)]">
                  Hỗ trợ lựa chọn cấu hình và biến thể phù hợp theo nhu cầu.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="theme-surface p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--theme-text)]">
                Nhận xét và đánh giá
              </h2>
              <p className="mt-1 text-sm text-[color:var(--theme-text-muted)]">
                Trải nghiệm thực tế từ khách hàng đã đặt mua sản phẩm này.
              </p>
            </div>
            <div className="rounded-full border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.78)] px-4 py-2 text-sm font-medium text-[color:var(--theme-text-muted)]">
              {visibleComments.length} phản hồi
            </div>
          </div>

          {visibleComments.length === 0 ? (
            <div className="mt-6 rounded-[1.75rem] border border-dashed border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.72)] px-6 py-10 text-center">
              <p className="text-base font-medium text-[color:var(--theme-text)]">
                Sản phẩm chưa có đánh giá nào.
              </p>
              <p className="mt-2 text-sm text-[color:var(--theme-text-muted)]">
                Hãy là người đầu tiên chia sẻ trải nghiệm của bạn sau khi mua
                hàng.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {visibleComments.map((item: any) => (
                <article
                  key={item._id}
                  className="rounded-[1.75rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.8)] p-5"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={item.customerId?.avatar || fallbackProductImage}
                      alt={item.customerId?.firstName || "Khách hàng"}
                      className="h-12 w-12 rounded-2xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-[color:var(--theme-text)]">
                            {item.customerId?.firstName} {item.customerId?.lastName}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[color:var(--theme-text-muted)]">
                            {new Date(item.createdAt).toLocaleString("vi-VN")}
                          </p>
                        </div>
                        <Rate disabled value={item.raiting} />
                      </div>
                      <p className="mt-4 leading-7 text-[color:var(--theme-text-muted)]">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="theme-surface p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--theme-text)]">
                Sản phẩm liên quan
              </h2>
              <p className="mt-1 text-sm text-[color:var(--theme-text-muted)]">
                Một vài gợi ý trong cùng danh mục để bạn tiếp tục tham khảo.
              </p>
            </div>
            <div className="rounded-full border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.78)] px-4 py-2 text-sm font-medium text-[color:var(--theme-text-muted)]">
              {relatedProducts.length} sản phẩm
            </div>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {pagedRelatedProducts.map((relatedProduct: any) => (
              <article
                key={relatedProduct._id}
                onClick={() => navigate(`/products/${relatedProduct._id}`)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-[2rem] border border-[color:var(--theme-outline)] bg-[color:rgba(255,255,255,0.84)] transition hover:-translate-y-1 hover:border-[color:rgba(49,95,214,0.24)] hover:shadow-[0_18px_36px_rgba(38,52,77,0.1)]"
              >
                <div className="relative aspect-[4/4.3] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(49,95,214,0.08),transparent_42%),rgba(248,244,236,0.92)] p-4">
                  <div className="absolute left-6 top-6 z-10 rounded-full bg-[color:rgba(255,255,255,0.92)] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--theme-text-muted)] shadow-[0_10px_20px_rgba(38,52,77,0.08)]">
                    {relatedProduct?.categoryId?.name || category?.name || "Tech Shop"}
                  </div>
                  <div className="absolute right-6 top-6 z-10 inline-flex items-center gap-1 rounded-full bg-[color:rgba(49,95,214,0.1)] px-3 py-1.5 text-xs font-semibold text-[color:var(--theme-primary)] shadow-[0_10px_20px_rgba(38,52,77,0.08)]">
                    <FiStar size={13} />
                    {Number(relatedProduct?.raitings || 0).toFixed(1)}
                  </div>
                  <img
                    src={relatedProduct?.images?.[0]?.url || fallbackProductImage}
                    alt={relatedProduct?.name || "Product image"}
                    className="h-full w-full rounded-[1.5rem] object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--theme-text-muted)]">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--theme-primary)]" />
                    Gợi ý cùng danh mục
                  </div>
                  <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-7 text-[color:var(--theme-text)]">
                    {relatedProduct.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[color:var(--theme-text-muted)]">
                    Thiết kế đồng bộ, mức giá dễ tiếp cận và phù hợp để tham khảo thêm trong cùng nhóm sản phẩm.
                  </p>

                  <div className="mt-auto pt-5">
                    <div className="rounded-[1.5rem] border border-[color:rgba(49,95,214,0.12)] bg-[linear-gradient(135deg,rgba(49,95,214,0.08),rgba(255,255,255,0.94))] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--theme-text-muted)]">
                        Mức giá tham khảo
                      </p>
                      <div className="mt-2 flex items-end justify-between gap-3">
                        <p className="text-base font-bold text-[color:var(--theme-primary)]">
                          {formatProductPrice(relatedProduct)}
                        </p>
                        <div className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-[color:var(--theme-text-muted)] shadow-[0_8px_16px_rgba(38,52,77,0.06)]">
                          <FiStar
                            size={12}
                            className="text-[color:var(--theme-primary)]"
                          />
                          {Number(relatedProduct?.raitings || 0).toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-[color:var(--theme-outline)] pt-4">
                      <span className="text-sm font-semibold text-[color:var(--theme-text)]">
                        Xem chi tiết
                      </span>
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--theme-primary)] text-white shadow-[0_12px_24px_rgba(49,95,214,0.18)] transition-transform group-hover:translate-x-1">
                        <FiArrowUpRight size={16} />
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {relatedProducts.length > 4 ? (
            <div className="mt-8 flex justify-center">
              <Pagination
                current={page}
                total={relatedProducts.length}
                pageSize={4}
                onChange={(value) => setPage(value)}
              />
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
};

export default Detail;
