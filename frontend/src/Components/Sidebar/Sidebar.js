/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCommentDetail } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { BsBagCheck, BsCurrencyDollar } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="fixed bg-blue-500 h-screen flex-1">
      <h1 className="text-2-x text-2xl	p-3 text-right  border-b-2 border-solid  border-b-indigo-900">
        به داشبورد خود خوش آمدید
      </h1>

      <ul className="mt-5">
        <li className="relative p-4 bg-blue-800 mb-4">
          <Link
            to="/products"
            className="w-full text-zinc-300 flex  justify-start items-center text-xl    "
          >
            <AiOutlineHome className="ml-2" />
            صفحه اصلی
          </Link>
        </li>
        <li className="relative p-4">
          <Link
            to="/products"
            className="w-full text-zinc-300 flex  justify-start items-center text-xl   "
          >
            <MdProductionQuantityLimits className="ml-2" />
            محصولات
          </Link>
        </li>
        <li className="relative p-4">
          <Link
            to="/comments"
            className="w-full text-zinc-300 flex  justify-start items-center text-xl   "
          >
            <BiCommentDetail className="ml-2" />
            کامنت ها
          </Link>
        </li>
        <li className="relative p-4">
          <Link
            to="/users"
            className="w-full text-zinc-300 flex  justify-start items-center text-xl   "
          >
            <FiUsers className="ml-2" />
            کاربران
          </Link>
        </li>
        <li className="relative p-4">
          <Link
            to="/orders"
            className="w-full text-zinc-300 flex  justify-start items-center text-xl   "
          >
            <BsBagCheck className="ml-2" />
            سفارشات
          </Link>
        </li>
        <li className="relative p-4">
          <Link
            to="/offs"
            className="w-full text-zinc-300 flex justify-start items-center text-xl  "
          >
            <BsCurrencyDollar className="ml-2" />
            تخفیف ها
          </Link>
        </li>
      </ul>
    </div>
  );
}
