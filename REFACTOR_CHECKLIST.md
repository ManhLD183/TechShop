# Refactor Baseline Checklist

## Baseline Build Status

- `client`: `npm run build` passes (warnings only about legacy CSS asset resolution).
- `admin`: `npm run build` passes after stopping running `next dev` process that locked `.next/trace`.

## Contract Guardrails

- Keep public API payload keys unchanged:
  - `Product`: `_id`, `name`, `images`, `minPrice`, `maxPrice`, `productVariantIds`
  - `Category`: `_id`, `name`, `image`
  - `Order/User`: existing status/role keys from backend
- Keep query params unchanged in existing hooks:
  - `products`: `_page`, `_limit`, `_sort`, `_order`, `categories`, `q`
- Keep authentication behavior unchanged:
  - client JWT cookie key: `token`
  - admin localStorage token flow in layout

## Smoke Routes (Client)

- `/Home`
- `/shops`
- `/products/:id`
- `/categories/:id`
- `/cart`
- `/signin`
- `/profile`

## Smoke Routes (Admin)

- `/auth/signin`
- `/`
- `/products`
- `/orders`
- `/customers`
- `/categories`
- `/users`

## Notes

- Refactor approach uses hybrid fidelity:
  - Public pages move closer to `themes` visual structure.
  - Admin keeps business-heavy table/forms while aligning shell/layout to blueprint direction.
