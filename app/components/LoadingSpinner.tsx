import { Spin } from "antd";
import "antd/dist/reset.css";

const spinnerStyle: React.CSSProperties = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  padding: "20px",
  borderRadius: "4px",
};

export default function LoadingSpinner() {
  return (
    <div style={spinnerStyle}>
      <Spin size="large" />
    </div>
  );
}
