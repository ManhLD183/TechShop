import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Pagination } from "antd";
import { useGetOrderByUserQuery } from "../api/order";
import { translateOrderStatus } from "../utils";

const fallbackProductImage = new URL("../Assets/product2.jpg", import.meta.url)
  .href;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);

const formatDateTime = (date: string) =>
  new Date(date).toLocaleString("vi-VN");

const OrderClient = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetOrderByUserQuery(token);
  const [page, setPage] = useState(1);

  const allOrders = data?.orders ?? [];
  const visibleOrders = allOrders.slice((page - 1) * 4, page * 4);
  const latestOrderDate = allOrders[0]?.createdAt
    ? new Date(allOrders[0].createdAt).toLocaleDateString("vi-VN")
    : "Chưa có đơn hàng";

  return (
    <>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Đang tải...</div>
      ) : (
        <div className="theme-page">
          <div className="theme-container order-history-page">
            <div className="account-page__content order-history-shell">
              <div className="account-page__header">
                <div>
                  <span className="profile-page__eyebrow">Đơn hàng</span>
                  <h1 className="account-page-title">Lịch sử đơn hàng</h1>
                  <p className="account-page__label">
                    Theo dõi toàn bộ đơn đã đặt và mở chi tiết từng đơn khi cần.
                  </p>
                </div>

                <div className="account-page__summary">
                  <span>Tổng đơn hàng</span>
                  <strong>{allOrders.length}</strong>
                  <small>Đơn gần nhất: {latestOrderDate}</small>
                </div>
              </div>

              {visibleOrders.length > 0 ? (
                <div className="order-history__list">
                  {visibleOrders.map((order: any) => (
                    <NavLink
                      to={`/orderDetail/${order._id}`}
                      key={order._id}
                      className="order-history__link"
                    >
                      <article className="order-card">
                        <div className="order-header">
                          <div>
                            <p className="order-title">{order.code}</p>
                            <p className="order-date">
                              {formatDateTime(order.createdAt)}
                            </p>
                          </div>

                          <div className="order-status-badge order-status-badge-canceled">
                            <span>{translateOrderStatus(order.status)}</span>
                          </div>
                        </div>

                        {order.items?.map((item: any) => (
                          <div className="order-body" key={item._id}>
                            <div className="order-item">
                              <div className="order-item-thumbnail">
                                <img
                                  src={
                                    item?.productId?.images?.[0]?.url ||
                                    fallbackProductImage
                                  }
                                  alt={
                                    item?.productName ??
                                    item?.productVariantName ??
                                    "Sản phẩm"
                                  }
                                />
                              </div>

                              <div className="order-item-info">
                                <div className="order-item-title">
                                  {item?.productName ??
                                    item?.productId?.name ??
                                    item?.productVariantName}
                                </div>
                                <div className="order-item-variant-label">
                                  Biến thể: {item?.productVariantName}
                                </div>
                                <div className="order-item-quantity">
                                  Số lượng: {item.quantity}
                                </div>
                                <div className="order-item-price">
                                  {formatPrice(item?.productVariantPrice ?? 0)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="order-footer">
                          <div className="order-footer__left">
                            <span className="order-footer__meta">
                              {order.items?.length ?? 0} sản phẩm
                            </span>
                          </div>
                          <div className="order-footer__right">
                            <span>Tổng thanh toán</span>
                            <b>{formatPrice(order.orderTotalPrice ?? 0)}</b>
                          </div>
                        </div>
                      </article>
                    </NavLink>
                  ))}
                </div>
              ) : (
                <div className="order-history__empty">
                  <h3>Chưa có đơn hàng nào</h3>
                  <p>
                    Khi bạn hoàn tất đơn đầu tiên, lịch sử mua hàng sẽ hiển thị
                    tại đây.
                  </p>
                </div>
              )}

              {allOrders.length > 4 ? (
                <div className="order-history__pagination">
                  <Pagination
                    current={page}
                    onChange={(value) => setPage(value)}
                    total={allOrders.length}
                    pageSize={4}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderClient;
