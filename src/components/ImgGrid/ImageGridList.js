import React, { useState, useEffect } from "react";

import ImageGallery from "react-image-gallery";

// API
import Config from "../../Config";
const { BASEURL } = Config;

export default function ImageGridList({ postImgList, isPost, fileImgList }) {
  const [previewImgList, setPreviewImgList] = useState([]);

  useEffect(() => {
    const setList = (file) => {
      const fileImg = [
        {
          original: BASEURL + file.url,
          thumbnail: BASEURL + file.url,
        },
      ];
      setPreviewImgList((preImgList) => preImgList.concat(fileImg));
    };

    const readURL = (input) => {
      let reader = new FileReader();

      reader.onload = function (e) {
        const fileImg = [
          {
            original: e.target.result,
            thumbnail: e.target.result,
          },
        ];
        setPreviewImgList((preImgList) => preImgList.concat(fileImg));
      };

      reader.readAsDataURL(input);
    };

    const fileSelectedHandler = () => {
      setPreviewImgList((preImgList) => (preImgList = []));
      if (fileImgList && fileImgList[0]) {
        [...fileImgList].forEach((file) => {
          file.url != null ? setList(file) : readURL(file);
        });
      } else {
        setPreviewImgList((preImgList) => (preImgList = []));
      }
    };

    fileSelectedHandler();
    return () => {};
  }, [fileImgList]);

  const setImgList = () => {
    const postImages = [];
    if (isPost) {
      postImgList.forEach((image) => {
        postImages.push({
          original: BASEURL + image.url,
          thumbnail: BASEURL + image.url,
        });
      });
      return postImages;
    } else {
      return previewImgList;
    }
  };

  return (
    <div className={"img-grid-list my-2"}>
      {isPost ? (
        <ImageGallery
          items={setImgList()}
          showPlayButton={false}
          showFullscreenButton={true}
          showThumbnails={true}
        />
      ) : (
        <ImageGallery
          items={setImgList()}
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={false}
        />
      )}
    </div>
  );
}
