import React from "react";

export default function Setting({myInfo}) {
  const settingList = [
    {
      bigTitle: "帳戶設定",
      smallTitle: "帳號",
      text: myInfo.account,
    },
    {
      bigTitle: "關於",
      smallTitle: "作者",
      text: "中正大學-東石生活實驗室",
    },
  ];
  return (
    <div className="setting d-flex jc-center mt-5 px-3">
      <div className="setting-container bg-white d-flex flex-col">
        <ul className="setting-list px-3">
          {settingList.map((setting, index) => (
            <li key={index} className="setting-item">
              <p className="big-title fs-xxxl text-dark-green">{setting.bigTitle}</p>
              <p className="small-title fs-xl">{setting.smallTitle}</p>
              <p className="content fs-lg text-gray-6">{setting.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
