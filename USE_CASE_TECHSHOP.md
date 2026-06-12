# TechShop Use Case Diagram

Use the Mermaid block below in Markdown preview or Mermaid Live Editor.

```mermaid
flowchart LR
    guest[Khach vang lai]
    customer[Khach hang]
    admin[Quan tri vien]
    momo[Cong thanh toan MoMo]

    subgraph techshop[He thong TechShop]
        uc_browse((Xem danh muc va san pham))
        uc_search((Tim kiem, loc, sap xep san pham))
        uc_detail((Xem chi tiet san pham))
        uc_signup((Dang ky / Dang nhap))
        uc_cart((Quan ly gio hang))
        uc_coupon((Ap dung ma giam gia / gift))
        uc_address((Quan ly dia chi nhan hang))
        uc_checkout((Dat hang))
        uc_payment((Thanh toan online))
        uc_profile((Quan ly thong tin ca nhan))
        uc_orders((Xem lich su va chi tiet don hang))
        uc_cancel((Huy don hang))
        uc_review((Danh gia san pham))

        uc_dashboard((Xem dashboard va thong ke))
        uc_categories((Quan ly danh muc))
        uc_products((Quan ly san pham))
        uc_variants((Quan ly bien the, SKU, IMEI))
        uc_inventory((Quan ly ton kho))
        uc_discounts((Quan ly khuyen mai / ma giam gia))
        uc_customers((Quan ly khach hang))
        uc_admin_orders((Quan ly don hang))
        uc_status((Cap nhat trang thai don hang / thanh toan / giao hang))
    end

    guest --> uc_browse
    guest --> uc_search
    guest --> uc_detail
    guest --> uc_signup

    customer --> uc_browse
    customer --> uc_search
    customer --> uc_detail
    customer --> uc_cart
    customer --> uc_coupon
    customer --> uc_address
    customer --> uc_checkout
    customer --> uc_payment
    customer --> uc_profile
    customer --> uc_orders
    customer --> uc_cancel
    customer --> uc_review

    admin --> uc_dashboard
    admin --> uc_categories
    admin --> uc_products
    admin --> uc_variants
    admin --> uc_inventory
    admin --> uc_discounts
    admin --> uc_customers
    admin --> uc_admin_orders
    admin --> uc_status

    momo --> uc_payment

    uc_cart -. include .-> uc_detail
    uc_checkout -. include .-> uc_cart
    uc_checkout -. include .-> uc_address
    uc_checkout -. include .-> uc_coupon
    uc_payment -. include .-> uc_checkout
    uc_admin_orders -. include .-> uc_status
    uc_products -. include .-> uc_variants
    uc_variants -. include .-> uc_inventory
```

## Main actors

- `Khach vang lai`: xem san pham, tim kiem, xem chi tiet, dang ky/dang nhap.
- `Khach hang`: mua hang, quan ly gio hang, dia chi, dat hang, thanh toan, theo doi don, danh gia.
- `Quan tri vien`: quan ly danh muc, san pham, bien the, IMEI, ton kho, khach hang, khuyen mai, don hang.
- `Cong thanh toan MoMo`: xu ly thanh toan online.

## Notes

- Diagram is based on the current `client`, `admin`, and `server` features in this repo.
- If needed, I can convert this into `PlantUML`, `draw.io`, or a cleaner report-ready image.
