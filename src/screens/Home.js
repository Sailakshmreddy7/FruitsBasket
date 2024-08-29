import React, { useEffect, useState } from "react";
//import React from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [fruitsCat, setFruitsCat] = useState([]);
  const [fruitsData, setFruitsData] = useState([]);
  //const [search, setSearch] = useState('')
  const loadData = async () => {
    let response = await fetch(
      process.env.REACT_APP_CLIENT_URL + "/api/fruits",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    //console.log(response[1][0].CategoryName)
    setFruitsData(response);
    const fruitsCategory = [
      {
        CategoryName: "Apple",
      },
      {
        CategoryName: "Mango",
      },
      {
        CategoryName: "Berries",
      },
      {
        CategoryName: "Grapes",
      },
      {
        CategoryName: "Mix Fruits",
      },
      {
        CategoryName: "Gift Items",
      },
    ];

    setFruitsCat(fruitsCategory);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{
        /*background: 'linear-gradient(to right, #000000, #2e8b57,#2e8b57, #000000)'*/ backgroundColor:
          "#013220",
      }}
    >
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div>
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <dev className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </dev>
            </div>

            <div className="carousel-item">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%",
                }}
              ></div>
            </div>
            <div
              style={{
                position: "relative",
                width: "100%",
                paddingBottom: "56.25%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src="https://res.cloudinary.com/dsnbfenxu/image/upload/v1724938203/images/WhatsApp_Image_2024-08-29_at_6.59.42_PM_llk3k0.jpg"
                  width="1220px"
                  height="495px"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        {fruitsCat != []
          ? fruitsCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {fruitsData != [] ? (
                    fruitsData
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            kley={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              fruitsData={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found </div>
                  )}
                </div>
              );
            })
          : ""}
      </div>
      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
}
