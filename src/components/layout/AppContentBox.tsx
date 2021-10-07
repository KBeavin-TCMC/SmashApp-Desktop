import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import AppDataTable from './AppDataTable';

interface Props {
    title: string;
    data: any;
}

const AppContentBox: React.FC<Props> = ({ title, data }) => {
    const [q, setQ] = useState('');

    const search = (rows: any) => {
        const columns = rows[0] && Object.keys(rows[0]);
        return rows.filter((row: any) => columns.some((column: any) => row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1))
    };

    return (
        <Card
          style={{maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden', height: '100%'}}
          className='m-3'
        >
            <Card.Header as="h5">
                <Row>
                    <Col md='10'>
                        {title}
                    </Col>
                    <Col md='2'>
                        <Form.Control value={q} size='sm' placeholder='Search' onChange={(e) => setQ(e.target.value)} />
                    </Col>
                </Row>
            </Card.Header>
            <Card.Body style={{height: '100%'}}>
                <AppDataTable 
                    data={search(data)}
                />
            </Card.Body>
        </Card>
    )
};

export default AppContentBox;