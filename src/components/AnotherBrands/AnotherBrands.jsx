import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import shape from "../../../public/bg-shape.png";
import bs from "../../../public/banner-shape.png";
import bt from "../../../public/banner-thumb.png";




// import fwb from "../../images/fwb.png";

function AnotherBrands({
  newUrl,
  ipDataCode,
  currentLanguage,
  source,
  selectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  };

  const apiOld = "https://pickbonus.myawardwallet.com/api/brands/read.php";
  const apiNew = "https://pickbonus.myawardwallet.com/api/brands/read2.php";
  const api1043 = "https://pickbonus.myawardwallet.com/api/brands/read3.php";
  const api1044 = "https://pickbonus.myawardwallet.com/api/brands/read4.php";

  function shuffleArray(array) {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  useEffect(() => {
    const geo = selectedCountry.toUpperCase();

    const fetchData = async () => {
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
          // const dataArray = Object.values(responseData);

          let filteredDataOther = [];

          if (geo) {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === geo &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Premium"
            );
          } else {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["Current Status"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Segment2"] === "Premium"
            );
          }

          // Перемешиваем данные перед отображением
          setOtherData(shuffleArray(filteredDataOther));
          setLoading(false);

          // Если нет брендов, вызывать setSelectedCountry
          // if (filteredDataOther.length === 0) {
          //   setSelectedCountry("all");
          // }
        } else {
          console.error("Failed to fetch data:", res.status);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    if ((ipDataCode && currentLanguage) || (geo && currentLanguage)) {
      fetchData();
    }
  }, [ipDataCode, currentLanguage, selectedCountry, source]);

  // ...

  return (

    <section className="banner__section" id="home">
    <div className="bg__shape">
        <img src={`.${shape}`} alt={`.${shape}`} />
    </div>
    <div className="container">
        <div className="banner__wrap">
            <div className="row justify-content-between align-items-end">
                <div className="col-xxl-5 col-xl-6 col-lg-7">
                    <div className="banner__content wow fadeInUp" data-wow-delay="0.1s">
                        <h3 className="text-base-two">
                        {t("Elves' Special:")}
                        </h3>
                        <h1>
                        {t("Discover Your Delightful Bonus Gifts!")}
                        </h1>
                        {/* <h4 className="text-base-two">
                            +150Free Spins
                        </h4> */}
                        <div className="button__grp">
                        {otherData.length > 0 ? (
                      otherData.slice(0, 1).map((rowData, index) => (
                            <a key={index} target="_blank" href={rowData["GoBig"] + newUrl + "L_enchanted-forest_random"} className="cmn--btn2" >
                                <span>{t("Get your bonuses")}</span>
                            </a>
                               ))
                               ) : (
                                 <p className="ti">{t("No brands available for your country")}</p>
                               )}
                        </div>
                    </div>
                </div>
                <div className="col-xxl-6 col-xl-6 col-lg-3">
                    <div className="banner__thumb wow fadeInDown" data-wow-delay="0.1s">
                        <img src={`.${bt}`} alt={`.${bt}`} />
                    </div>
                </div>
                <div className="col-xl-2">

                </div>
            </div>
        </div>
        <div className="banner__shape__img">
            <img src={`.${bs}`} alt={`.${bs}`} />
        </div>
    </div>
</section>


  );
}

export default AnotherBrands;
