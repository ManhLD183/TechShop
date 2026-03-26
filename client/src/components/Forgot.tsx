import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useForgotPasswordMutation } from "../api/acount";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, Input } from "./ui";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email chưa đúng địng dạng")
    .required("Email không được để trống"),
});
const Forgot = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [forgotPassword] = useForgotPasswordMutation();
  const onSubmit = async (value: any) => {
    const data: any = await forgotPassword(value);
    if (data?.data) {
      Swal.fire("Good job!", data.data.message, "success");
      navigate("/forgottoken");
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
            Khôi phục mật khẩu
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-[color:var(--theme-text-muted)]">
              Email
            </label>
            <Input
              {...register("email")}
              type="text"
              placeholder="Email"
            />
            <p className="text-sm text-[color:var(--theme-secondary)]">
              {errors.email ? errors?.email.message : ""}
            </p>
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

export default Forgot;
