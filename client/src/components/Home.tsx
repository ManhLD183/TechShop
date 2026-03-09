import { useState, useEffect } from "react";
import { useGetAllProductsQuery } from "../api/product";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../api/category";
import "slick-carousel/slick/slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
const Home = () => {
  const { data: products } = useGetAllProductsQuery({
    sort: "purchases",
    order: "desc",
    dataCategories: [],
    page: 1,
    limit: 8,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCategories();

        setCategories(response.data);
        setIsLoadingCategories(false);
      } catch (error) {
        setIsLoadingCategories(false);
      }
    };

    fetchData();
  }, []);

  interface Category {
    _id: string;
    name: string;
    image: string;
    description?: string;
  }
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    vertical: false,
    afterChange: () => {},
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: false,
    arrows: false,

    afterChange: () => {
      console.log("Slider initialized!");
    },
  };
  const navigate = useNavigate();

  const [banners, setBanners] = useState([]);
  const [isLoadingBanners, setIsLoadingBanners] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/getBanners",
        );
        setBanners(response.data);
        setIsLoadingBanners(false);
      } catch (error) {
        setIsLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);
  const formatPrice = (price: any) => {
    const formattedPrice = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
    return formattedPrice;
  };
  return (
    <div className="tsHome">
      {/* HERO SLIDER */}
      <section className="tsHero">
        <div className="tsHero__wrap">
          <Slider {...bannerSettings}>
            {isLoadingBanners ? (
              <p className="tsLoading">Đang tải banners...</p>
            ) : (
              banners.map((banner, index) => (
                <div className="tsHero__slide" key={index + 1}>
                  <img src={banner.image} alt={banner.name} />
                </div>
              ))
            )}
          </Slider>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="tsSection">
        <div className="container">
          <header className="tsSection__head">
            <h3 className="tsSection__title">SẢN PHẨM NỔI BẬT</h3>
            <img
              className="tsSection__icon"
              src="../../src/Assets/icon-title.png"
              alt=""
            />
          </header>

          <div className="tsGrid">
            {products?.map((product, index) => (
              <article className="tsCard" key={index + 1}>
                <a className="tsCard__img" href={`/products/${product._id}`}>
                  <img
                    src={`${product?.images?.[0]?.url}`}
                    alt={product.name}
                  />
                </a>

                <div className="tsCard__body">
                  <a
                    className="tsCard__name"
                    href={`/products/${product._id}`}
                    title={product.name}
                  >
                    {product.name}
                  </a>

                  <div className="tsCard__row">
                    <div className="tsPrice">
                      <span className="tsPrice__text">
                        {product.minPrice === product.maxPrice
                          ? `${formatPrice(product.maxPrice)}`
                          : `${formatPrice(product.minPrice)} - ${formatPrice(product.maxPrice)}`}
                      </span>
                    </div>

                    <button
                      className="tsCard__btn"
                      onClick={() => navigate(`/products/${product._id}`)}
                      type="button"
                    >
                      Chi tiết
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER BLOCK: LEFT = 2 RIGHT */}
      <section className="tsSection tsSection--banner">
        <div className="container">
          <div className="tsBanner4">
            <a className="tsBanner4__item" href="#">
              <img src="../../src/Assets/banner_new_1.png" alt="" />
            </a>

            <a className="tsBanner4__item" href="#">
              <img src="../../src/Assets/banner_new_3.png" alt="" />
            </a>

            <a className="tsBanner4__item" href="#">
              <img src="../../src/Assets/banner_new_2.png" alt="" />
            </a>

            <a className="tsBanner4__item" href="#">
              <img src="../../src/Assets/banner_new_1.png" alt="" />
            </a>
          </div>
        </div>
      </section>

      {/* FEATURED CATEGORIES */}
      {/* <section className="tsSection">
    <div className="container">
      <header className="tsSection__head">
        <h3 className="tsSection__title">DANH MỤC NỔI BẬT</h3>
        <img className="tsSection__icon" src="../../src/Assets/icon-title.png" alt="" />
      </header>

      <div className="tsCatWrap">
        <Slider {...sliderSettings}>
          {isLoadingCategories ? (
            <p className="tsLoading">Đang tải danh mục...</p>
          ) : (
            categories.map((category) => (
              <div className="tsCatSlide" key={category._id}>
                <Link className="tsCatCard" to={`/categories/${category._id}`}>
                  <div className="tsCatCard__img">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <div className="tsCatCard__name">{category.name}</div>
                </Link>
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  </section> */}
    </div>
  );
};

export default Home;
