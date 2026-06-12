import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../Assets/orderDetail.css";
import { useCancelOrderMutation, useGetOneOrderQuery } from "../api/order";
import Cookies from "js-cookie";
import { Form, Rate, message } from "antd";
import { useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { useCreateCommentMutation } from "../api/comment";
import Swal from "sweetalert2";
import { useForm } from "antd/es/form/Form";
import { Modal } from "./ui";
import {
  translateOrderDeliveryStatus,
  translateOrderPaymentStatus,
  translateOrderStatus,
} from "../utils";

const sensitiveWords = ["clm", "buoi", "dmm"];
const fallbackProductImage = new URL("../Assets/product2.jpg", import.meta.url)
  .href;

const OrderDetail = () => {
  const { id }: any = useParams();
  const token = Cookies.get("token");
  const { data, isLoading } = useGetOneOrderQuery(id);
  const [cancelOrder] = useCancelOrderMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenReview, setIsModalOpenReview] = useState(false);
  const [productId, setProductId] = useState<string>();
  const [reviewProductName, setReviewProductName] = useState("");
  const [raiting, setRaiting] = useState<any>(0);
  const [content, setContent] = useState<any>();
  const [infoStaff, setInforStaff] = useState<any>("");
  const [createComment] = useCreateCommentMutation();
  const [form] = useForm();
  const navigate = useNavigate();

  const order = data?.order;

  const formatPrice = (price: any) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price ?? 0);

  const formatDateTime = (date: string) =>
    new Date(date).toLocaleString("vi-VN");

  const paymentMethodLabel =
    order?.typePayment === "Direct" ? "Trực tiếp khi nhận hàng" : "Online";

  const canCancelOrder =
    order?.deliveryStatus !== "Shipping" &&
    order?.status !== "Completed" &&
    order?.status !== "Canceled";

  const containsSensitiveWord = sensitiveWords.some((word) =>
    content?.toLowerCase().includes(word.toLowerCase())
  );

  const totalProducts = useMemo(
    () =>
      order?.items?.reduce(
        (total: number, item: any) => total + (item.quantity ?? 0),
        0
      ) ?? 0,
    [order?.items]
  );

  const validateContent = (_rule: any, value: any, callback: any) => {
    const hasSensitiveWord = sensitiveWords.some((word) =>
      value?.toLowerCase().includes(word.toLowerCase())
    );

    if (hasSensitiveWord) {
      callback && callback("Bình luận không được chứa từ ngữ nhạy cảm");
      return;
    }

    callback && callback();
  };

  const openStaffModal = () => {
    setIsModalOpen(true);
  };

  const closeStaffModal = () => {
    setIsModalOpen(false);
    setInforStaff("");
  };

  const openReviewModal = (item: any) => {
    setProductId(item.productId?._id);
    setReviewProductName(item?.productName ?? item.productId?.name ?? "");
    setIsModalOpenReview(true);
  };

  const closeReviewModal = () => {
    form.resetFields();
    setContent("");
    setRaiting(0);
    setProductId(undefined);
    setReviewProductName("");
    setIsModalOpenReview(false);
  };

  const onFinish = async () => {
    if (containsSensitiveWord || !productId) return;

    const comment: any = await createComment({
      token,
      comment: { raiting, content, productId, orderId: id },
    });

    if (!comment?.error) {
      Swal.fire("Good job!", comment.data.message, "success");
      form.resetFields();
      setContent("");
      setRaiting(0);
      navigate(`/products/${productId}`);
      return;
    }

    Swal.fire({
      icon: "error",
      title: comment?.error.data.message,
    });
  };

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Đang tải...</div>
      ) : (
        <div className="theme-page">
          <div className="theme-container order-detail-page">
            <div className="order-detail-shell">
              <section className="order-detail-hero">
                <div className="order-detail-hero__content">
                  <span className="order-detail-overline">
                    Chi tiết đơn hàng
                  </span>
                  <div className="order-detail-heading-row">
                    <h1 className="detail-order-heading">
                      Đơn hàng {order?.code}
                    </h1>
                    <div className="detail-order-status">
                      {translateOrderStatus(order?.status)}
                    </div>
                  </div>
                  <p className="order-detail-subtitle">
                    Theo dõi trạng thái thanh toán, giao hàng và toàn bộ sản
                    phẩm trong đơn tại một giao diện gọn, dễ đọc hơn.
                  </p>
                </div>

                <div className="order-detail-hero__summary">
                  <div className="order-detail-highlight">
                    <span>Ngày đặt</span>
                    <strong>{formatDateTime(order?.createdAt)}</strong>
                  </div>
                  <div className="order-detail-highlight">
                    <span>Tổng thanh toán</span>
                    <strong>{formatPrice(order?.orderTotalPrice)}</strong>
                  </div>
                  {canCancelOrder ? (
                    <button
                      className="order-cancel-button"
                      onClick={async () => {
                        if (confirm("Bạn có muốn hủy đơn hàng không?")) {
                          const response: any = await cancelOrder({ token, id });
                          if (response?.error) {
                            message.error("Bạn không thể hủy đơn hàng");
                          } else {
                            message.success("Hủy đơn hàng thành công");
                          }
                        }
                      }}
                    >
                      Hủy đơn
                    </button>
                  ) : null}
                </div>
              </section>

              <div className="order-detail-grid">
                <section className="order-detail-card">
                  <div className="order-detail-section__header">
                    <div>
                      <span className="order-detail-card__eyebrow">
                        Thông tin nhận hàng
                      </span>
                      <h2>Người nhận và giao hàng</h2>
                    </div>
                  </div>

                  <div className="order-detail-info-grid">
                    <div className="order-info-item">
                      <span>Tên người nhận</span>
                      <strong>{order?.fullName}</strong>
                    </div>
                    <div className="order-info-item">
                      <span>Email</span>
                      <strong>{order?.email}</strong>
                    </div>
                    <div className="order-info-item">
                      <span>Số điện thoại</span>
                      <strong>{order?.phone}</strong>
                    </div>
                    <div className="order-info-item">
                      <span>Địa chỉ giao hàng</span>
                      <strong>{order?.address}</strong>
                    </div>
                    <div className="order-info-item">
                      <span>Phương thức thanh toán</span>
                      <strong>{paymentMethodLabel}</strong>
                    </div>
                    <div className="order-info-item">
                      <span>Mã giảm giá</span>
                      <strong>{order?.discountCode || "Không sử dụng"}</strong>
                    </div>
                    <div className="order-info-item">
                      <span>Nhân viên quản lý đơn</span>
                      <div className="order-info-item__action">
                        <strong>
                          {order?.managerId?.firstName}{" "}
                          {order?.managerId?.lastName}
                        </strong>
                        <button
                          type="button"
                          className="order-detail-inline-button"
                          onClick={() => {
                            openStaffModal();
                            setInforStaff(order?.managerId);
                          }}
                        >
                          Xem
                        </button>
                      </div>
                    </div>
                    {order?.note ? (
                      <div className="order-info-item order-info-item--full">
                        <span>Ghi chú</span>
                        <strong>{order.note}</strong>
                      </div>
                    ) : null}
                  </div>
                </section>

                <aside className="order-detail-card order-detail-card--summary">
                  <span className="order-detail-card__eyebrow">Tổng quan</span>
                  <h2>Thanh toán và giao hàng</h2>

                  <div className="order-detail-status-stack">
                    <div className="order-detail-status-panel">
                      <span>Thanh toán</span>
                      <div className="detail-order-status">
                        {translateOrderPaymentStatus(order?.paymentStatus)}
                      </div>
                    </div>
                    <div className="order-detail-status-panel">
                      <span>Giao hàng</span>
                      <div className="detail-order-status">
                        {translateOrderDeliveryStatus(order?.deliveryStatus)}
                      </div>
                    </div>
                  </div>

                  <div className="order-summary-rows">
                    <div className="order-summary-row">
                      <span>Tạm tính</span>
                      <strong>{formatPrice(order?.totalPrice)}</strong>
                    </div>
                    <div className="order-summary-row">
                      <span>Giảm giá</span>
                      <strong>{formatPrice(order?.couponPrice)}</strong>
                    </div>
                    <div className="order-summary-row">
                      <span>Phí giao hàng</span>
                      <strong>{formatPrice(order?.shippingPrice)}</strong>
                    </div>
                    <div className="order-summary-row order-summary-row--total">
                      <span>Tổng thanh toán</span>
                      <strong>{formatPrice(order?.orderTotalPrice)}</strong>
                    </div>
                  </div>
                </aside>
              </div>

              <section className="order-detail-card order-detail-products">
                <div className="order-detail-section__header">
                  <div>
                    <span className="order-detail-card__eyebrow">
                      Danh sách sản phẩm
                    </span>
                    <h2>Sản phẩm trong đơn</h2>
                  </div>
                  <div className="order-detail-products__meta">
                    {totalProducts} sản phẩm
                  </div>
                </div>

                <div className="order-products-list">
                  {order?.items?.map((item: any) => (
                    <article className="order-product-card" key={item._id}>
                      <div className="order-product-card__media">
                        <img
                          src={item?.image || fallbackProductImage}
                          alt={
                            item?.productName ??
                            item?.productId?.name ??
                            "Sản phẩm"
                          }
                        />
                      </div>

                      <div className="order-product-card__main">
                        <div className="order-product-card__title">
                          {item?.productName ?? item?.productId?.name}
                        </div>
                        <div className="order-product-card__meta">
                          <span>Biến thể: {item?.productVariantName}</span>
                          <span>Số lượng: {item.quantity}</span>
                          <span>
                            Đơn giá: {formatPrice(item?.productVariantPrice)}
                          </span>
                        </div>
                      </div>

                      <div className="order-product-card__aside">
                        <div className="order-product-card__total">
                          {formatPrice(
                            item?.quantity * item?.productVariantPrice
                          )}
                        </div>

                        {order?.status === "Completed" ? (
                          item?.isReview === true ? (
                            <NavLink
                              to={`/products/${item.productId._id}`}
                              className="order-review-button order-review-button--muted"
                            >
                              Đã đánh giá
                            </NavLink>
                          ) : (
                            <button
                              type="button"
                              className="order-review-button"
                              onClick={() => openReviewModal(item)}
                            >
                              Đánh giá
                            </button>
                          )
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="order-detail-card order-detail-totals">
                <div className="order-detail-section__header">
                  <div>
                    <span className="order-detail-card__eyebrow">
                      Tổng kết đơn hàng
                    </span>
                    <h2>Chi phí cuối cùng</h2>
                  </div>
                </div>

                <div className="order-totals-grid">
                  <div className="order-totals-item">
                    <span>Tổng giá trị sản phẩm</span>
                    <strong>{formatPrice(order?.totalPrice)}</strong>
                  </div>
                  <div className="order-totals-item">
                    <span>Giảm giá</span>
                    <strong>{formatPrice(order?.couponPrice)}</strong>
                  </div>
                  <div className="order-totals-item">
                    <span>Phí giao hàng</span>
                    <strong>{formatPrice(order?.shippingPrice)}</strong>
                  </div>
                  <div className="order-totals-item order-totals-item--grand">
                    <span>Tổng thanh toán</span>
                    <strong>{formatPrice(order?.orderTotalPrice)}</strong>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Thông tin nhân viên quản lý đơn"
        open={isModalOpen}
        onOk={closeStaffModal}
        onCancel={closeStaffModal}
      >
        <div className="order-staff-modal">
          <p>Số điện thoại: {infoStaff?.phone}</p>
          <p>Email: {infoStaff?.email}</p>
        </div>
      </Modal>

      <Modal
        title={`Đánh giá sản phẩm${
          reviewProductName ? `: ${reviewProductName}` : ""
        }`}
        open={isModalOpenReview}
        onOk={closeReviewModal}
        onCancel={closeReviewModal}
      >
        <Form form={form}>
          <div className="box_rating">
            <Form.Item name="rating" initialValue={0}>
              <Rate value={raiting} onChange={(value) => setRaiting(value)} />
            </Form.Item>
          </div>
          <Form.Item
            name="review"
            rules={[
              {
                required: true,
                message: "Không được bỏ trống bình luận",
              },
              {
                validator: validateContent,
              },
            ]}
          >
            <TextArea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              showCount
              maxLength={100}
              style={{ height: 120, resize: "none" }}
              placeholder="Hãy bình luận về sản phẩm này"
            />
          </Form.Item>
          <div className="wrap__button">
            <button
              type="button"
              disabled={!content || containsSensitiveWord}
              onClick={() => onFinish()}
              className="order-review-submit"
            >
              Đánh giá
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default OrderDetail;
