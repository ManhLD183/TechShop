import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./ui/button";
import { InventoryResponse } from "@/services/inventory/inventory-query";
import axiosClient from "@/lib/axios-instance";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";
import { generateImei, generateRandomString } from "@/lib/utils";

export const EditProductVariantDialog = ({
  productVariant,
}: {
  productVariant: InventoryResponse["docs"][number];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const initialImei = React.useMemo(
    () => productVariant.imei?.trim() || generateImei(),
    [productVariant.imei]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"}>Cap nhat</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cap nhat bien the san pham</DialogTitle>
          <div className="text-sm text-slate-600">
            <h6 className="font-semibold">{productVariant.productId.name}</h6>
            <p>{productVariant.options.join(" / ")}</p>
          </div>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={async (e) => {
            e.preventDefault();
            const price = (e.target as HTMLFormElement)["price"].value;
            const inventory = (e.target as HTMLFormElement)["inventory"].value;
            const sku = (e.target as HTMLFormElement)["sku"].value;
            const imei =
              (e.target as HTMLFormElement)["imei"].value || generateImei();

            try {
              setIsLoading(true);
              const res = await axiosClient.put(
                `/inventory/${productVariant._id}`,
                {
                  price,
                  inventory,
                  sku,
                  imei,
                }
              );

              if (res.status !== 200) {
                toast.error(res.data.message);
                setIsOpen(false);
                return;
              }

              toast.success("Product variant updated successfully!");
              queryClient.invalidateQueries({ queryKey: ["inventory"] });
              setIsOpen(false);
            } catch (error) {
              toast.error("Something went wrong!");
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="price" className="text-right">
              Gia
            </Label>
            <Input
              id="price"
              type="number"
              min={0}
              defaultValue={productVariant.price.toString()}
              required
              className="col-span-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inventory" className="text-right">
              Kho
            </Label>
            <Input
              id="inventory"
              type="number"
              min={0}
              required
              defaultValue={productVariant.inventory.toString()}
              className="col-span-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sku" className="text-right">
              SKU
            </Label>
            <div className="flex justify-between gap-2 items-center">
              <Input
                id="sku"
                type="string"
                required
                defaultValue={productVariant.sku}
                className="col-span-3"
              />
              <Button
                variant={"outline"}
                type="button"
                onClick={() => {
                  (document.getElementById("sku") as HTMLInputElement).value =
                    generateRandomString();
                }}
              >
                <span className="whitespace-nowrap">Tao ngau nhien</span>
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imei" className="text-right">
              IMEI
            </Label>
            <div className="flex justify-between gap-2 items-center">
              <Input
                id="imei"
                type="text"
                defaultValue={initialImei}
                className="col-span-3"
              />
              <Button
                variant={"outline"}
                type="button"
                onClick={() => {
                  (document.getElementById("imei") as HTMLInputElement).value =
                    generateImei();
                }}
              >
                <span className="whitespace-nowrap">Tao ngau nhien</span>
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              Luu thay doi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
