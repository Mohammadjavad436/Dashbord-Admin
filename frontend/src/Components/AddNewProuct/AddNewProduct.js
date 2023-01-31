import React, { useState } from "react";

// import "./AddNewProduct.css";
export default function AddNewProduct({ getAllProducts }) {
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductCount, setNewProductCount] = useState("");
  const [newProductImg, setNewProductImg] = useState("");
  const [newProductPopularity, setNewProductPopularity] = useState("");
  const [newProductSale, setNewProductSale] = useState("");
  const [newProductColors, setNewProductColors] = useState("");

  const newProductsInfos = {
    title: newProductTitle,
    price: newProductPrice,
    count: newProductCount,
    img: newProductImg,
    popularity: newProductPopularity,
    sale: newProductSale,
    colors: newProductColors,
  };

  const addNewProduct = (event) => {
    event.preventDefault();
    console.log(newProductsInfos);
    fetch(`http://localhost:8000/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductsInfos),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        getAllProducts();
        emptyInput();
      });
  };

  function emptyInput() {
    setNewProductTitle("");
    setNewProductPrice("");
    setNewProductCount("");
    setNewProductImg("");
    setNewProductPopularity("");
    setNewProductSale("");
    setNewProductColors("");
  }

  return (
    <div className="mt-14">
      <h1 className="text-3xl">افزودن محصول جدید</h1>
      <form
        action="#"
        className="mt-7 bg-stone-200 flex flex-col items-end p-5 rounded-3xl"
      >
        <div
          className="w-full grid "
          style={{ gridTemplateColumns: "1fr 1fr", gap: " 10px 15px" }}
        >
          <div className="flex items-center gap-x-2.5 w-full bg-slate-200 py-0 px-5 ">
            <input
              value={newProductTitle}
              onChange={(event) => setNewProductTitle(event.target.value)}
              type="text"
              placeholder="اسم محصول را بنویسید"
              className="outline-none border-none bg-none py-2 px-2.5	text-sm  w-full rounded-xl"
            />
          </div>
          <div className="flex items-center gap-x-2.5 w-full bg-slate-200 py-0 px-5 ">
            <input
              value={newProductPrice}
              onChange={(event) => setNewProductPrice(event.target.value)}
              type="text"
              placeholder="قیمت محصول را بنویسید"
              className="outline-none border-none bg-none py-2 px-2.5	text-sm  w-full rounded-xl"
            />
          </div>
          <div className="flex items-center gap-x-2.5 w-full bg-slate-200 py-0 px-5 ">
            <input
              value={newProductCount}
              onChange={(event) => setNewProductCount(event.target.value)}
              type="text"
              placeholder="موجودی محصول را بنویسید"
              className="outline-none border-none bg-none py-2 px-2.5	text-sm  w-full rounded-xl"
            />
          </div>
          <div className="flex items-center gap-x-2.5 w-full bg-slate-200 py-0 px-5 ">
            <input
              value={newProductImg}
              onChange={(event) => setNewProductImg(event.target.value)}
              type="text"
              placeholder="آدرس عکس محصول را بنویسید"
              className="outline-none border-none bg-none py-2 px-2.5	text-sm  w-full rounded-xl"
            />
          </div>
          <div className="flex items-center gap-x-2.5 w-full bg-slate-200 py-0 px-5 ">
            <input
              value={newProductPopularity}
              onChange={(event) => setNewProductPopularity(event.target.value)}
              type="text"
              placeholder="میزان محبوبیت محصول را بنویسید"
              className="outline-none border-none bg-none py-2 px-2.5	text-sm  w-full rounded-xl"
            />
          </div>
          <div className="flex items-center gap-x-2.5 w-full bg-slate-200 py-0 px-5 ">
            <input
              value={newProductSale}
              onChange={(event) => setNewProductSale(event.target.value)}
              type="text"
              placeholder="میزان فروش محصول را بنویسید"
              className="outline-none border-none bg-none py-2 px-2.5	text-sm  w-full rounded-xl"
            />
          </div>
          <div className="flex items-center gap-x-2.5 w-full bg-slate-200 py-0 px-5 ">
            <input
              value={newProductColors}
              onChange={(event) => setNewProductColors(event.target.value)}
              type="text"
              placeholder="تعداد رنگ بندی محصول را بنویسید"
              className="outline-none border-none bg-none py-2 px-2.5	text-sm  w-full rounded-xl"
            />
          </div>
        </div>
        <button
          className="bg-blue-500 text-slate-300 text-sm px-5 py-2.5   rounded-xl	"
          onClick={addNewProduct}
        >
          ثبت محصول
        </button>
      </form>
    </div>
  );
}
