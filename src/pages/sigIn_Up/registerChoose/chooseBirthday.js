import React, { useState } from "react";

// react Calendar 套件
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function ChooseGender({ setRegisterBir, setChooseActive }) {
  const [date, setDate] = useState(new Date()); // 日曆上的日期State

  // 點擊日曆 事件
  const clickCalendat = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    setDate(date);
    setRegisterBir(`${year}-${month}-${day}`);
    setChooseActive(-1);
  };

  return (
    <div className="register-choose-birthday d-flex jc-center bg-white">
      <Calendar onChange={clickCalendat} value={date} />
    </div>
  );
}
