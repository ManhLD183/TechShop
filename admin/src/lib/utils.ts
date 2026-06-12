import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { ReadonlyURLSearchParams } from "next/navigation";
import { OurFileRouter } from "./uploadthing";

import { generateComponents } from "@uploadthing/react";

export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);
  if (!isArray) return false;
  return files.every((file) => file instanceof File);
}

export function formatBytes(
  bytes: number,
  decimals = 0,
  sizeType: "accurate" | "normal" = "normal"
) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export const getQueryString = (kv?: Record<string, string>) => {
  const newParams = new URLSearchParams();
  if (kv) {
    Object.entries(kv).forEach(([k, v]) => newParams.set(k, v));
  }
  const queryString = newParams.toString();
  return queryString.length > 0 ? `?${queryString}` : "";
};

export const generateRandomString = (length = 6) => {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const calculateLuhnCheckDigit = (digits: string) => {
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let value = Number(digits[i]);

    if (i % 2 === 1) {
      value *= 2;
      if (value > 9) {
        value -= 9;
      }
    }

    sum += value;
  }

  return (10 - (sum % 10)) % 10;
};

export const generateImei = () => {
  let base = "";

  for (let i = 0; i < 14; i++) {
    base += Math.floor(Math.random() * 10).toString();
  }

  return `${base}${calculateLuhnCheckDigit(base)}`;
};

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "BDT" | "VND" | "JPY" | "CNY" | "KRW";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { currency = "VND", notation } = options;

  return new Intl.NumberFormat("vi", {
    style: "currency",
    currency,
    notation,
  }).format(Number(price));
}

export function formatNumber(
  number: number | string,
  options: {
    decimals?: number;
    style?: Intl.NumberFormatOptions["style"];
    notation?: Intl.NumberFormatOptions["notation"];
  } = {}
) {
  const { decimals = 0, style = "decimal", notation = "standard" } = options;

  return new Intl.NumberFormat("en-US", {
    style,
    notation,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(Number(number));
}

export function formatId(id: number) {
  return `#${id.toString().padStart(4, "0")}`;
}

export const createUrl = (
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams
) => {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
};
