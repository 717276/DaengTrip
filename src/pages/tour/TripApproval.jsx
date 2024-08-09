import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../components/css/tour/TripDetail.css";

const TripApproval = () => {
  const { t_no } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState({ places: 0, foods: 0 });
  const [selectedDay, setSelectedDay] = useState(1);
  const [tourDetail, setTourDetail] = useState(null);

  useEffect(() => {
    console.log(t_no);
    const url = `http://localhost:8080/api/tripDetail/${t_no}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTourDetail(data);
        console.log(data);
      })
      .catch((error) => console.error("Error fetching tour detail:", error));
  }, [t_no]);

  if (!tourDetail) {
    return <div>Loading...</div>;
  }

  const {
    t_title,
    t_explain,
    t_totalPrice,
    t_strDate,
    t_endDate,
    t_status,
    hotels,
    places,
    restaurantes,
  } = tourDetail;

  const handleDaySelect = (index) => {
    setSelectedDay(index + 1);
    setCurrentIndex({ places: 0, foods: 0 });
  };

  const prevSpot = (type, length) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [type]: prevIndex[type] === 0 ? length - 4 : prevIndex[type] - 1,
    }));
  };

  const nextSpot = (type, length) => {
    setCurrentIndex((prevIndex) => ({
      ...prevIndex,
      [type]: prevIndex[type] === length - 4 ? 0 : prevIndex[type] + 1,
    }));
  };

  const getImageUrl = (img) => {
    if (!img || !img.ti_category) {
      return "/images/default.png"; // 기본 이미지 경로 또는 빈 문자열 반환
    }
    return `/images/tourimg/${img.ti_category}/${img.ti_category}_${img.ti_ref_no}_${img.ti_day}_${img.ti_order}.jpg`;
  };

  const formatDateToYYYYMMDD = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const filteredHotels = hotels.filter((hotel) => hotel.h_day === selectedDay);
  const filteredPlaces = places.filter((place) => place.pl_day === selectedDay);
  const filteredRestaurantes = restaurantes.filter(
    (res) => res.pl_day === selectedDay
  );

  const handleApproval = () => {
    if (t_status === 1) {
      return; // t_status가 1이면 승인하기 동작을 막음
    }

    fetch(`http://localhost:8080/api/admin/tripStatusChange/${t_no}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // JSON이 아닌 텍스트로 응답을 받음
      })
      .then((data) => {
        console.log("Status updated:", data);
        navigate(-1); // 이전 페이지로 돌아가기
      })
      .catch((error) => console.error("Error updating status:", error));
  };
  const deleteTour = (t_no) => {
    fetch(`http://localhost:8080/api/admin/tourDelete/${t_no}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          navigate(-1);
        } else {
          console.error("Failed to delete cart item");
        }
      })
      .catch((error) => console.error("Error deleting tour:", error));
  };

  // 최대 day 값 계산
  const maxDay = Math.max(
    ...hotels.map((hotel) => hotel.h_day),
    ...places.map((place) => place.pl_day),
    ...restaurantes.map((res) => res.pl_day)
  );
  return (
    <div className="TripDetail">
      <h1>투어 설명</h1>
      <div className="day-selector">
        {[...Array(maxDay)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleDaySelect(index)}
            className={selectedDay === index + 1 ? "active" : ""}
          >
            Day {index + 1}
          </button>
        ))}
      </div>
      <div className="section">
        <h2>호텔</h2>
        {filteredHotels.map((hotel, index) => (
          <div key={index} className="spot hotel">
            <img src={getImageUrl(hotel.img)} alt={hotel.h_name} />
            <div className="hotel-info">
              <p>{hotel.h_name}</p>
              <p>{hotel.h_price}원</p>
            </div>
          </div>
        ))}
      </div>
      <div className="section">
        <h2>관광지</h2>
        <div className="spots-container">
          {filteredPlaces.length > 4 && (
            <span
              onClick={() => prevSpot("places", filteredPlaces.length)}
              className="arrow left-arrow"
            >
              &#10094;
            </span>
          )}
          <div
            className={`spots ${filteredPlaces.length > 4 ? "carousel" : ""}`}
          >
            {filteredPlaces
              .slice(currentIndex.places, currentIndex.places + 4)
              .map((spot, index) => (
                <div key={index} className="spot">
                  <img src={getImageUrl(spot.img)} alt={`Spot ${index}`} />
                  <p>{spot.pl_name}</p>
                  <p>{spot.pl_location}</p>
                </div>
              ))}
          </div>
          {filteredPlaces.length > 4 && (
            <span
              onClick={() => nextSpot("places", filteredPlaces.length)}
              className="arrow right-arrow"
            >
              &#10095;
            </span>
          )}
        </div>
      </div>
      <div className="section">
        <h2>식당</h2>
        <div className="spots-container">
          {filteredRestaurantes.length > 4 && (
            <span
              onClick={() => prevSpot("foods", filteredRestaurantes.length)}
              className="arrow left-arrow"
            >
              &#10094;
            </span>
          )}
          <div
            className={`spots ${
              filteredRestaurantes.length > 4 ? "carousel" : ""
            }`}
          >
            {filteredRestaurantes
              .slice(currentIndex.foods, currentIndex.foods + 4)
              .map((food, index) => (
                <div key={index} className="spot">
                  <img src={getImageUrl(food.img)} alt={`Food ${index}`} />
                  <p>{food.pl_name}</p>
                  <p>{food.pl_location}</p>
                </div>
              ))}
          </div>
          {filteredRestaurantes.length > 4 && (
            <span
              onClick={() => nextSpot("foods", filteredRestaurantes.length)}
              className="arrow right-arrow"
            >
              &#10095;
            </span>
          )}
        </div>
      </div>
      <div className="tour-details">
        <h2>투어 이름: {t_title}</h2>
        <p>투어 설명: {t_explain}</p>
        <p>투어 가격: {t_totalPrice}</p>
        <p>
          투어 시작 날짜 - 종료 날짜: {formatDateToYYYYMMDD(t_strDate)} ~{" "}
          {formatDateToYYYYMMDD(t_endDate)}
        </p>
      </div>
      <div className="detail-actions">
        <button
          onClick={t_status === 0 ? handleApproval : undefined}
          className={
            t_status === 0 ? "approvalDetailBtn" : "completedDetailBtn"
          }
        >
          {t_status === 0 ? "승인하기" : "승인완료"}
        </button>
        <button onClick={() => deleteTour(t_no)}>삭제하기</button>
        <button onClick={() => navigate(-1)}>뒤로가기</button>
      </div>
    </div>
  );
};

export default TripApproval;
