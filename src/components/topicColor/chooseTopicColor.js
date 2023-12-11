// 依照貼文類型判斷貼文左方border顏色
export default function chooseColor(index) {
  switch (index) {
    case 0:
      return "border-left-pink-1";
    case 1:
      return "border-left-green";
    case 2:
      return "border-left-brown";
    case 3:
      return "border-left-blue-3";
    case 4:
      return "border-left-yellow-1";
    case 5:
      return "border-left-purple";
    case 6:
      return "border-left-orange";
    default:
      return "border-left-pink-1";
  }
}
