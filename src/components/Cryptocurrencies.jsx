import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import { Card, Row, Col, Input, Collapse, Typography, Avatar } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;
const { Title } = Typography;

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");
  let filteredData = "";

  console.log(cryptos);

  useEffect(() => {
    filteredData = cryptosList?.data?.coins.filter((coins) =>
      coins.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (filteredData.length == 0) {
    <div>No crypto found</div>;
  }

  if (isFetching) return <Loader />;

  return (
    <>
      {" "}
      {count > 10 && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      {simplified ? (
        <Row>
         <Col ></Col>
          <Col span={6}>Name</Col>
          <Col span={4}>Price</Col>
          <Col span={4}>Change</Col>
          <Col span={3}>Market Cap</Col>
          <Col span={3}>Circulating Supply</Col>
        </Row>
      ) : (
        <div></div>
      )}
      <Row>
        {simplified
          ? cryptos?.map((exchange) => (
              <Col span={24}>
                <Collapse>
                  <Panel
                    key={exchange.id}
                    showArrow={false}
                    header={
                      <Row key={exchange.id}>
                        <Col span={6}>
                          <Text>
                            <strong>{exchange.rank}.</strong>
                          </Text>
                          <Avatar
                            className="exchange-image"
                            src={exchange.iconUrl}
                          />
                          <Text>
                            <strong>{exchange.name}</strong>
                          </Text>
                        </Col>
                        <Col span={4}>${millify(exchange.price)}</Col>
                        <Col span={4}>{exchange.change > 0 ? <Text type="success" medium> {millify(exchange.change)}</Text> : <Text type="danger" medium> {millify(exchange.change)}</Text>} %</Col>
                        <Col span={4}>{millify(exchange.marketCap)}</Col>
                        <Col span={4}>{millify(exchange.circulatingSupply)}</Col>
                      </Row>
                    }
                  >
                  { 
                    exchange.description == 0 ? (<p> No info found </p>) : HTMLReactParser(exchange.description || '')                 
                  }

                  </Panel>
                </Collapse>
              </Col>
            ))
          : ""}
      </Row>
      <br></br>
      <Title level={2} className="home-title">
        Top 10 Cryptocurrencies
      </Title>
      <Row gutter={[32, 32]} className="crypto-card-containers">
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}.${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p> Price: {millify(currency.price)}</p>
                <p> Daily Change: {millify(currency.change)} %</p>
                <p> Market Cap: {millify(currency.marketCap)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
