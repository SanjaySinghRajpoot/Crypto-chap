import React from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { options } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12,
  });

  if (!cryptoNews?.value) return "Loading...";

  return (
    <Row gutter={[24, 24]}>
     { !simplified && (
         <Col></Col>
     )
     }
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
              </div>
              <p>
               {
                 news.description > 100 ? `${news.description.substring(0, 100)}` : news.description
               }
              </p>
              <div className="provider-container">
                 <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                    <Text className="provider-name">{news.provider[0]?.name}</Text>
                    </div>
                    <Text> {moment(news.datePublished).startOf('ss').fromNow()} </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
