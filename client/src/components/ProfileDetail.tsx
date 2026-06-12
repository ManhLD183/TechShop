import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {
  useGetProfileByAcountQuery,
  useUpdatePasswordMutation,
  useUpdateProfileMutation,
} from "../api/acount";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import {
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useGetAddressByAcountQuery,
  useUpdateAddressMutation,
} from "../api/address";
import { message } from "antd";
import axios from "axios";

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Mật khẩu hiện tại không được để trống")
    .min(6, "Mật khẩu hiện tại ít nhất 6 ký tự"),
  password: yup
    .string()
    .required("Mật khẩu mới không được để trống")
    .min(6, "Mật khẩu mới ít nhất 6 ký tự"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu chưa đúng")
    .required("Cần nhập lại mật khẩu")
    .min(6, "Nhập lại mật khẩu mới ít nhất 6 ký tự"),
});

const schemaProfile = yup.object().shape({
  email: yup.string().email("Email chưa đúng định dạng"),
  lastName: yup.string().required("Họ không được để trống"),
  firstName: yup.string().required("Tên không được để trống"),
});

const schemaAddress = yup.object().shape({
  address: yup.string().required("Địa chỉ không được để trống"),
  district: yup.string().required("Quận/huyện không được để trống"),
  ward: yup.string().required("Phường/xã không được để trống"),
  province: yup.string().required("Tỉnh/thành phố không được để trống"),
  phone: yup.string().required("Số điện thoại không được để trống"),
  name: yup.string().required("Tên không được để trống"),
  default: yup.boolean(),
});

const ProfileDetail = () => {
  const token = Cookies.get("token");
  const [updateProfile] = useUpdateProfileMutation();
  const [updatePassword] = useUpdatePasswordMutation();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdatePasswordPopupOpen, setIsUpdatePasswordPopupOpen] =
    useState(false);
  const [passwordVisibilityOld, setPasswordVisibilityOld] = useState(true);
  const [passwordVisibilityNew, setPasswordVisibilityNew] = useState(true);
  const [passwordVisibilityConfirm, setPasswordVisibilityConfirm] =
    useState(true);
  const [updateAdress] = useUpdateAddressMutation();
  const [image, setImage] = useState<string | undefined>();
  const [isFormUpdateAddress, setIsFormUpdateAddress] = useState(false);
  const { data: addresses } = useGetAddressByAcountQuery(token);
  const [deleteAddress] = useDeleteAddressMutation();
  const [isAddAddressPopupOpen, setIsAddAddressPopupOpen] = useState(false);
  const [createAddress] = useCreateAddressMutation();
  const [isUpdateProfilePopupOpen, setIsUpdateProfilePopupOpen] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  }: any = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: registerAddress,
    handleSubmit: handleSubmitAddress,
    formState: { errors: errorsAdress },
  }: any = useForm({
    resolver: yupResolver(schemaAddress),
  });

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
  }: any = useForm({
    resolver: yupResolver(schemaProfile),
  });

  const {
    register: registerAddressUpdate,
    handleSubmit: handleSubmitAddressUpdate,
    reset: resetAdressUpdate,
    formState: { errors: errorsAdressUpdate },
  }: any = useForm({
    resolver: yupResolver(schemaAddress),
  });

  const openAddAddressPopup = () => {
    setIsAddAddressPopupOpen(true);
  };

  const closeAddAddressPopup = () => {
    setIsAddAddressPopupOpen(false);
  };

  const openUpdatePasswordPopup = () => {
    setIsUpdatePasswordPopupOpen(true);
  };

  const closeUpdatePasswordPopup = () => {
    setIsUpdatePasswordPopupOpen(false);
  };

  const togglePasswordVisibilityOld = () => {
    setPasswordVisibilityOld((prevVisibility) => !prevVisibility);
  };

  const togglePasswordVisibilityNew = () => {
    setPasswordVisibilityNew((prevVisibility) => !prevVisibility);
  };

  const togglePasswordVisibilityConfirm = () => {
    setPasswordVisibilityConfirm((prevVisibility) => !prevVisibility);
  };

  const onAdddress = async (address: any) => {
    await createAddress({ address, token }).then(() => {
      message.success("Thêm địa chỉ thành công");
      setIsAddAddressPopupOpen(false);
    });
  };

  const onUpdatePassword = async (value: any) => {
    const data: any = await updatePassword({ value, token });

    if (data?.data) {
      Swal.fire("Good job!", "Đổi mật khẩu thành công", "success");
      Cookies.set("token", data.data.token);
      reset();
      setIsUpdatePasswordPopupOpen(false);
      return;
    }

    Swal.fire({
      icon: "error",
      title: data.error.data.message,
    });
  };

  const onUpdateAddress = async (data: any) => {
    await updateAdress({ token, data }).then(() => {
      message.success("Cập nhật địa chỉ thành công");
      setIsFormUpdateAddress(false);
    });
  };

  const openUpdateProfilePopup = () => {
    setIsUpdateProfilePopupOpen(true);
  };

  const closeUpdateProfilePopup = () => {
    setIsUpdateProfilePopupOpen(false);
  };

  const { data: profile, isLoading } = useGetProfileByAcountQuery(token);

  const onChangeImage = async (event: any) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    const apiResponse = await axios.post(
      `https://api.imgbb.com/1/upload?key=283182a99cb41ed4065016b64933524f`,
      formData
    );
    setImage(apiResponse.data.data.url);
  };

  const onUpdateProfile = async (data: any) => {
    const value = {
      ...data,
      firstName: data.firstName,
      lastName: data.lastName,
      avatar: image ? image : profile?.customer.avatar,
    };

    await updateProfile({ value, token }).then((response: any) => {
      Cookies.set("email", response.data.customer.email);
      Cookies.set("firstName", response.data.customer.firstName);
      Cookies.set("lastName", response.data.customer.lastName);
      Cookies.set("avatar", response.data.customer.avatar);
      message.success("Cập nhật thông tin thành công");
      setIsUpdateProfilePopupOpen(false);
    });
  };

  const [gifts, setGifts] = useState<any>([]);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:8080/api/gifts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((data) => {
          setGifts(data?.data);
        });
    })();
  }, [token]);

  const fullName = [
    profile?.customer?.firstName,
    profile?.customer?.lastName,
  ]
    .filter(Boolean)
    .join(" ");
  const avatarFallback =
    fullName
      .split(" ")
      .filter(Boolean)
      .map((part: string) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";
  const addressCount = addresses?.address?.length ?? 0;
  const defaultAccountName = `${Cookies.get("firstName") ?? ""} ${
    Cookies.get("lastName") ?? ""
  }`.trim();

  return (
    <>
      {isLoading ? (
        <div style={{ padding: "20px", textAlign: "center" }}>Đang tải...</div>
      ) : (
        <div className="theme-page">
          <div className="box__profileDetail">
            <div className="container profile-page-shell">
              <div className="profile-page__layout">
                <div className="profile-sidebar-column">
                  <div className="profile-page__hero profile-page__hero--sidebar">
                <div className="profile-page__identity">
                  <div className="profile-page__avatar">
                    {profile?.customer?.avatar ? (
                      <img src={profile.customer.avatar} alt={fullName} />
                    ) : (
                      <span>{avatarFallback}</span>
                    )}
                  </div>
                  <div>
                    <span className="profile-page__eyebrow">Tài khoản</span>
                    <h2 className="title__profile profile-page__name">
                      {fullName || "Khách hàng"}
                    </h2>
                    <p className="profile-page__subtitle">
                      Quản lý hồ sơ, sổ địa chỉ và quà tặng của bạn trong một
                      giao diện gọn và dễ theo dõi hơn.
                    </p>
                  </div>
                </div>

                <div className="profile-page__hero-meta">
                  <div className="profile-chip">
                    <span>Email</span>
                    <strong>{profile?.customer?.email}</strong>
                  </div>
                  <div className="profile-chip">
                    <span>Địa chỉ đã lưu</span>
                    <strong>{addressCount}</strong>
                  </div>
                  <div className="profile-chip">
                    <span>Quà tặng</span>
                    <strong>{gifts.length}</strong>
                  </div>
                </div>
              </div>

                  <div className="account__sidebar">
                    <div className="account__sidebar__header">
                      <span className="account__sidebar__eyebrow">
                        Điều hướng
                      </span>
                      <h3>Quản lý tài khoản</h3>
                    </div>
                    <button
                      type="button"
                      className={`account__sidebar__item ${
                        activeTab === "profile" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("profile")}
                    >
                      <div className="icon__sidebar">
                        <img src="../../src/Assets/icon-user.webp" alt="" />
                      </div>
                      <div>
                        <div className="account__sidebar__label">
                          Thông tin cá nhân
                        </div>
                        <p>Hồ sơ và bảo mật tài khoản</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`account__sidebar__item ${
                        activeTab === "history" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("history")}
                    >
                      <div className="icon__sidebar">
                        <img src="../../src/Assets/icon__map.webp" alt="" />
                      </div>
                      <div>
                        <div className="account__sidebar__label">
                          Sổ địa chỉ
                        </div>
                        <p>Quản lý địa chỉ giao hàng</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      className={`account__sidebar__item ${
                        activeTab === "discount" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("discount")}
                    >
                      <div className="icon__sidebar">
                        <i className="fa-solid fa-tag"></i>
                      </div>
                      <div>
                        <div className="account__sidebar__label">
                          Quà tặng của tôi
                        </div>
                        <p>Mã quà tặng và ưu đãi hiện có</p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="profile-content-column">
                  <div className="outLet__profile">
                    {activeTab === "profile" && (
                      <div className="content__profile">
                        <div className="profile-content__header">
                          <div>
                            <span className="profile-page__eyebrow">Hồ sơ</span>
                            <h3 className="title__profile">
                              Thông tin cá nhân
                            </h3>
                            <p className="profile-content__subtitle">
                              Cập nhật thông tin liên hệ, email và ảnh đại diện
                              của bạn.
                            </p>
                          </div>

                          <button
                            type="button"
                            className="btn__update update__profile"
                            onClick={openUpdateProfilePopup}
                          >
                            Chỉnh sửa hồ sơ
                          </button>
                        </div>

                        <div className="profile-details-grid">
                          <section className="profile-panel">
                            <h4 className="profile-panel__title">
                              Thông tin liên hệ
                            </h4>
                            <div className="profile__name">
                              <div className="full__name">Họ và tên</div>
                              <div className="name__detail">{fullName}</div>
                            </div>
                            <div className="profile__email">
                              <div className="full__name">Email</div>
                              <div className="name__detail">
                                {profile?.customer?.email}
                              </div>
                            </div>
                          </section>

                          <section className="profile-panel">
                            <h4 className="profile-panel__title">
                              Đăng nhập và bảo mật
                            </h4>
                            <div className="detail__sign__item">
                              <div className="lable">Email đăng nhập</div>
                              <div className="sign__email">
                                {profile?.customer?.email}
                              </div>
                            </div>
                            <div className="detail__sign__item">
                              <div className="lable">Mật khẩu</div>
                              <div className="sign__passwword">
                                ****************
                              </div>
                            </div>
                            <button
                              type="button"
                              className="btn__update update__sign"
                              onClick={openUpdatePasswordPopup}
                            >
                              Đổi mật khẩu
                            </button>
                          </section>
                        </div>

                        {isUpdateProfilePopupOpen && (
                          <div className="update-profile-popup update-password-popup">
                            <div className="main_updateProfile main_updatePassword">
                              <h3>Cập nhật thông tin cá nhân</h3>
                              <form
                                onSubmit={handleSubmitProfile(onUpdateProfile)}
                              >
                                <div className="row__update__profile">
                                  <label>Họ</label>
                                  <input
                                    type="text"
                                    {...registerProfile("firstName")}
                                    defaultValue={`${profile?.customer.firstName}`}
                                  />
                                </div>
                                <div className="row__update__profile">
                                  <label>Tên</label>
                                  <input
                                    type="text"
                                    {...registerProfile("lastName")}
                                    defaultValue={`${profile?.customer.lastName}`}
                                  />
                                </div>
                                <div className="row__update__profile">
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    defaultValue={profile?.customer.email}
                                    {...registerProfile("email")}
                                  />
                                </div>
                                <div className="row__update__profile">
                                  <label>Ảnh đại diện</label>
                                  <div className="file-input-wrapper">
                                    <input
                                      onChange={onChangeImage}
                                      type="file"
                                      id="avatar"
                                      accept=".jpg,.jpeg,.png,.webp"
                                    />
                                    <label
                                      htmlFor="avatar"
                                      className="file-input-label"
                                    >
                                      <span className="icon-upload"></span>
                                      Chọn ảnh
                                    </label>
                                  </div>
                                  {image && (
                                    <img
                                      className="profile-image-preview"
                                      src={image}
                                      alt="Ảnh đại diện mới"
                                    />
                                  )}
                                </div>
                                <div className="group__btn__close">
                                  <button
                                    type="button"
                                    className="btn__backAdress"
                                    onClick={closeUpdateProfilePopup}
                                  >
                                    Đóng
                                  </button>
                                  <button
                                    type="submit"
                                    className="btnSaveUpdateProfile btn__updatePassword"
                                  >
                                    Cập nhật
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}

                        {isUpdatePasswordPopupOpen && (
                          <div className="update-password-popup">
                            <div className="main_updatePassword">
                              <h3>Đổi mật khẩu</h3>
                              <form
                                onSubmit={handleSubmit(onUpdatePassword)}
                                className="chane__password"
                              >
                                <div className="rowsInputUpdatePass">
                                  <input
                                    {...register("currentPassword")}
                                    type={
                                      passwordVisibilityOld
                                        ? "password"
                                        : "text"
                                    }
                                    placeholder="Nhập mật khẩu hiện tại"
                                  />
                                  <p className="error">
                                    {errors.currentPassword
                                      ? errors?.currentPassword.message
                                      : ""}
                                  </p>
                                  <label
                                    htmlFor="togglePasswordOld"
                                    onClick={togglePasswordVisibilityOld}
                                  >
                                    {passwordVisibilityOld ? (
                                      <i className="fa-solid fa-eye-slash"></i>
                                    ) : (
                                      <i className="fa-solid fa-eye"></i>
                                    )}
                                  </label>
                                </div>

                                <div className="rowsInputUpdatePass">
                                  <input
                                    {...register("password")}
                                    type={
                                      passwordVisibilityNew
                                        ? "password"
                                        : "text"
                                    }
                                    placeholder="Nhập mật khẩu mới"
                                  />
                                  <p className="error">
                                    {errors.password
                                      ? errors?.password.message
                                      : ""}
                                  </p>
                                  <label
                                    htmlFor="togglePasswordNew"
                                    onClick={togglePasswordVisibilityNew}
                                  >
                                    {passwordVisibilityNew ? (
                                      <i className="fa-solid fa-eye-slash"></i>
                                    ) : (
                                      <i className="fa-solid fa-eye"></i>
                                    )}
                                  </label>
                                </div>

                                <div className="rowsInputUpdatePass">
                                  <input
                                    {...register("confirmPassword")}
                                    type={
                                      passwordVisibilityConfirm
                                        ? "password"
                                        : "text"
                                    }
                                    placeholder="Xác nhận mật khẩu mới"
                                  />
                                  <p className="error">
                                    {errors.confirmPassword
                                      ? errors?.confirmPassword.message
                                      : ""}
                                  </p>
                                  <label
                                    htmlFor="togglePasswordConfirm"
                                    onClick={togglePasswordVisibilityConfirm}
                                  >
                                    {passwordVisibilityConfirm ? (
                                      <i className="fa-solid fa-eye-slash"></i>
                                    ) : (
                                      <i className="fa-solid fa-eye"></i>
                                    )}
                                  </label>
                                </div>

                                <div className="group__btn__close">
                                  <button
                                    type="button"
                                    className="btn__backAdress"
                                    onClick={closeUpdatePasswordPopup}
                                  >
                                    Đóng
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn__updatePassword"
                                  >
                                    Cập nhật mật khẩu
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === "history" && (
                      <div className="content__profile">
                        <div className="profile-content__header profile-content__header--split">
                          <div>
                            <span className="profile-page__eyebrow">
                              Giao hàng
                            </span>
                            <h3 className="title__profile">Sổ địa chỉ</h3>
                            <p className="profile-content__subtitle">
                              Lưu các địa chỉ giao hàng thường dùng để checkout
                              nhanh hơn.
                            </p>
                          </div>

                          <button
                            type="button"
                            className="btn__addAdress"
                            onClick={openAddAddressPopup}
                          >
                            Thêm địa chỉ
                          </button>
                        </div>

                        {isAddAddressPopupOpen && (
                          <div className="add-address-popup">
                            <div className="main__addAdress">
                              <h3>Thêm địa chỉ</h3>
                              <form onSubmit={handleSubmitAddress(onAdddress)}>
                                <input
                                  defaultValue={defaultAccountName}
                                  {...registerAddress("name")}
                                  type="text"
                                  placeholder="Tên người nhận"
                                />
                                <p className="error">
                                  {errorsAdress.name
                                    ? errorsAdress?.name.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("phone")}
                                  placeholder="Số điện thoại"
                                />
                                <p className="error">
                                  {errorsAdress.phone
                                    ? errorsAdress?.phone.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("address")}
                                  placeholder="Địa chỉ"
                                />
                                <p className="error">
                                  {errorsAdress.address
                                    ? errorsAdress?.address.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("ward")}
                                  placeholder="Phường/xã"
                                />
                                <p className="error">
                                  {errorsAdress.ward
                                    ? errorsAdress?.ward.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("district")}
                                  placeholder="Quận/huyện"
                                />
                                <p className="error">
                                  {errorsAdress.district
                                    ? errorsAdress?.district.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddress("province")}
                                  placeholder="Tỉnh/thành phố"
                                />
                                <p className="error">
                                  {errorsAdress.province
                                    ? errorsAdress?.province.message
                                    : ""}
                                </p>
                                <div className="add__default">
                                  <input
                                    {...registerAddress("default")}
                                    type="checkbox"
                                  />
                                  <label>Đặt làm địa chỉ mặc định</label>
                                </div>
                                <div className="group__btn__close">
                                  <button
                                    type="button"
                                    className="btn__backAdress"
                                    onClick={closeAddAddressPopup}
                                  >
                                    Đóng
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn__addAdr"
                                  >
                                    Thêm địa chỉ
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}

                        {isFormUpdateAddress && (
                          <div className="add-address-popup">
                            <div className="main__addAdress">
                              <h3>Cập nhật địa chỉ</h3>
                              <form
                                onSubmit={handleSubmitAddressUpdate(
                                  onUpdateAddress
                                )}
                              >
                                <input
                                  defaultValue={defaultAccountName}
                                  {...registerAddressUpdate("name")}
                                  type="text"
                                  placeholder="Tên người nhận"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.name
                                    ? errorsAdressUpdate?.name.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("phone")}
                                  placeholder="Số điện thoại"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.phone
                                    ? errorsAdressUpdate?.phone.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("address")}
                                  placeholder="Địa chỉ"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.address
                                    ? errorsAdressUpdate?.address.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("ward")}
                                  placeholder="Phường/xã"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.ward
                                    ? errorsAdressUpdate?.ward.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("district")}
                                  placeholder="Quận/huyện"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.district
                                    ? errorsAdressUpdate?.district.message
                                    : ""}
                                </p>
                                <input
                                  type="text"
                                  {...registerAddressUpdate("province")}
                                  placeholder="Tỉnh/thành phố"
                                />
                                <p className="error">
                                  {errorsAdressUpdate.province
                                    ? errorsAdressUpdate?.province.message
                                    : ""}
                                </p>
                                <div className="add__default">
                                  <input
                                    {...registerAddressUpdate("default")}
                                    type="checkbox"
                                  />
                                  <label>Đặt làm địa chỉ mặc định</label>
                                </div>
                                <div className="group__btn__close">
                                  <button
                                    type="button"
                                    className="btn__backAdress"
                                    onClick={() => {
                                      setIsFormUpdateAddress(false);
                                    }}
                                  >
                                    Đóng
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn__addAdr"
                                  >
                                    Cập nhật
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        )}

                        <div className="content__bottom__adress">
                          {addressCount > 0 ? (
                            <div className="address-book-grid">
                              {addresses?.address?.map((item: any) => (
                                <div key={item._id} className="item__adress__detail">
                                  <div className="account__adress">
                                    <div className="left__acount">
                                      <div className="name">{item?.name}</div>
                                      {item?.default ? (
                                        <div className="adressDefault">
                                          Mặc định
                                        </div>
                                      ) : null}
                                    </div>

                                    <div className="action__adress">
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          setIsFormUpdateAddress(true);
                                          await axios
                                            .get(
                                              `http://localhost:8080/api/address/${item._id}/acount`,
                                              {
                                                headers: {
                                                  Authorization: `Bearer ${token}`,
                                                },
                                              }
                                            )
                                            .then((data) => {
                                              resetAdressUpdate(
                                                data?.data?.address
                                              );
                                            });
                                        }}
                                        className="update__adress"
                                      >
                                        Cập nhật
                                      </button>
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          if (
                                            confirm(
                                              "Bạn có muốn xóa địa chỉ này không?"
                                            )
                                          ) {
                                            await deleteAddress({
                                              token,
                                              id: item._id,
                                            }).then(() => {
                                              message.success(
                                                "Xóa địa chỉ thành công"
                                              );
                                            });
                                          }
                                        }}
                                        className="delete__adress"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>

                                  <div className="account__phone">
                                    {item?.phone}
                                  </div>
                                  <div className="acount__adressDetail">
                                    {item.address}, {item.ward}, {item.district},{" "}
                                    {item.province}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="profile-empty-state">
                              <h4>Chưa có địa chỉ nào</h4>
                              <p>
                                Thêm địa chỉ đầu tiên để việc đặt hàng của bạn
                                nhanh hơn trong các lần mua tiếp theo.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {activeTab === "discount" && (
                      <div className="content__profile">
                        <div className="profile-content__header">
                          <div>
                            <span className="profile-page__eyebrow">
                              Ưu đãi
                            </span>
                            <h3 className="title__profile">
                              Quà tặng của tôi
                            </h3>
                            <p className="profile-content__subtitle">
                              Theo dõi các mã quà tặng và hạn sử dụng của từng
                              ưu đãi.
                            </p>
                          </div>

                          <div className="profile-chip profile-chip--compact">
                            <span>Khả dụng</span>
                            <strong>{gifts.length} quà tặng</strong>
                          </div>
                        </div>

                        <div className="main__discount">
                          {gifts?.length > 0 ? (
                            <ul>
                              {gifts?.map((discount: any) => (
                                <li key={discount._id}>
                                  <div className="discount__item">
                                    <h4>
                                      {discount.code}
                                      <div className="icon__discounts">
                                        <i className="fa-solid fa-tag"></i>
                                      </div>
                                    </h4>
                                    <div className="content__discounts">
                                      <p>{discount.description}</p>
                                      <div className="date__discount">
                                        {discount.endAt ? (
                                          <p>
                                            HSD:{" "}
                                            {new Date(
                                              discount.endAt
                                            ).toLocaleDateString("vi-VN")}
                                          </p>
                                        ) : (
                                          <p>Không giới hạn ngày</p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <div className="profile-empty-state">
                              <h4>Chưa có quà tặng nào</h4>
                              <p>
                                Ưu đãi mới sẽ xuất hiện tại đây khi tài khoản
                                của bạn đủ điều kiện nhận.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileDetail;
