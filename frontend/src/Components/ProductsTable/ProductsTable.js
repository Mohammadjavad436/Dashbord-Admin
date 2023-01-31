/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import DeleteModal from "../DeleteModal/DeleteModal";
import DetailsModal from "../DetailsModal/DetailsModal";
import Errorbox from "../Errorbox/Errorbox";
import EditModal from "../EditModal/EditModal";
import { AiOutlineDollarCircle } from "react-icons/ai";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

export default function ProductsTable({ AllProducts, getAllProducts }) {
  ////state////

  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowDetailModal, setIsShowDetailModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  const [productID, setProductID] = useState(null);
  const [mainProductInfos, setmainProductInfos] = useState({});

  const [productNewTitle, setProductNewTitle] = useState("");
  const [productNewPrice, setProductNewPrice] = useState("");
  const [productNewCount, setProductNewCount] = useState("");
  const [productNewImg, setProductNewImg] = useState("");
  const [productNewPopulatity, setProductNewPopulatity] = useState("");
  const [productNewSale, setProductNewSale] = useState("");
  const [productNewColor, setProductNewColor] = useState("");

  const deleteModalCancleAction = () => {
    console.log("مدال کنسل شد");
    setIsShowDeleteModal(false);
  };

  const deleteModalSubmitAction = () => {
    console.log("مدال تایید شد");
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "DELETE",
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setIsShowDeleteModal(false);
        getAllProducts();
        NotificationManager.success(" محصول مورد نظر حذف شد", "😊", 2000);
      });
  };

  const showdatilModal = () => {
    setIsShowDetailModal(false);
    console.log("مدال جزريیات بسته شد");
  };

  const updateProductInfos = (event) => {
    event.preventDefault();
    const productNewInfos = {
      title: productNewTitle,
      price: productNewPrice,
      count: productNewCount,
      img: productNewImg,
      popularity: productNewPopulatity,
      sale: productNewSale,
      colors: productNewColor,
    };
    fetch(`http://localhost:8000/api/products/${productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productNewInfos),
    })
      .then((res) => {
        res.json();
      })
      .then((result) => {
        console.log(result);
        getAllProducts();
        setIsShowEditModal(false);
        NotificationManager.success(
          " محصول مورد نظر با موفقیت ویرایش شد",
          "😊",
          2000
        );
      });

    console.log("محصول ویرایش شد");
  };

  return (
    <>
      {AllProducts.length ? (
        <table className="mt-8 w-full bg-slate-100 rounded-xl">
          <thead>
            <tr
              className="text-center flex justify-between "
              style={{ padding: "0 70px 0 422px" }}
            >
              <th className="p-5">عکس</th>
              <th className="p-5">اسم</th>
              <th className="p-5">قیمت</th>
              <th className="p-5">موجودی</th>
            </tr>
          </thead>
          <tbody>
            {AllProducts.map((product) => (
              <tr
                key={product.id}
                className="text-center flex justify-between "
                style={{ padding: "0 10px 0 30px" }}
              >
                <td className="p-5 flex items-center">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-36 rounded-xl object-cover"
                  />
                </td>
                <td className="p-5 flex items-center">{product.title}</td>
                <td className="p-5 flex items-center">
                  {" "}
                  {product.price} تومان
                </td>
                <td className="p-5 flex items-center">{product.count}</td>
                <td className="p-5 flex items-center">
                  <button
                    className="py-2 px-5   text-sm  rounded-xl text-slate-100 bg-blue-500 mr-5"
                    onClick={() => {
                      setIsShowDetailModal(true);
                      setmainProductInfos(product);
                    }}
                  >
                    جزییات
                  </button>
                  <button
                    className="py-2 px-5   text-sm  rounded-xl text-slate-100 bg-blue-500 mr-5"
                    onClick={() => {
                      setIsShowDeleteModal(true);
                      setProductID(product.id);
                    }}
                  >
                    حذف
                  </button>
                  <button
                    className="py-2 px-5   text-sm  rounded-xl text-slate-100 bg-blue-500 mr-5"
                    onClick={() => {
                      setIsShowEditModal(true);

                      setProductID(product.id);

                      setProductNewTitle(product.title);
                      setProductNewPrice(product.price);
                      setProductNewCount(product.count);
                      setProductNewImg(product.img);
                      setProductNewPopulatity(product.popularity);
                      setProductNewSale(product.sale);
                      setProductNewColor(product.colors);
                    }}
                  >
                    ویرایش
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Errorbox msg={"هیچ محصولی یافت نشد"} />
      )}

      {isShowDeleteModal && (
        <DeleteModal
          cancleAction={deleteModalCancleAction}
          submitAction={deleteModalSubmitAction}
        />
      )}

      {isShowDetailModal && (
        <DetailsModal onHide={showdatilModal}>
          <div className="details-modal">
            <table className="cms-table">
              <thead>
                <tr>
                  <th>محبوبیت</th>
                  <th>فروش</th>
                  <th>رنگ بندی</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{mainProductInfos.popularity}</td>
                  <td>{mainProductInfos.sale}</td>
                  <td>{mainProductInfos.colors}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {console.log(mainProductInfos)}
        </DetailsModal>
      )}

      {isShowEditModal && (
        <EditModal
          onClose={() => setIsShowEditModal(false)}
          onSubmit={updateProductInfos}
        >
          <div className="mt-3.5 flex items-center gap-x-2.5 w-full bg-slate-50 py-0 px-2.5 rounded-xl ">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="عنوان جدید را وارد کنید"
              className="outline-none border-none bg-none text-lg w-full py-2 px-2.5"
              value={productNewTitle}
              onChange={(event) => setProductNewTitle(event.target.value)}
            />
          </div>
          <div className="mt-3.5 flex items-center gap-x-2.5 w-full bg-slate-50 py-0 px-2.5 rounded-xl ">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="قیمت جدید را وارد کنید"
              className="outline-none border-none bg-none text-lg w-full py-2 px-2.5"
              value={productNewPrice}
              onChange={(event) => setProductNewPrice(event.target.value)}
            />
          </div>
          <div className="mt-3.5 flex items-center gap-x-2.5 w-full bg-slate-50 py-0 px-2.5 rounded-xl ">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="کاور جدید را وارد کنید"
              className="outline-none border-none bg-none text-lg w-full py-2 px-2.5"
              value={productNewImg}
              onChange={(event) => setProductNewImg(event.target.value)}
            />
          </div>
          <div className="mt-3.5 flex items-center gap-x-2.5 w-full bg-slate-50 py-0 px-2.5 rounded-xl ">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="تعداد جدید را وارد کنید"
              className="outline-none border-none bg-none text-lg w-full py-2 px-2.5"
              value={productNewCount}
              onChange={(event) => setProductNewCount(event.target.value)}
            />
          </div>
          <div className="mt-3.5 flex items-center gap-x-2.5 w-full bg-slate-50 py-0 px-2.5 rounded-xl ">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="محبوبیت  جدید را وارد کنید"
              className="outline-none border-none bg-none text-lg w-full py-2 px-2.5"
              value={productNewPopulatity}
              onChange={(event) => setProductNewPopulatity(event.target.value)}
            />
          </div>
          <div className="mt-3.5 flex items-center gap-x-2.5 w-full bg-slate-50 py-0 px-2.5 rounded-xl ">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="فروش  جدید را وارد کنید"
              className="outline-none border-none bg-none text-lg w-full py-2 px-2.5"
              value={productNewSale}
              onChange={(event) => setProductNewSale(event.target.value)}
            />
          </div>
          <div className="mt-3.5 flex items-center gap-x-2.5 w-full bg-slate-50 py-0 px-2.5 rounded-xl ">
            <span>
              <AiOutlineDollarCircle />
            </span>
            <input
              type="text"
              placeholder="رنگ های  جدید را وارد کنید"
              className="outline-none border-none bg-none text-lg w-full py-2 px-2.5"
              value={productNewColor}
              onChange={(event) => setProductNewColor(event.target.value)}
            />
          </div>
        </EditModal>
      )}
      <NotificationContainer />
    </>
  );
}
