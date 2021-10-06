import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetCryptoExchangesQuery } from "../services/cryptoApi";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
    
    const { data, isFetching } = useGetCryptoExchangesQuery();
    const globalStatsList = data?.data?.exchanges;

    // console.log(globalStats[1] + '  this is in exchnages');

    if(isFetching) return '..loading';
    
    return (
        <> 
        <Row>
           <Col span={6}>Rank</Col> 
           <Col span={6}>Name</Col> 
           <Col span={6}>Volume</Col> 
           <Col span={6}>Types</Col> 
        </Row>
        <Row>
            {
                globalStatsList.map((exchange)=> (
                   
                //     <Col span={24}>
                //    <Row gutter={[16,16]}> 
                //    <Typography> Rank is {exchange.rank + "  " + exchange.name} </Typography>
                //     <Typography> Price is {exchange.rank + "  " + exchange.name} </Typography>
                //     <Typography> Price is {exchange.rank + "  " + exchange.name} </Typography>
                //     </Row>
                //     </Col>

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
                {HTMLReactParser(exchange.description || '')}
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
