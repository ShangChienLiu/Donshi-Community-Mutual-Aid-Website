import React from "react";

// component
import ImageGridList from "../../ImgGrid/ImageGridList";

export default function ChooseImg({
  fileImgList,
  setFileImgList,
  setChildPopShow,
}) {
  const fileSelectedHandler = (event) => {
    let newFileImgList = [...fileImgList];
    [...event.target.files].forEach((value) => {
      newFileImgList.push(value);
    });
    setFileImgList(newFileImgList);
    // setFileImgList(event.target.files);
  };

  const deleteFile = () => {
    setFileImgList([]);
  };

  const finishChoose = () => {
    setChildPopShow();
  };

  // useEffect(() => {
  //   console.log(fileImgList);
  //   return () => {};
  // }, [fileImgList]);

  return (
    <div className="pop-choose-img d-flex flex-col">
      <div className={"choose-img-file-container d-flex mt-2"}>
        <div className={"choose-img-file-add"}>
          <label
            className={"choose-img-file-label bg-gray-1"}
            htmlFor="file-add"
          >
            新增圖片
          </label>
          <input
            className={"mt-2 choose-img-file-input"}
            id="file-add"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => fileSelectedHandler(e)}
          />
        </div>
        <div className={"choose-img-delete ml-2"}>
          <label
            className={"choose-img-file-label bg-gray-1"}
            onClick={deleteFile}
          >
            刪除圖片
          </label>
        </div>
        <div className={"choose-img-finish d-flex flex-1 jc-end"}>
          <label
            className={"choose-img-file-label bg-gray-1"}
            onClick={finishChoose}
          >
            選擇完成
          </label>
        </div>
      </div>
      <ImageGridList fileImgList={fileImgList} isPost={false}></ImageGridList>
    </div>
  );
}
