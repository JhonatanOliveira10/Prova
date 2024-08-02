// app/components/TitleCustom.tsx
import { Typography } from "antd";

const { Title } = Typography;

interface TitleCustomProps {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5;
}

export default function TitleCustom({ text, level = 2 }: TitleCustomProps) {
  return <Title level={level}>{text}</Title>;
}
