import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';
import Loader from '../components/Loader';
import { useGetCryptoExchangesQuery } from "../services/cryptoApi";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    
    const { data, isFetching } = useGetCryptoExchangesQuery();
    const globalStatsList = data?.data?.exchanges;

    // console.log(globalStats[1] + '  this is in exchnages');

    if(isFetching) return <Loader />;
    
    return (
        <> 
        <Row>
           <Col span={6}>Exchanges</Col> 
           <Col span={6}>24h Trade Volume</Col> 
           <Col span={6}>Market</Col> 
           <Col span={6}>Change</Col> 
        </Row>
        <Row>
            {
                globalStatsList.map((exchange)=> (
                <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={6}>${millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                  )}
              >
                { 
                  exchange.description == 0 ? (<p> No info found </p>) : HTMLReactParser(exchange.description || '')                 
                }
              </Panel>
            </Collapse>
          </Col>
                ))
            } 
        </Row>
        </>
    )
}

export default Exchanges;
