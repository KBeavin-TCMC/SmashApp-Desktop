import React, { useState, useEffect } from 'react';
import { Col, Form, Row, Table } from 'react-bootstrap';

var $ = require('jquery');
var dt = require('datatables.net');

interface Props {
    data: any;
}

const AppDataTable: React.FC<Props> = ({ data }) => {
    const columns = data[0] && Object.keys(data[0]);
    
    useEffect(() => {
        // fetch('/myfetchpath')
        // $('#table_id').DataTable();
    }, []);

    return (
        <div
        //   style={{height: '100%', overflowY: 'auto'}}
        >
            <Table
            id='table_id'
            style={{fontSize: '12px'}}
            //   striped
              responsive
              hover
              size="sm"
            >
                <thead>
                    <tr>{data[0] && columns.map((heading: any, i: number) => <th key={i}>{heading}</th>)}</tr>
                </thead>
                <tbody>
                    {data.map((row: any, i: number) => <tr key={i}>
                        {
                            columns.map((column: any, i: number) => <td key={i}>{row[column]}</td>)
                        }
                    </tr>)}
                </tbody>
            </Table>
        </div>
    )
};

export default AppDataTable;