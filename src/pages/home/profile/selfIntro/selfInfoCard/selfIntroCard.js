import React from "react";

import InfoCardItem from "./introCardItem";

export default function SelfIntroCard({ myInfo, postNum }) {
  const infoCard = [
    {
      title: "貼文數",
      cardImg: "icon-post",
      bgColor: "bg-green",
    },
    {
      title: "連絡電話",
      cardImg: "icon-phone",
      bgColor: "bg-blue-3",
    },
    {
      title: "出生年",
      cardImg: "icon-birthday",
      bgColor: "bg-yellow-1",
    },
  ];
  return (
    <div className="self-intro-card">
      <ul className="self-intro-card-container d-flex p-0 fl-wrap">
        {infoCard.map((card, index) => (
          <InfoCardItem
            key={index}
            card={card}
            index={index}
            myInfo={myInfo}
            postNum={postNum}
          ></InfoCardItem>
        ))}
      </ul>
    </div>
  );
}
