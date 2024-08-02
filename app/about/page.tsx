"use client";

import { Divider, List, Space, Typography } from "antd";
import TitleCustom from "../components/TitleCustom";

const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <div>
      <TitleCustom text="Informações sobre utilização do sistema" />
      <Paragraph>
        Este sistema é uma ferramenta desenvolvida para ajudar estudantes e
        desenvolvedores a entender melhor as tecnologias e metodologias
        envolvidas em ofertas de emprego no mercado de tecnologia.
      </Paragraph>
      <Paragraph>
        Com esta ferramenta, você pode colar uma descrição de vaga e obter uma
        análise detalhada das tecnologias mencionadas, juntamente com um plano
        de estudo personalizado para aprimorar suas habilidades e aumentar suas
        chances de conseguir a vaga.
      </Paragraph>
      <Divider />
      <Title level={3}>Como Usar</Title>
      <List
        dataSource={[
          {
            number: 1,
            text: "Na página análise, cole a descrição da vaga no campo fornecido.",
          },
          {
            number: 2,
            text: "Clique no botão “Analisar vaga” para enviar a solicitação.",
          },
          {
            number: 3,
            text: "Receba a análise detalhada e o plano de estudo com base na descrição da vaga.",
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <Space>
              <Title level={4} style={{ margin: 0 }}>
                {item.number}.
              </Title>
              <Paragraph style={{ margin: 0 }}>{item.text}</Paragraph>
            </Space>
          </List.Item>
        )}
      />
      <Divider />
      <Title level={3}>Recursos Adicionais</Title>
      <Paragraph>
        Você também pode informar seu nível atual de conhecimento e as
        tecnologias que já domina para obter recomendações mais precisas e
        personalizadas.
      </Paragraph>
    </div>
  );
}
