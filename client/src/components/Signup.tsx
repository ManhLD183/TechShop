import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useSignupMutation } from "../api/auth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Input } from "./ui";
const schema = yup.object().shape({
  firstName: yup.string().required("Họ không được để trống "),
  lastName: yup.string().required("Tên không được để trống"),
  email: yup
    .string()
    .email("Email chưa đúng địng dạng")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu ít nhất 6 kí tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu chưa đúng")
    .required("Cần nhập lại mật khẩu"),
});

type SignupFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignupApiResponse = {
  error?: {
    data?: {
      message?: string;
    };
  };
};

const Signup = () => {
  const [signup] = useSignupMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const onSigup = async (data: SignupFormValues) => {
    const response = (await signup(data)) as unknown as SignupApiResponse;

    if (!response?.error) {
      Swal.fire("Good job!", "Đăng kí thành công", "success");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: response?.error?.data?.message ?? "Đăng ký thất bại",
      });
    }
  };
  return (
    <main className="theme-page flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-bold text-3xl tracking-tighter mb-6"
          >
            <span className="text-[color:var(--theme-primary)]">TECH</span>{" "}
            SHOP
          </Link>
          <h2 className="text-2xl font-bold tracking-tight">
            Tạo tài khoản mới
          </h2>
          <p className="text-[color:var(--theme-text-muted)] text-sm mt-2">
            Tham gia cùng hàng nghìn khách hàng khác
          </p>
        </div>

        <form onSubmit={handleSubmit(onSigup)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest uppercase text-[color:var(--theme-text-muted)]">
              Họ
            </label>
            <Input
              {...register("firstName")}
              type="text"
              placeholder="Nguyễn"
            />
            {errors.firstName ? (
              <p className="text-xs text-[color:var(--theme-secondary)]">
                {errors.firstName.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest uppercase text-[color:var(--theme-text-muted)]">
              Tên
            </label>
            <Input
              {...register("lastName")}
              type="text"
              placeholder="Văn A"
            />
            {errors.lastName ? (
              <p className="text-xs text-[color:var(--theme-secondary)]">
                {errors.lastName.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest uppercase text-[color:var(--theme-text-muted)]">
              Email
            </label>
            <Input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
            />
            {errors.email ? (
              <p className="text-xs text-[color:var(--theme-secondary)]">
                {errors.email.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest uppercase text-[color:var(--theme-text-muted)]">
              Mật khẩu
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="••••••••"
            />
            {errors.password ? (
              <p className="text-xs text-[color:var(--theme-secondary)]">
                {errors.password.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold tracking-widest uppercase text-[color:var(--theme-text-muted)]">
              Nhập lại mật khẩu
            </label>
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="••••••••"
            />
            {errors.confirmPassword ? (
              <p className="text-xs text-[color:var(--theme-secondary)]">
                {errors.confirmPassword.message}
              </p>
            ) : null}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Đăng ký
          </Button>

          <p className="text-center text-[color:var(--theme-text-muted)] text-sm mt-2">
            Đã có tài khoản?{" "}
            <Link
              to="/signin"
              className="font-semibold text-[color:var(--theme-primary)] hover:underline"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </form>
      </Card>
    </main>
  );
};

export default Signup;
