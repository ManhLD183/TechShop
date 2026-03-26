import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useResettPasswordMutation } from "../api/acount";
import { Badge, Button, Card, Input } from "./ui";
const schema = yup.object().shape({
  code: yup.number().required("Mã xác nhận không để trống"),
  password: yup
    .string()
    .required("Password không được để trống")
    .min(6, "Password ít nhất 6 kí tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), "Nhập lại mật khẩu chưa đúng"])
    .required("Cần nhập lại mật khẩu"),
});
const ForgotToken = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const [resetPassword] = useResettPasswordMutation();
  const onSubmit = async (value: any) => {
    const data: any = await resetPassword(value);
    if (data?.data) {
      Swal.fire("Good job!", `${data.data.message}`, "success");
      navigate("/signin");
    } else {
      Swal.fire({
        icon: "error",
        title: data.error.data.message,
      });
    }
  };
  return (
    <main className="theme-page flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Badge variant="primary">TECH SHOP</Badge>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[color:var(--theme-text)]">
            Nhập mã xác minh
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-[color:var(--theme-text-muted)]">
              Mã xác minh
            </label>
            <Input
              type="text"
              placeholder="Nhập mã xác minh"
              {...register("code")}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-[color:var(--theme-text-muted)]">
              Mật khẩu mới
            </label>
            <Input
              type="password"
              placeholder="Nhập mật khẩu mới"
              {...register("password")}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-[color:var(--theme-text-muted)]">
              Xác nhận mật khẩu mới
            </label>
            <Input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              {...register("confirmPassword")}
            />
          </div>

          <Button type="submit" className="w-full" variant="primary">
            Gửi
          </Button>

          <p className="text-center text-sm text-[color:var(--theme-text-muted)] pt-2">
            Bạn chưa có tài khoản?{" "}
            <a
              href="/signup"
              className="font-semibold text-[color:var(--theme-primary)] hover:underline"
            >
              Đăng ký
            </a>
          </p>
        </form>
      </Card>
    </main>
  );
};

export default ForgotToken;
