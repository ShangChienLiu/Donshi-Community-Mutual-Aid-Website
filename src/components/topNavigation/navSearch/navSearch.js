import React from "react";
import { Link } from "react-router-dom";

/**
 * 上方 bar 搜尋區域
 */
export default function NavSearch({
  setSearchActive,
  setSearchText,
  searchText,
}) {

  return (
    <div className="nav-search-container d-flex ai-center">
      {/* LOGO 區域 */}
      <Link to="/" className="logo" href="#">
        <img
          src={require("../../../assets/image/logo_pure.png")}
          alt="CIRAS-logo"
        />
      </Link>

      {/* 搜尋貼文UI */}
      <form
        className="search d-flex bg-gray-3 p-1 ai-center jc-center"
        onSubmit={(e) => e.preventDefault()}
        onClick={() => setSearchActive(1)}
      >
        <i className="iconfont icon-i-search fw-bold fs-lg p-1"></i>
        <input
          className="search-input bg-none fs-lgs p-0"
          type="text"
          placeholder="搜尋貼文"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
      </form>
    </div>
  );
}
