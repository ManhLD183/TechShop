import { Router } from "express";
import Product from "../../models/product";
import ProductVariant from "../../models/productVariant";
import Category from "../../models/category";
import {
  productCreateBodySchema,
  productUpdateBodySchema,
} from "../../validators/product";
import Comment from "../../models/comment";
import { cloudinary } from "../../libs/cloudinary";
import { generateImei } from "../../libs/utils";

const router = Router();

const isVariantUploadSource = (image) =>
  typeof image === "string" && image.startsWith("data:");

const resolveVariantImage = async (image, name) => {
  if (!image || typeof image !== "string") {
    return "";
  }

  if (!isVariantUploadSource(image)) {
    return image;
  }

  const { secure_url } = await cloudinary.uploader.upload(image, {
    public_id: name,
    folder: "products",
    overwrite: true,
    invalidate: true,
  });

  return secure_url;
};

const dedupeProductImages = (images) =>
  images.reduceRight((result, image) => {
    const isDuplicated = result.some(
      (currentImage) =>
        currentImage.publicId === image.publicId ||
        currentImage.url === image.url
    );

    if (!isDuplicated) {
      result.unshift(image);
    }

    return result;
  }, []);

const buildProductImages = ({
  images,
  variants,
  previousVariantNames = [],
}) => {
  const variantNames = new Set([
    ...previousVariantNames,
    ...variants.map((variant) => variant.name),
  ]);

  const manualImages = images.filter(
    (image) => !variantNames.has(image.publicId)
  );

  const variantImages = variants
    .filter((variant) => typeof variant.image === "string" && variant.image.length > 0)
    .map((variant) => ({
      name: variant.name,
      url: variant.image,
      publicId: variant.name,
    }));

  return dedupeProductImages([...manualImages, ...variantImages]);
};

router.get("/", async (req, res) => {
  try {
    const products = await Product.find()
      .populate("categoryId productVariantIds")
      .sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/:slug", async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate([
      "productVariantIds",
      "categoryId",
    ]);

    if (!product) {
      return res.status(200).json({
        message: "Không có sản phẩm",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/:slug/status", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        slug: req.params.slug,
      },
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.get("/:slug/review", async (req, res) => {
  try {
    const comments = await Comment.find({
      productId: req.params.slug,
    })
      .populate("customerId")
      .sort({ createdAt: -1 });

    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      slug,
      name,
      description,
      categoryId,
      productCode,
      options,
      variants,
      images,
      status,
    } = productCreateBodySchema.parse(req.body);
    const resolvedVariants = await Promise.all(
      variants.map(async (variant) => ({
        ...variant,
        imei: variant.imei?.trim() || generateImei(),
        image: await resolveVariantImage(variant.image, variant.name),
      }))
    );
    const numberPrice = variants.map((variant) => {
      return variant.price;
    });
    const minPrice = Math.min(...numberPrice);
    const maxPrice = Math.max(...numberPrice);
    const product = await Product.create({
      slug,
      name,
      description,
      categoryId,
      code: productCode,
      options,
      images: buildProductImages({
        images: dedupeProductImages(images),
        variants: resolvedVariants,
      }),
      status,
      minPrice,
      maxPrice,
    });

    let productVariantIds = [];

    for (const variant of resolvedVariants) {
      const productVariant = await ProductVariant.create({
        name: variant.name,
        price: variant.price,
        inventory: variant.inventory,
        options: variant.options,
        sku: variant.sku,
        imei: variant.imei,
        image: variant.image,
        productId: product._id,
      });

      productVariantIds.push(productVariant._id);
    }

    const newProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        productVariantIds: productVariantIds,
      },
      {
        new: true,
      }
    );
    await newProduct.save({ validateBeforeSave: false });

    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        productIds: product._id,
      },
    });

    return res.status(200).json({
      message: "Thêm sản phẩm thành công",
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    await ProductVariant.deleteMany({
      productId: req.params.id,
    });

    return res.json({
      message: "Xóa sản phẩm thành công",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const {
      slug,
      name,
      description,
      productCode,
      categoryId,
      options,
      images,
      variants,
    } = productUpdateBodySchema.parse(req.body);
    const previousVariantNames = await ProductVariant.find({
      productId: req.params.id,
    }).distinct("name");
    const resolvedVariants = await Promise.all(
      variants.map(async (variant) => ({
        ...variant,
        imei: variant.imei?.trim() || generateImei(),
        image: await resolveVariantImage(variant.image, variant.name),
      }))
    );

    const numberPrice = resolvedVariants.map((variant) => {
      return variant.price;
    });
    const minPrice = Math.min(...numberPrice);
    const maxPrice = Math.max(...numberPrice);

    const data = await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        slug,
        name,
        description,
        code: productCode,
        categoryId,
        options,
        images: buildProductImages({
          images: dedupeProductImages(images),
          variants: resolvedVariants,
          previousVariantNames,
        }),
        minPrice,
        maxPrice,
      },
      {
        new: true,
      }
    );

    if (!data) {
      return res.status(400).json({
        message: "Cập nhật sản phẩm thất bại",
      });
    }

    for (const variant of resolvedVariants) {
      await ProductVariant.findOneAndUpdate(
        { _id: variant.id },
        {
          name: variant.name,
          sku: variant.sku,
          imei: variant.imei,
          price: variant.price,
          inventory: variant.inventory,
          options: variant.options,
          image: variant.image,
        },
        {
          new: true,
        }
      );
    }

    return res.json({
      message: "Cập nhật sản phẩm thành công",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

export const productRoutes = router;
