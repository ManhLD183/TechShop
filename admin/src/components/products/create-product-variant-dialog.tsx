import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { UseFieldArrayAppend, useFormContext } from "react-hook-form";
import { Inputs } from "./add-product-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import { generateImei, generateRandomString } from "@/lib/utils";

interface CreateProductVariantDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  append: UseFieldArrayAppend<Inputs, "variants">;
}

export const CreateProductVariantDialog = ({
  open,
  setOpen,
  append,
}: CreateProductVariantDialogProps) => {
  const addProductForm = useFormContext<Inputs>();
  const createInitialState = () => ({
    name: "",
    price: 0,
    inventory: 0,
    sku: "",
    imei: generateImei(),
    options: addProductForm
      .getValues("options")
      .map((item) => ({ name: item.name, value: "" })),
    image: "",
  });
  const [formState, setFormState] = useState(createInitialState);

  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const name = formState.options.every((option) => option.value.length > 0)
      ? formState.options.map((option) => option.value).join(" / ")
      : "";
    if (formState.name !== name && name.length > 0) {
      setFormState((prev) => ({
        ...prev,
        name,
      }));
    }
  }, [formState]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tao bien the</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-8">
          <div>
            <label
              htmlFor="image"
              className="group relative mt-1 flex h-24 w-24 cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
            >
              <div
                className="absolute z-[5] h-full w-full rounded-full"
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragEnter={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDragActive(false);
                  const file = e.dataTransfer.files && e.dataTransfer.files[0];
                  if (file) {
                    if (file.size / 1024 / 1024 > 2) {
                      toast.error("File size too big (max 2MB)");
                    } else if (
                      file.type !== "image/png" &&
                      file.type !== "image/jpeg"
                    ) {
                      toast.error(
                        "File type not supported (.png or .jpg only)"
                      );
                    } else {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setFormState((prev) => ({
                          ...prev,
                          image: event.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }}
              />
              <div
                className={`${
                  dragActive
                    ? "cursor-copy border-2 border-black bg-gray-50 opacity-100"
                    : ""
                } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md bg-white transition-all ${
                  formState.image
                    ? "opacity-0 group-hover:opacity-100"
                    : "group-hover:bg-gray-50"
                }`}
              >
                <UploadCloud
                  className={`${
                    dragActive ? "scale-110" : "scale-100"
                  } h-5 w-5 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                />
              </div>
              {formState.image && (
                <img
                  src={formState.image}
                  alt="Preview"
                  className="h-full w-full rounded-md object-cover"
                />
              )}
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    if (file.size / 1024 / 1024 > 50) {
                      toast.error("File size too big (max 50MB)");
                    } else if (
                      file.type !== "image/png" &&
                      file.type !== "image/jpeg"
                    ) {
                      toast.error(
                        "File type not supported (.png or .jpg only)"
                      );
                    } else {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        setFormState((prev) => ({
                          ...prev,
                          image: event.target?.result as string,
                        }));
                      };
                      reader.readAsDataURL(file);
                    }
                  }
                }}
              />
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <Label>Ten</Label>
            <Input
              required
              placeholder="Den / XL"
              value={formState.name}
              onChange={(e) => {
                setFormState((prev) => ({
                  ...prev,
                  name: e.target.value,
                }));
              }}
            />
          </div>
          <FormItem className="w-full">
            <FormLabel>IMEI</FormLabel>
            <div className="flex items-center gap-2">
              <FormControl>
                <Input
                  type="text"
                  value={formState.imei}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      imei: e.target.value,
                    }))
                  }
                />
              </FormControl>
              <Button
                variant={"outline"}
                type="button"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    imei: generateImei(),
                  }))
                }
              >
                <span className="whitespace-nowrap">Tao ngau nhien</span>
              </Button>
            </div>
          </FormItem>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Tuy chon</h3>

          <div className="gap-4 grid grid-cols-2">
            {addProductForm
              .getValues("options")
              .filter((item) => item.name.length > 0 && item.values.length > 0)
              .map((item, index) => {
                return (
                  <FormItem key={index} className="w-full">
                    <FormLabel>{item.name}</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          setFormState((prev) => ({
                            ...prev,
                            options: prev.options.map((option) => {
                              if (item.name === option.name) {
                                return {
                                  ...option,
                                  value,
                                };
                              }

                              return option;
                            }),
                          }))
                        }
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Select an option..." />
                        </SelectTrigger>
                        <SelectContent>
                          {item.values.map((value, valueIndex) => (
                            <SelectItem key={valueIndex} value={value}>
                              {value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                );
              })}
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <FormItem className="w-full">
            <FormLabel>Gia</FormLabel>
            <FormControl>
              <Input
                type="number"
                min={0}
                inputMode="numeric"
                placeholder="Type product price here."
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    price: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
          </FormItem>
          <FormItem className="w-full">
            <FormLabel>So luong trong kho</FormLabel>
            <FormControl>
              <Input
                type="number"
                inputMode="numeric"
                min={0}
                placeholder="Type product inventory here."
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    inventory: Number(e.target.value),
                  }))
                }
              />
            </FormControl>
          </FormItem>
        </div>

        <div className="flex flex-col items-end gap-4 sm:flex-row">
          <FormItem className="w-full">
            <FormLabel>SKU</FormLabel>
            <FormControl>
              <Input
                type="text"
                value={formState.sku}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    sku: e.target.value,
                  }))
                }
              />
            </FormControl>
          </FormItem>
          <Button
            variant={"outline"}
            onClick={() => {
              setFormState((prev) => ({
                ...prev,
                sku: generateRandomString(),
              }));
            }}
          >
            <span className="whitespace-nowrap">Tao ngau nhien</span>
          </Button>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => setOpen(false)}
          >
            Huy
          </Button>
          <Button
            type="submit"
            onClick={() => {
              append({
                ...formState,
                imei: formState.imei.trim() || generateImei(),
              });
              setOpen(false);
            }}
          >
            Luu thay doi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
