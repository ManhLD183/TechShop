import Swal from "sweetalert2";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSigninMutation } from "../api/auth";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, Input } from "./ui";
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email chưa đúng địng dạng")
    .required("Email không được để trống"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "mật khẩu ít nhất 6 kí tự"),
});
const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [signin] = useSigninMutation();
  const navigate: any = useNavigate();
  const onSignin = async (data: any) => {
    const response: any = await signin(data);
    if (!response?.error) {
      Swal.fire("Good job!", "Đăng nhập thành công", "success");
      Cookies.set("token", response.data.token);
      Cookies.set("email", response.data.user.email);
      Cookies.set("firstName", response.data.user.firstName);
      Cookies.set("lastName", response.data.user.lastName);
      Cookies.set("avatar", response.data.user.avatar);
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } else {
      Swal.fire({
        icon: "error",
        title: response?.error.data.message,
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
            Đăng nhập
          </h1>
          <p className="mt-2 text-sm text-[color:var(--theme-text-muted)]">
            Chào mừng đến với Sportshop. Chúng tôi rất vui khi bạn trở lại!
          </p>
        </div>

        <form onSubmit={handleSubmit(onSignin)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-widest text-[color:var(--theme-text-muted)]">
              Email
            </label>
            <Input
              {...register("email")}
              type="text"
              placeholder="Email"
              id="email"
              autoComplete="email"
            />
            <p className="text-sm text-[color:var(--theme-secondary)]">
              {errors.email ? errors?.email.message : ""}
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-widest text-[color:var(--theme-text-muted)]">
              Mật khẩu
            </label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Mật khẩu"
              id="password"
              autoComplete="current-password"
            />
            <p className="text-sm text-[color:var(--theme-secondary)]">
              {errors.password ? errors?.password.message : ""}
            </p>
          </div>

          <div className="flex justify-end">
            <a
              href="/forgot"
              className="text-sm font-semibold text-[color:var(--theme-primary)] hover:underline"
            >
              Quên mật khẩu?
            </a>
          </div>

          <Button type="submit" className="w-full" variant="primary">
            Đăng nhập
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
export default Signin;
