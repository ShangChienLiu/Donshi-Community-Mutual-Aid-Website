import React, { useState } from "react";

// component
import ChooseGender from "./registerChoose/chooseGender";
import ChooseBirthday from "./registerChoose/chooseBirthday";

// apis
import apis from "../../apis";

export default function Register({ myInfo }) {
  const [chooseActive, setChooseActive] = useState(-1);
  const [registerName, setRegisterName] = useState("");
  const [registerGender, setRegisterGender] = useState("");
  const [registerBir, setRegisterBir] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerImg, setRegisterImg] = useState([]);
  const [previewImg, setPreviewImg] = useState("");

  const inputList = [
    {
      id: "registerName",
      icon: "icon-person",
      placeHoder: "暱稱(必填)",
      state: registerName,
    },
    {
      id: "registerGender",
      icon: "icon-gender",
      placeHoder: "性別",
      state: registerGender,
      chooseContent: (
        <ChooseGender
          setRegisterGender={setRegisterGender}
          setChooseActive={setChooseActive}
        ></ChooseGender>
      ),
    },
    {
      id: "registerBir",
      icon: "icon-birthday",
      placeHoder: "生日",
      state: registerBir,
      chooseContent: (
        <ChooseBirthday
          setRegisterBir={setRegisterBir}
          setChooseActive={setChooseActive}
        ></ChooseBirthday>
      ),
    },
    {
      id: "registerPhone",
      icon: "icon-phone1",
      placeHoder: "手機號碼",
      state: registerPhone,
    },
  ];

  // 開啟性別或生日選單
  const openChoose = (index) => {
    if (index === 1 || index === 2) {
      chooseActive === index ? setChooseActive(-1) : setChooseActive(index);
    } else {
      setChooseActive(-1);
    }
  };

  // 輸入之後要設定state
  const registerInputChange = (index, content) => {
    if (index === 0) {
      setRegisterName(content);
    } else if (index === 3) {
      setRegisterPhone(content);
    }
  };

  const readURL = (input) => {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        setPreviewImg(e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  };

  const fileSelectedHandler = (event) => {
    setRegisterImg(event.target.files);
    readURL(event.target);
  };

  // 完成
  const finish = async () => {
    const registerUser = {
      ...myInfo,
      username: registerName,
      gender: registerGender,
      birthday: registerBir,
      introduction: "",
      phone: registerPhone,
    };
    await apis.UserApi.updateUser(registerImg, registerUser);
  };

  return (
    <div className="register d-flex ai-center jc-center">
      <div className="register-container bg-white d-flex jc-center ai-center p-3">
        <img
          className="register-title-img"
          src={require("../../assets/image/logo.png")}
          alt=""
        />
        <div className="register-content d-flex flex-col ai-center flex-1">
          <div className="register-title-container d-flex flex-col ai-center">
            <p className="register-title-text fs-xxxl mt-3 mb-3">註 冊</p>
          </div>

          <label
            className="register-choose-button bg-gray-2 my-3 d-flex ai-center jc-center"
            htmlFor="register-img-add"
          >
            {previewImg === "" ? (
              <i className="register-choose-img-icon iconfont icon-Add text-white"></i>
            ) : (
              <img className={"register-preview-img"} src={previewImg} alt="" />
            )}
          </label>
          <input
            className={"mt-2 register-img-input"}
            id="register-img-add"
            type="file"
            accept="image/*"
            onChange={(e) => fileSelectedHandler(e)}
          />

          <ul className="register-step-list-container d-flex ai-center jc-center flex-col m-0 p-0 w-100">
            {inputList.map((content, index) => (
              <div
                key={index}
                className={"register-step-child-container d-flex mb-3"}
              >
                <li className={"register-step-child d-flex mb-3 w-100"}>
                  <i
                    className={`child-icon iconfont ${content.icon} mx-2 fs-xlx d-flex ai-center pr-2`}
                  ></i>
                  <input
                    id={content.id}
                    maxLength={11}
                    onInput={(event) =>
                      index === 3
                        ? (event.target.value = event.target.value.replace(
                            /[^\d]/g,
                            ""
                          ))
                        : ""
                    }
                    className={"child-input w-100"}
                    type="text"
                    value={content.state}
                    readOnly={index === 1 || index === 2 ? "readOnly" : ""}
                    placeholder={content.placeHoder}
                    onChange={(event) =>
                      registerInputChange(index, event.target.value)
                    }
                    onClick={() => openChoose(index)}
                  ></input>
                  {chooseActive === index ? content.chooseContent : <></>}
                </li>
              </div>
            ))}
          </ul>

          <button
            className="bt-register-fin mt-3 py-2 fs-lgs bg-dark-green text-white fw-bold"
            onClick={finish}
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
}
