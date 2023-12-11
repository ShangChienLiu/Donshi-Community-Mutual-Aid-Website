import React from "react";

export default function ChooseGender({ setRegisterGender, setChooseActive }) {
  const valueList = [{ text: "男" }, { text: "女" }, { text: "其他" }];

  const genderClick = (text) => {
    setRegisterGender(text);
    setChooseActive(-1);
  };

  return (
    <ul className={"choose-gender-container text-center"}>
      {valueList.map((value, index) => (
        <li
          key={index}
          className={"choose-gender-child p-1 fs-md"}
          onClick={() => genderClick(value.text)}
        >
          {value.text}
        </li>
      ))}
    </ul>
  );
}
