import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/UserCard";

export default function UserPage() {
  const [search, setSearch] = useState("");
  const [fruitsCat, setFruitsCat] = useState([]);
  const [fruitsData, setFruitsData] = useState([]);

  const loadData = async () => {
    let response = await fetch(
      `${process.env.REACT_APP_CLIENT_URL}/api/fruits`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();

    setFruitsData(response);
    console.log(response);
    const fruitsCategory = [
      { CategoryName: "Apple" },
      { CategoryName: "Mango" },
      { CategoryName: "Berries" },
      { CategoryName: "Grapes" },
      { CategoryName: "Mix Fruits" },
      { CategoryName: "Gift Items" },
    ];
    setFruitsCat(fruitsCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ backgroundColor: "#013220" }}>
      <Navbar />
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://www.desktopbackground.org/download/o/2012/11/21/487085_desktop-hd-images-of-fresh-fruits-and-vegetables-jpg_1600x900_h.jpg"
              className="d-block h-20 w-100"
              style={{ filter: "brightness(100%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/X5wBUyn5cyM?autoplay=1&controls=0&loop=1&playlist=X5wBUyn5cyM&mute=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  filter: "brightness(150%)",
                }}
              ></iframe>
            </div>
          </div>
          <div className="carousel-item">
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingTop: "56.25%",
              }}
            >
              <iframe
                src="https://www.youtube.com/embed/dLC54mz--Dk?autoplay=1&controls=0&loop=1&playlist=dLC54mz--Dk&mute=1"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  filter: "brightness(150%)",
                }}
              ></iframe>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
        {fruitsCat.length > 0
          ? fruitsCat.map((data) => (
              <div className="row mb-3" key={data.CategoryName}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {fruitsData.length > 0 ? (
                  fruitsData
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => (
                      <div
                        key={filterItems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          fruitsData={filterItems}
                          options={filterItems.options[0]}
                        />
                      </div>
                    ))
                ) : (
                  <div>No such data found</div>
                )}
              </div>
            ))
          : ""}
      </div>
      <Footer />
    </div>
  );
}
