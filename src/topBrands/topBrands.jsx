import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from "react-i18next";
import Loader from "../components/Loader/Loader";
import "bootstrap/dist/css/bootstrap.min.css";

import gm1 from "../../public/gm1.png";
import play from "../../public/play.png";

function TopBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
  setSelectedCountry, // Функция для обновления selectedCountry
}) {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Порог для мобильных устройств
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      // Дополнительные настройки для других порогов медиа-запросов
    ],
  };

  const urlParams = new URLSearchParams(window.location.search);
  const brandValue = urlParams.get("brand");

  const apiOld = "https://bonusnumber1.com/api/brands/read.php";
  const apiNew = "https://bonusnumber1.com/api/brands/read2.php";
  const api1043 = "https://bonusnumber1.com/api/brands/read3.php";
  const api1044 = "https://bonusnumber1.com/api/brands/read4.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice(); // Создаем копию массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  console.log("============", source);
  useEffect(() => {
    const geo = selectedCountry.toUpperCase();
    console.log("GEO", geo);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        let url;
        switch (source) {
          case "partner1039":
            url = apiNew; // Для partner1039
            break;
          case "partner1043":
            url = api1043; // Для partner1043
            break;
          case "partner1044":
            url = api1044; // Для partner1044
            break;
          default:
            url = apiOld; // Для всех остальных случаев
        }

        const res = await fetch(url);
        if (res.ok) {
          const responseData = await res.json();
          // const dataArray = Object.values(responseData.brands);
          let filteredData = [];
          console.log("respons3dData", responseData.brands);
          if (geo) {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Sandbox"
            );
          } else {
            filteredData = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Sandbox"
            );
          }

          const topData = responseData.brands
            .filter((rowData) => rowData.Tech === brandValue)
            .map((item) => ({
              ...item,
              clas: "topbrand",
            }));

          // Фильтрация объектов в массиве data
          const filteredDataWithTopData = filteredData.filter((dataItem) => {
            // Проверка, есть ли объект с таким же Casino brand в topData
            const existsInTopData = topData.some(
              (topDataItem) =>
                topDataItem["CasinoBrand"] === dataItem["CasinoBrand"]
            );

            // Возвращаем true только для объектов, которые не совпадают
            return !existsInTopData;
          });

          // Перемешиваем данные перед отображением
          setData(shuffleArray(filteredDataWithTopData));

          setTopData([...topData]);
          setIsLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          if (filteredDataWithTopData.length === 0) {
            setSelectedCountry("all");
            console.log(filteredDataWithTopData);
          }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    if ((geo && currentLanguage) || (!geo && ipDataCode && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, brandValue, currentLanguage, selectedCountry, source]);

  const combinedData = [...topData, ...data];
  console.log("combined", combinedData);

  return (
    <div className="mtt10">
      {isLoading && <Loader />}
      <section className="game__three game__space__top ">
        <div className="container">
          <div className="row g-3 justify-content-center">
            <div
              className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 wow fadeInUp mdd0"
              data-wow-delay="0.1s"
            >
              <div className="game__items cmn__items__game cmn__items__game__two green__height">
                <img src={`.${gm1}`} alt={`.${gm1}`} />
                <div className="game__overlay">
                  <div className="contents">
                    <h3>{t("New")}</h3>
                    <a
                      target="_blank"
                      href={`https://topbon.us/${newUrl}L_enchanted-forest_1`}
                      className="cmn--btn2"
                    >
                      <span>{t("Show all")}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-9 col-xl-9 col-lg-9 mtt0">
              <div className="game__right__wrap owl-theme owl-carousel">
                <Slider
                  className="game__right__wrap owl-theme owl-carousele"
                  {...settings}
                >
                  {data.map((rowData, index) => (
                    <div key={index} className="game__items">
                      <a href="#" className="badge">
                        {t("New")}
                      </a>
                      <img src={rowData["LinkImg"]} alt={rowData["LinkImg"]} />
                      <p className="ouroffer">{rowData["OurOfferContent"]}</p>
                      <div className="game__overlay">
                        <a
                          target="_blank"
                          href={
                            rowData["GoBig"] + newUrl + "L_enchanted-forest_1"
                          }
                          className="icon play-btn"
                        >
                          <img src={`.${play}`} alt={`.${play}`} />
                        </a>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TopBrands;
