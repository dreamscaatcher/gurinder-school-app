import Head from "next/head";
import Link from "next/link";
import { Button, Card, Col, Row, Typography } from "antd";
import { BookOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import styles from "../styles/Home.module.css";

const { Title, Paragraph } = Typography;

export default function Home() {
  return (
    <>
      <Head>
        <title>Gurinder School App</title>
        <meta name="description" content="School management platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.page}>
        <div className={styles.hero}>
          <Title className={styles.heroTitle}>Gurinder School App</Title>
          <Paragraph className={styles.heroSubtitle}>
            A learning platform inspired by RS School
          </Paragraph>
          <div className={styles.heroActions}>
            <Link href="/courses">
              <Button type="default" size="large">Browse Courses</Button>
            </Link>
            <Link href="/login">
              <Button size="large" ghost>Login with GitHub</Button>
            </Link>
          </div>
        </div>

        <div className={styles.content}>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card>
                <BookOutlined className={styles.cardIcon} />
                <Title level={4} className={styles.cardTitle}>Courses</Title>
                <Paragraph>Browse and enroll in structured learning courses.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <TeamOutlined className={styles.cardIcon} />
                <Title level={4} className={styles.cardTitle}>Mentorship</Title>
                <Paragraph>Get paired with an experienced mentor to guide you.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <UserOutlined className={styles.cardIcon} />
                <Title level={4} className={styles.cardTitle}>Profile</Title>
                <Paragraph>Track your progress, scores, and certificates.</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
