"use client";

import type { TourProps } from "antd";
import { Button, Col, Form, Input, Row, Select, Tour, Typography } from "antd";
import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import TitleCustom from "../components/TitleCustom";
import { useLoading } from "../contexts/LoadingContext";

const { TextArea } = Input;
const { Paragraph } = Typography;
const { Option } = Select;

export default function Analysis() {
  const [analysis, setAnalysis] = useState("");
  const [form] = Form.useForm();
  const { setLoading } = useLoading();

  const [tourVisible, setTourVisible] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const predefinedOptions = [
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
  ];

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const response = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          jobDescription: values.jobDescription,
          currentLevel: values.currentLevel,
          currentStack: values.currentStack,
          technologies: values.technologies,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Erro ao enviar análise:", error);
    } finally {
      setLoading(false);
    }
  };

  const refCurrentLevel = useRef<HTMLDivElement>(null);
  const refCurrentStack = useRef<HTMLDivElement>(null);
  const refTechnologies = useRef<HTMLDivElement>(null);
  const refJobDescription = useRef<HTMLDivElement>(null);
  const refAnalyzeButton = useRef<HTMLButtonElement>(null);

  const steps: TourProps["steps"] = [
    {
      title: "Nível Atual",
      description: "Selecione seu nível atual.",
      target: () => refCurrentLevel.current ?? document.createElement("div"),
      nextButtonProps: { children: "Próximo" },
    },
    {
      title: "Stack Atual",
      description: "Escolha ou insira suas tecnologias.",
      target: () => refCurrentStack.current ?? document.createElement("div"),
      nextButtonProps: { children: "Próximo" },
      prevButtonProps: { children: "Anterior" },
    },
    {
      title: "Tecnologias Dominadas",
      description: "Liste as tecnologias que você domina.",
      target: () => refTechnologies.current ?? document.createElement("div"),
      nextButtonProps: { children: "Próximo" },
      prevButtonProps: { children: "Anterior" },
    },
    {
      title: "Descrição da Vaga",
      description: "Cole a descrição da vaga aqui.",
      target: () => refJobDescription.current ?? document.createElement("div"),
      nextButtonProps: { children: "Próximo" },
      prevButtonProps: { children: "Anterior" },
    },
    {
      title: "Botão Analisar Vaga",
      description: "Clique aqui para analisar a vaga.",
      target: () => refAnalyzeButton.current ?? document.createElement("div"),
      nextButtonProps: { children: "Próximo" },
      prevButtonProps: { children: "Anterior" },
    },
    {
      title: "Resultado da Análise",
      description: "Aqui será exibida a análise detalhada.",
      target: () => contentRef.current ?? document.createElement("div"),
      nextButtonProps: { children: "Finalizar" },
      prevButtonProps: { children: "Anterior" },
    },
  ];

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <TitleCustom text="Análise de cargo" />
        </Col>
        <Col>
          <Button type="default" onClick={() => setTourVisible(true)}>
            Dúvidas de como usar? Clique aqui
          </Button>
        </Col>
      </Row>
      <Paragraph>
        Utilize o formulário abaixo para fornecer informações sobre seu nível
        atual, stack e tecnologias que você domina. Em seguida, cole a descrição
        da vaga e obtenha uma análise detalhada.
      </Paragraph>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={12}>
          <div ref={formRef}>
            <Form
              form={form}
              layout="vertical"
              style={{ marginBottom: "24px" }}
            >
              <Form.Item label="Nível Atual" name="currentLevel">
                <div ref={refCurrentLevel}>
                  <Select placeholder="Selecione seu nível atual">
                    <Option value="junior">Junior</Option>
                    <Option value="pleno">Pleno</Option>
                    <Option value="senior">Senior</Option>
                  </Select>
                </div>
              </Form.Item>
              <Form.Item label="Stack Atual" name="currentStack">
                <div ref={refCurrentStack}>
                  <Select
                    mode="tags"
                    placeholder="Selecione ou insira suas tecnologias"
                    style={{ width: "100%" }}
                  >
                    {predefinedOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
              <Form.Item label="Tecnologias Dominadas" name="technologies">
                <div ref={refTechnologies}>
                  <Select
                    mode="tags"
                    placeholder="Liste as tecnologias que você domina"
                    style={{ width: "100%" }}
                  >
                    {predefinedOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Form.Item>
              <Form.Item
                label="Descrição da Vaga"
                name="jobDescription"
                rules={[
                  {
                    required: true,
                    message: "A descrição da vaga é obrigatória!",
                  },
                ]}
              >
                <div ref={refJobDescription}>
                  <TextArea
                    rows={10}
                    placeholder="Cole a descrição da vaga aqui"
                  />
                </div>
              </Form.Item>
            </Form>
            <Button
              type="primary"
              onClick={handleAnalyze}
              style={{ marginTop: "16px" }}
              ref={refAnalyzeButton}
            >
              Analisar vaga
            </Button>
          </div>
        </Col>
        <Col style={{ marginTop: "28px" }} span={12} ref={contentRef}>
          <div
            style={{
              width: "100%",
              height: "490px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              padding: "10px",
              overflowY: "auto",
            }}
          >
            {analysis ? (
              <ReactMarkdown>{analysis}</ReactMarkdown>
            ) : (
              <div
                style={{ color: "#888", textAlign: "center", padding: "20px" }}
              >
                <p>
                  A análise detalhada da descrição da vaga será exibida aqui.
                  Por favor, preencha o formulário ao lado e clique no botão
                  `Analisar vaga` para obter a análise.
                </p>
              </div>
            )}
          </div>
        </Col>
      </Row>
      <Tour
        steps={steps}
        open={tourVisible}
        onClose={() => setTourVisible(false)}
      />
    </>
  );
}
