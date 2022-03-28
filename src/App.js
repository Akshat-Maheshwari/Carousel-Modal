import "./App.css";
import "./carousel.scss";
import React, { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { MdArrowBackIosNew } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";


function App() {

  // var numberOfItems=document.querySelectorAll(".my-carousel__item").length;
  var numberOfItems = 12;
  var itemsInNavigatorView = 4;

  let moveNavigatorNextFlag = false;
  let moveNavigatorBackFlag = false;
  let currentItemsInNavigatorView = itemsInNavigatorView;
  const itemsArray = [];
  // console.log(numberOfItems);
  for (var i = 0; i < numberOfItems; i++) {
    itemsArray.push(i + 1);
  }

  setTimeout(() => {
    let targetItem = document.querySelector(`.item1`);
    targetItem.style.border = "solid 5px red";
  }, 100);

  const nextCarouselInner = () => {
    let carouselInner = document.querySelector(".my-carousel__inner");
    let translateX =
      Math.round(
        -carouselInner.style.transform.replace(/[^\d.]/g, "") -
          100 / numberOfItems
      ) > -100
        ? -carouselInner.style.transform.replace(/[^\d.]/g, "") -
          100 / numberOfItems
        : 0;
    carouselInner.style.transform = `translateX(${translateX}%)`;
    // console.log(translateX);
    highlightCurrent();
  };

  const backCarouselInner = () => {
    let carouselInner = document.querySelector(".my-carousel__inner");
    let translateX =
      Math.round(
        -carouselInner.style.transform.replace(/[^\d.]/g, "") +
          100 / numberOfItems
      ) <= 0
        ? -carouselInner.style.transform.replace(/[^\d.]/g, "") +
          100 / numberOfItems
        : 0;
    carouselInner.style.transform = `translateX(${translateX}%)`;
    // console.log(translateX);
    highlightCurrent();
  };

  const nextNavigatorInner = () => {
    let carouselInner = document.querySelector(".carousel-navigator__inner");
    let translateX =
      Math.round(
        -carouselInner.style.transform.replace(/[^\d.]/g, "") -
          100 / Math.ceil(numberOfItems / itemsInNavigatorView)
      ) > -100 &&
      -carouselInner.style.transform.replace(/[^\d.]/g, "") -
        100 / Math.ceil(numberOfItems / itemsInNavigatorView);
    carouselInner.style.transform = `translateX(${translateX}%)`;
    console.log(-carouselInner.style.transform.replace(/[^\d.]/g, ""));
  };

  const backNavigatorInner = () => {
    let carouselInner = document.querySelector(".carousel-navigator__inner");
    let translateX =
      Math.round(
        -carouselInner.style.transform.replace(/[^\d.]/g, "") +
          100 / Math.ceil(numberOfItems / itemsInNavigatorView)
      ) <= 0
        ? -carouselInner.style.transform.replace(/[^\d.]/g, "") +
          100 / Math.ceil(numberOfItems / itemsInNavigatorView)
        : 0;
    carouselInner.style.transform = `translateX(${translateX}%)`;
    console.log(translateX);
    console.log(
      Math.round(
        -carouselInner.style.transform.replace(/[^\d.]/g, "") +
          100 / Math.ceil(numberOfItems / itemsInNavigatorView)
      )
    );
    console.log(-carouselInner.style.transform.replace(/[^\d.]/g, ""));
  };

  function navigateToItem(item) {
    let carouselInner = document.querySelector(".my-carousel__inner");
    let translateX = (-100 / numberOfItems) * (item - 1);
    carouselInner.style.transform = `translateX(${translateX}%)`;
    // console.log(translateX);
    highlightCurrent();
  }

  function highlightCurrent() {
    let carouselInner = document.querySelector(".my-carousel__inner");
    let itemNumber =
      Math.round(
        carouselInner.style.transform.replace(/[^\d.]/g, "") /
          (100 / numberOfItems)
      ) + 1;
    let allItem = document.querySelectorAll(".carousel-navigator__item");
    for (var i = 0; i < numberOfItems; i++) {
      allItem[i].style.border = "none";
    }
    let targetItem = document.querySelector(`.item${itemNumber}`);
    targetItem.style.border = "solid 5px red";
    if (
      itemNumber < currentItemsInNavigatorView &&
      currentItemsInNavigatorView - itemsInNavigatorView >= itemNumber
    ) {
      moveNavigatorBackFlag = true;
    }
    if (moveNavigatorBackFlag) {
      backNavigatorInner();
      moveNavigatorBackFlag = false;
      currentItemsInNavigatorView -= itemsInNavigatorView;
    }
    if (itemNumber > currentItemsInNavigatorView) {
      moveNavigatorNextFlag = true;
    }
    if (moveNavigatorNextFlag) {
      nextNavigatorInner();
      currentItemsInNavigatorView += itemsInNavigatorView;
      moveNavigatorNextFlag = false;
    }
  }
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <button onClick={()=>{setShow(true)}}>Carousel</button>
      <div>random stuff</div>
        <div style={{"display":show?"flex":"none"}} className="modalBackground">
            <div className="modalTransparent">
            </div>
            <div className="modalContainer">
            <div className="closeBtn" onClick={()=>{setShow(false)}}><AiOutlineClose className="closeBtn-svg" /></div>
            <div className="body">
              <div className="my-carousel">
                <div className="my-carousel-back" onClick={backCarouselInner}><MdArrowBackIosNew className="my-carousel-back-svg" /></div>
                <div  className="my-carousel-next" onClick={nextCarouselInner}><MdArrowForwardIos className="my-carousel-next-svg" /></div>
                <div
                  className="my-carousel__inner"
                  style={{ width: numberOfItems * 100 + "%" }}
                >
                  <div className="my-carousel__item box1">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image1
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text1
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box2">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image2
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text2
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box3">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image3
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text3
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box4">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image4
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text4
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box5">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image5
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text5
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box6">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image6
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text6
                      </div>
                    </div>
                  </div>

                  <div className="my-carousel__item box7">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image7
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text7
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box8">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image8
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text8
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box9">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image9
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text9
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box10">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image10
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text10
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box11">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image11
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text11
                      </div>
                    </div>
                  </div>
                  <div className="my-carousel__item box12">
                    <div className="my-carousel__item__content">
                      <div className="my-carousel__item__content__img">
                        Image12
                      </div>
                      <div className="my-carousel__item__content__text">
                        Text12
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-navigator">
                  <div
                    className="carousel-navigator__inner"
                    style={{
                      width:
                        Math.ceil(numberOfItems / itemsInNavigatorView) * 100 +
                        "%",
                    }}
                  >
                    {itemsArray.map((item) => {
                      return (
                        <div
                          className="item-container"
                          key={item}
                          style={{
                            width: 100 / itemsInNavigatorView + "vw",
                            height: "100%",
                          }}
                        >
                          <div
                            onClick={() => navigateToItem(item)}
                            className={`carousel-navigator__item item${item}`}
                          >
                            {item}
                          </div>
                        </div>
                      );
                    })}
                    {/* <div className="carousel-navigator__item">
                First
              </div>
              <div className="carousel-navigator__item">
                Second
              </div>
              <div className="carousel-navigator__item">
                Third
              </div>
              <div className="carousel-navigator__item">
                Fourth
              </div>
              <div className="carousel-navigator__item">
                Fifth
              </div>
              <div className="carousel-navigator__item">
                Sixth
              </div> */}
                  </div>
                  <div className="carousel-navigator-back" onClick={backNavigatorInner}><MdArrowBackIosNew className="carousel-navigator-back-svg" /></div>
                  <div className="carousel-navigator-next" onClick={nextNavigatorInner}><MdArrowForwardIos className="carousel-navigator-next-svg" /></div>
              </div>
             </div>
            </div>
          </div>
        </div>

    </div>
  );
}

export default App;
