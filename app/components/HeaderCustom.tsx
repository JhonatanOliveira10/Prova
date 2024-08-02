// app/components/HeaderCustom.tsx
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";

const { Header } = Layout;

export default function HeaderCustom() {
  const router = useRouter();
  const pathname = usePathname();

  const items: MenuProps["items"] = [
    {
      key: "/",
      label: "Sobre",
      onClick: () => router.push("/"),
    },
    {
      key: "/analysis",
      label: "Análise",
      onClick: () => router.push("/analysis"),
    },
  ];

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[pathname || ""]}
        items={items}
      />
    </Header>
  );
}
