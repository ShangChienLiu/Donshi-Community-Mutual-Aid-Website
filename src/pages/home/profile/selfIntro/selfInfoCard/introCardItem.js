import React from "react";

export default function InfoCardItem({ card, index, myInfo, postNum }) {
  function CardPostNum() {
    return (
      <p className="card-item-content m-0 fs-xl fw-bold">{postNum}</p>
    );
  }

  function CardPhone() {
    return (
      <p className="card-item-content m-0 fs-xl fw-bold">{myInfo.phone}</p>
    );
  }

  function CardBird() {
    return (
      <p className="card-item-content m-0 fs-xl fw-bold">{myInfo.birthday}</p>
    );
  }

  const contentList = [<CardPostNum />, <CardPhone />, <CardBird />];
  return (
    <li className="info-card-item mx-2">
      <div className="card-item-container p-4 d-flex flex-col ai-center jc-between">
        <i className={`iconfont ${card.cardImg} fs-xxxl`}></i>
        <p className="card-item-title m-0 fs-xl">{card.title}</p>
        {contentList[index]}
      </div>
    </li>
  );
}
