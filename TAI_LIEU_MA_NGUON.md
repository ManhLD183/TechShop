# Tài liệu mã nguồn — Dự án e-commerce (Tech Shop / Sport Shop)

Tài liệu này mô tả cấu trúc, luồng xác thực và API chính dựa trên mã nguồn trong repo.

---

## 1. Tổng quan kiến trúc

Dự án gồm **ba phần** chạy độc lập, cùng nói chuyện với một backend Express:

| Thư mục   | Vai trò | Công nghệ |
|-----------|---------|-----------|
| `server/` | API REST, MongoDB, tích hợp thanh toán / upload | Express 4, Mongoose, Vite (dev server cổng 8080) |
| `client/` | Website mua hàng (khách) | React 18, Vite, TypeScript, Ant Design, Redux Toolkit, React Query |
| `admin/`  | Trang quản trị | Next.js 14, React 18, Tailwind, Radix UI, TanStack Query / Table, Tremor, Recharts |

**URL mặc định khi dev** (theo cấu hình trong mã):

- API: `http://localhost:8080`
- Client: thường Vite `http://localhost:5173` (khai báo trong `admin/src/lib/contants.ts` là `CLIENT_URL`)
- Admin: Next.js (mặc định `http://localhost:3000`)

---

## 2. Backend (`server/`)

### 2.1 Điểm vào

File [`server/src/app.js`](server/src/app.js) tạo `express()`, bật JSON (giới hạn 50mb), CORS, gắn các router:

- Toàn bộ route **admin** được gắn dưới tiền tố **`/api/admin`**.
- Các route **khách / công khai** gắn dưới **`/api`** (không có `/admin`).

Kết nối MongoDB: `mongoose.connect(process.env.URL_DATABASE)` — cần biến môi trường `URL_DATABASE`.

Chạy dev: trong `server/`, lệnh `npm run dev` dùng Vite + `vite-plugin-node`, cổng **8080** ([`server/vite.config.ts`](server/vite.config.ts)).

### 2.2 Hai hệ thống người dùng và JWT

| Loại | Model Mongoose | Đăng nhập | Middleware bảo vệ | Secret JWT (trong code) |
|------|----------------|-----------|-------------------|---------------------------|
| **Khách hàng** (website) | `Customer` | `POST /api/signin`, `POST /api/signup` ([`server/src/controllers/auth.js`](server/src/controllers/auth.js)) | [`authenticate`](server/src/middlewares/authenticate.js) | `"dongtimo"` |
| **Nhân sự / quản trị** | `User` (role: shipper, staff, admin) | `POST /api/admin/auth/sign-in` ([`server/src/routers/admin/auth.js`](server/src/routers/admin/auth.js)) | [`verifyToken`](server/src/middlewares/admin.js) | `JWT_SECRET` = `"sport-shop-jwt-key"` |

**Lưu ý:** Client lưu token cookie `token` và gửi `Authorization: Bearer <token>`; admin gửi tương tự nhưng token phải do endpoint admin cấp — hai secret khác nhau nên **không dùng chéo** token khách và token admin.

### 2.3 API khách / công khai (tiền tố `/api`)

| Nhóm | File router | Ví dụ endpoint |
|------|-------------|----------------|
| Auth | `routers/auth.js` | `POST /signup`, `POST /signin` |
| Tài khoản | `routers/acount.js` | `POST /forgotPassword`, `PATCH /resetPassword`, `PATCH /updatePassword` (cần auth) |
| Sản phẩm | `routers/product.js` | `GET /products`, `GET /products/:id`, `POST|PUT|DELETE /products` |
| Danh mục | `routers/category.js` | `GET /categories`, `GET /categories/:id`, `PATCH`, v.v. |
| Giỏ hàng | `routers/cart.js` | `POST /add-to-cart`, `GET /get-cart-user`, các `PATCH` cập nhật/xóa |
| Đơn hàng | `routers/order.js` | `POST /orders`, `GET /orders-by-user`, `GET /orders/:id`, `PATCH /orders/:id/cancel` |
| Hồ sơ khách | `routers/profile.js` | `GET /profile/acount`, `PATCH /profile/update` |
| Địa chỉ | `routers/address.js` | CRUD dưới `/address`, `/address/acount`, … |
| Bình luận | `routers/comment.js` | `POST /comments`, `GET /comments/:productId` |
| Thanh toán MoMo | `routers/payment.js` | `POST /create_momo`, `GET /momo` |
| Banner | `routers/banner.js` | `GET /getBanners` |
| Giảm giá | `routers/discount.js` | `GET /discounts`, `GET /discounts/:code` |
| Quà / mã quà | `routers/gift.js` | `GET /gifts`, `GET /gifts/:code` (cần auth) |
| Quốc gia | `routers/country.js` | (theo controller `country`) |
| Upload ảnh | `routers/upload.js` | `POST /images/upload` (Multer + Cloudinary), `DELETE|PUT /images/:publicId` |

### 2.4 API quản trị (tiền tố `/api/admin`)

File [`server/src/routers/admin/index.js`](server/src/routers/admin/index.js) gom các nhóm (hầu hết có `verifyToken`):

- `/categories`, `/products`, `/orders`, `/customers`, `/analytics`, `/inventory`, `/user`, `/banners`, `/comments`, `/discounts`, `/gifts`
- `/auth` — đăng nhập admin (không qua `verifyToken` trên mount con, xem file `admin/auth.js`)
- `/me` — trả về `User` theo id trong token sau khi verify

### 2.5 Models MongoDB (`server/src/models/`)

Các collection chính: `User`, `Customer`, `Category`, `Product`, `ProductVariant` (tham chiếu từ Product), `Cart`, `CartItem`, `Order`, `Address`, `Comment`, `Banner`, `Discount`, `Gift`, `Country`.

Sản phẩm hỗ trợ slug, biến thể (`productVariantIds`), ảnh (Cloudinary: name, url, publicId), trạng thái Active/Draft/Archived, phân trang qua `mongoose-paginate-v2`.

### 2.6 Tích hợp bên thứ ba (backend)

- **Cloudinary** — upload/xóa ảnh ([`server/src/routers/upload.js`](server/src/routers/upload.js), config trong `config/cloudinary.js`).
- **Nodemailer** — gửi mail (controllers như `sendMail`).
- **MoMo** — tạo thanh toán và callback ([`server/src/routers/payment.js`](server/src/routers/payment.js)).
- **PDF** — `pdfkit` / `pdfkit-table` (hóa đơn hoặc báo cáo, xem `libs/generate-invoice.js`).

---

## 3. Client — website khách (`client/`)

### 3.1 Routing

[`client/src/routers.tsx`](client/src/routers.tsx) dùng `createBrowserRouter`:

- Layout chung: `WebsiteLayout`, các trang con: `Home` (redirect từ `/`), `cart`, `products/:id`, `shops`, `contact`, `blog`, `about`, `categories/:id`.
- **Route cần đăng nhập** (`PrivateRouter` — kiểm tra cookie `token`): `/profile`, `/profileDetail`, `/changepassword`, `/OrderClient`, `/orderDetail/:id`.
- Auth tách layout: `/signin`, `/signup`, `/forgot`, `/forgottoken`.

### 3.2 Gọi API

Axios instance [`client/src/api/instance.ts`](client/src/api/instance.ts): `baseURL: "http://localhost:8080/api"`.

Các module API nằm trong `client/src/api/` (auth, cart, order, category, …).

### 3.3 State & UI

Redux Toolkit + redux-persist, React Query, React Hook Form + Yup, Ant Design, Bootstrap, carousel (slick), v.v.

---

## 4. Admin (`admin/`)

### 4.1 Ứng dụng Next.js

[`admin/src/pages/_app.tsx`](admin/src/pages/_app.tsx): bọc `QueryClientProvider` (TanStack Query), `TooltipProvider`, toast Sonner.

Gọi API: [`admin/src/lib/axios-instance.ts`](admin/src/lib/axios-instance.ts) — `baseURL: "http://localhost:8080/api/admin"`.

Hằng số: [`admin/src/lib/contants.ts`](admin/src/lib/contants.ts) — `API_URL`, `CLIENT_URL`.

### 4.2 Trang chính (`admin/src/pages/`)

- `/` — dashboard / tổng quan
- `/auth/signin` — đăng nhập admin
- `/products`, `/products/add`, `/products/[slug]`, `/products/[slug]/edit`
- `/categories`, `/categories/add`, `/categories/[slug]`
- `/orders`, `/orders/[id]`
- `/customers`, `/customers/[id]`
- `/users`
- `/inventory`
- `/discounts`
- `/settings`

API routes Next: ví dụ [`admin/src/pages/api/uploadthing.ts`](admin/src/pages/api/uploadthing.ts), [`admin/src/pages/api/ai/generate-description.ts`](admin/src/pages/api/ai/generate-description.ts) — upload file và gợi ý mô tả (OpenAI / `ai` SDK).

### 4.3 Ghi chú dependency

Trong `admin` có **Prisma** (`@prisma/client`, file `lib/prisma.ts`) nhưng **không thấy import Prisma** ở các service/page chính; dữ liệu nghiệp vụ lấy qua REST từ `server`. Có thể là dependency dự phòng hoặc chưa dùng — cần xác nhận trước khi phụ thuộc vào Prisma để deploy.

---

## 5. Luồng nghiệp vụ tóm tắt

1. **Khách** đăng ký/đăng nhập → JWT lưu cookie → duyệt sản phẩm, giỏ, địa chỉ, đặt hàng, (tuỳ chọn) MoMo, xem đơn.
2. **Admin** đăng nhập tại `/api/admin/auth/sign-in` → quản lý catalog, đơn, khách, kho, analytics, banner, comment, discount, gift.
3. **Media**: ảnh sản phẩm qua Cloudinary (API server); admin có thêm Uploadthing cho luồng upload trong Next.

---

## 6. Chạy dự án (tham khảo)

1. Cài dependency từng package: `cd server && npm install`, tương tự `client`, `admin`.
2. Tạo file `.env` cho `server` với ít nhất `URL_DATABASE` và các biến Cloudinary / MoMo / mail nếu dùng.
3. Chạy song song: terminal 1 — `server` (`npm run dev`); terminal 2 — `client` (`npm run dev`); terminal 3 — `admin` (`npm run dev`).
4. Đảm bảo CORS và `baseURL` trên client/admin trùng với host/cổng API khi deploy.

---

## 7. Cấu trúc thư mục tóm tắt

```
manhld/
├── server/src src/app.js        # Express app
│   ├── controllers/            # Xử lý request
│   ├── models/                 # Mongoose schemas
│   ├── routers/                # Route public + routers/admin
│   ├── middlewares/            # authenticate (khách), admin verifyToken
│   ├── validators/             # Joi / Zod tuỳ module
│   └── config/                 # DB, Cloudinary
├── client/src                  # SPA khách
│   ├── api/                    # Axios wrappers
│   ├── components/             # Trang & UI
│   └── routers.tsx             # Định nghĩa route
└── admin/src
    ├── pages/                  # Next.js pages + api/
    ├── components/             # UI (shadcn-style + Tremor)
    ├── services/              # React Query mutations/queries
    └── lib/                   # axios, react-query, constants
```

---

*Tài liệu được tạo từ việc đọc mã nguồn; khi bạn thêm route hoặc đổi biến môi trường, nên cập nhật mục tương ứng.*
