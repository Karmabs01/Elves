import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { useTranslation } from "react-i18next";

import cmn1 from "../../public/cmn1.png";
import play from "../../public/play.png";

function OtherBrands({
  newUrl,
  ipData,
  ipDataCode,
  currentLanguage,
  country,
  source,
  selectedCountry,
  setSelectedCountry,
}) {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [otherData, setOtherData] = useState([]);
  const [visibleBrands, setVisibleBrands] = useState(8);

  const handleShowMore = () => {
    setVisibleBrands((prevVisibleBrands) => prevVisibleBrands + 8);
  };

  const apiOld = "https://bonusnumber1.com/api/brands/read.php";
  const apiNew = "https://bonusnumber1.com/api/brands/read2.php";
  const api1043 = "https://bonusnumber1.com/api/brands/read3.php";
  const api1044 = "https://bonusnumber1.com/api/brands/read4.php";

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
                rowData["Trendsetting"] === "1"
            );
          } else {
            filteredDataOther = responseData.brands.filter(
              (rowData) =>
                rowData.GEO === ipDataCode &&
                rowData["CurrentStatus"] === "Ongoing" &&
                rowData["CasinoBrand"] !== "Mirax (FS)" &&
                rowData["CasinoBrand"] !== "Katsubet (FS)" &&
                rowData["CasinoBrand"] !== "7Bit (FS)" &&
                rowData["Trendsetting"] === "1"
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
    <div>
      {otherData.length > 0 && (
        <section className="game__two pb-60">
          <div className="container">
            <div className="game__two__wrap">
              <div className="row g-3 justify-content-center">
                <div
                  className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="game__items cmn__items__game h-100 green__height">
                    <img src={`.${cmn1}`} alt={`.${cmn1}`} />
                    <div className="game__overlay">
                      <div className="contents">
                        <h2>{t("Enchanted Offers")}</h2>
                        <a
                          target="_blank"
                          href={`https://topbon.us/${newUrl}L_enchanted-forest_2`}
                          className="cmn--btn2"
                        >
                          <span>{t("Show all")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-9 col-xl-9 col-lg-9">
                  <div className="row g-3 all-cars">
                    {otherData.length > 0 ? (
                      otherData.slice(0, 6).map((rowData, index) => (
                        <div
                          className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp"
                          data-wow-delay="0.1s"
                          key={index}
                        >
                          <div className="game__items">
                            <a href="#" className="badge">
                              {t("New")}
                            </a>
                            <img
                              src={rowData["LinkImg"]}
                              alt={rowData["LinkImg"]}
                            />
                            <p className="ouroffer">
                              {rowData["OurOfferContent"]}
                            </p>
                            <div className="game__overlay">
                              <a
                                target="_blank"
                                href={rowData["GoBig"] + newUrl + "L_enchanted-forest_2"}
                                className="icon play-btn"
                              >
                                <img
                                  src={`.${play}`}
                                  alt={rowData["LinkImg"]}
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="ti">
                        {t("No brands available for your country")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        // <section id="game" className="game-section pt-95 pb-95">
        //   <div className="container">
        //     <div className="row justify-content-center">
        //       <div className="col-xxl-5 col-xl-6 col-lg-7 col-md-10 w-fu">
        //         <div className="section-title text-center right-greadient mb-50">
        //           <h1 className="mb-25">
        //            <span className="common-gre-color"> VIP Deals </span> of the Week Just for You
        //           </h1>

        //         </div>
        //       </div>
        //     </div>
        //     <div className="row cards-content">
        //       {otherData.length > 0 ? (
        //         otherData.slice(0, 4).map((rowData, index) => (
        //           <div key={index} className="col-xl-3 col-md-6">
        //             <div className="single-game">
        //               <a target="_blank"
        //                   href={rowData["GoBig"] + newUrl} className="game-thumb">
        //                 <img
        //                   src={rowData["LinkImg"]}
        //                   alt={rowData["LinkImg"]}
        //                   className="rounded-3 w-100"
        //                 />
        //               </a>
        //               <div className="game-content mt-10">
        //                 <h3> {rowData["CasinoBrand"]}</h3>
        //                 <p className="mb-15"> {rowData["OurOfferContent"]}</p>
        //                 <a
        //                   target="_blank"
        //                   className="play-btn btn-hover"
        //                   href={rowData["GoBig"] + newUrl}
        //                 >
        //                   Play Now!
        //                 </a>
        //               </div>
        //             </div>
        //           </div>
        //         ))
        //       ) : (
        //         <p className="ti">No brands available for your country</p>
        //       )}
        //     </div>
        //     <div className="view-all-btn text-center pt-30">
        //       <a
        //         target="_blank"
        //         href={`https://pickbonus.myawardwallet.com/${newUrl}`}
        //         className="main-btn btn-hover"
        //       >
        //         View All Services
        //       </a>
        //     </div>
        //   </div>
        // </section>
      )}
    </div>
  );
}

export default OtherBrands;
