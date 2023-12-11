import React, { useState, useEffect } from "react";

// API
import apis from "../../../apis";

/**
 * 
 * @param postType 貼文 類型(食衣住行)
 * @param setPostTopic 設定 PO文 主題
 * @param setShowChoosePop 設定彈跳視窗-貼文內容(時間、圖片、位址)選擇區塊 是否出現
 * @param setShowMainPop 設定彈跳視窗-彈跳視窗-發布貼文區塊 是否出現
 */
export default function ChooseTopic({
  postType,
  setPostTopic,
  setShowChoosePop,
  setShowMainPop,
}) {
  const [topicList, setTopicList] = useState([]) // 發布貼文類型(食衣住行)下的主題列表

  // 關閉choose pop 開啟 main pop
  const afterChoose = (topic) => {
    setPostTopic(topic); // 設定 PO文 主題
    setShowChoosePop(0);
    setShowMainPop(1);
  };

  // 依照選擇類型拿到貼文主題列表
  useEffect(() => {
    const getTopicsWithType = async () => {
      const res = await apis.TopicApi.getTopicsWithType(postType.id);
      setTopicList(res.data);
    };
    getTopicsWithType();
    return () => {};
  }, [postType]);

  return (
    <div className="pop-choose-child-topic d-flex my-3">
      {topicList.map((topic, index) => (
        <div
          key={index}
          className="choose-child-container py-2 px-3 m-1 fs-lgs bg-gray-5 text-dark-green"
          onClick={() => afterChoose(topic)}
        >
          {topic.topicName}
        </div>
      ))}
    </div>
  );
}
