import React, { useState, useEffect } from "react";
import Config from "../../../../../Config";

// component
import ChooseBirthday from "../../../../sigIn_Up/registerChoose/chooseBirthday";

// API
import apis from "../../../../../apis";

const { BASEURL } = Config;

export default function SelfInfoEdit({
  topStyle,
  showSelfInfoEdit,
  setShowSelfInfoEdit,
  myInfo,
  setMyInfo
}) {
  const [chooseActive, setChooseActive] = useState(-1);
  const [registerSelfIntro, setRegisterSelfIntro] = useState(
    myInfo.introduction
  );
  const [registerBir, setRegisterBir] = useState(myInfo.birthday);
  const [registerPhone, setRegisterPhone] = useState(myInfo.phone);
  const [registerImg, setRegisterImg] = useState([]);
  const [previewImg, setPreviewImg] = useState(
    `${BASEURL}${myInfo.pictureUrl}`
  );

  useEffect(() => {
    console.log(myInfo);
    return () => {};
  }, []);

  const closeSelfEditPop = () => {
    setShowSelfInfoEdit(false);
    let mo = function (e) {
      e.preventDefault();
    };
    document.body.style.overflow = ""; //出現滾動條
    document.removeEventListener("touchmove", mo, false); //禁止頁面滑動
  };

  const inputList = [
    {
      id: "registerSelfIntro",
      icon: "icon-person",
      placeHoder: "自我介紹",
      state: registerSelfIntro,
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
      setRegisterSelfIntro(content);
    } else if (index === 2) {
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
      birthday: registerBir,
      introduction: registerSelfIntro,
      phone: registerPhone,
    };
    const res = await apis.UserApi.updateUser(registerImg, registerUser);
    console.log(res);
    setMyInfo(res.data.user);
    closeSelfEditPop();
  };

  return (
    // 彈跳視窗-編輯刪除區
    <form
      id="selfInfoEdit"
      style={topStyle}
      onSubmit={(e) => e.preventDefault()}
      className={`form-self-edit jc-center ai-center w-100
        ${showSelfInfoEdit ? "show-self-info-edit" : ""}`}
    >
      <div className="self-info-edit-container d-flex bg-white flex-col ai-center pb-3">
        <div className="info-edit-title-container d-flex w-100">
          <p className="info-edit-title fs-xl text-center m-0 py-3 flex-1">
            發布貼文
          </p>
          <i
            className="iconfont icon-close fs-xl bg-primary p-1 mr-3 text-gray-6"
            onClick={closeSelfEditPop}
          ></i>
        </div>

        <label
          className="edit-choose-button bg-gray-2 my-3 d-flex ai-center jc-center"
          htmlFor="edit-img-add"
        >
          {previewImg === "" ? (
            <i className="edit-choose-img-icon iconfont icon-Add text-white"></i>
          ) : (
            <img className={"edit-preview-img"} src={previewImg} alt="" />
          )}
        </label>
        <input
          className={"mt-2 edit-img-input"}
          id="edit-img-add"
          type="file"
          accept="image/*"
          onChange={(e) => fileSelectedHandler(e)}
        />

        <ul className="self-edit-list-container d-flex ai-center jc-center flex-col m-0 p-0 w-100">
          {inputList.map((content, index) => (
            <div
              key={index}
              className={"self-edit-child-container d-flex mb-3"}
            >
              <li className={"self-edit-child d-flex mb-3 w-100"}>
                <i
                  className={`child-icon iconfont ${content.icon} mx-2 fs-xlx d-flex ai-center pr-2`}
                ></i>
                <input
                  id={content.id}
                  maxLength={11}
                  onInput={(event) =>
                    index === 2
                      ? (event.target.value = event.target.value.replace(
                          /[^\d]/g,
                          ""
                        ))
                      : ""
                  }
                  className={"child-input w-100"}
                  type="text"
                  value={content.state}
                  readOnly={index === 1 ? "readOnly" : ""}
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
          className="bt-edit-fin mt-1 py-2 fs-lgs bg-dark-green text-white fw-bold"
          onClick={finish}
        >
          完成
        </button>
      </div>
    </form>
  );
}
