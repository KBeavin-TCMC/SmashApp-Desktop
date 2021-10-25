import React, { useRef, useState, useEffect } from 'react';
import { Accordion, Card, Col, FormControl, InputGroup, ListGroup, Row, Tab, Table } from 'react-bootstrap';
import AppTitle from '../components/layout/AppTitle';

var $ = require('jquery');
$.DataTable = require('datatables.net');

const BusinessUnitScreen = () => {
  const [edit, setEdit] = useState(false);
  const dataTable = useRef<any>(null);

  useEffect(() => {
    initAddressTable();
  }, []);

  const initAddressTable = () => {
    if (dataTable) {
      dataTable.current = $("#address-table").DataTable({
        "scrollY": "300px",
        data: [{address: "1075 73rd Street Soutwest, Byron Center, MI 49315", type: "Office", status: "Active"},{address: "15782 Columbian Road, Buchanan, MI 49107", type: "Mailing", status: "Active"},{address: "15782 Columbian Road, Buchanan, MI 49107", type: "Legal", status: "Active"},{address: "15782 Columbian Road, Buchanan, MI 49107", type: "Billing", status: "Active"}],
        columns: [
          {title: "Address", data: 'address'},
          {title: "Type", data: 'type'},
          {title: "Status", data: 'status'}
        ]
      });
    }
  };

  const drawTable = () => {
    setTimeout(() => {
      dataTable.current.columns.adjust().draw();
    }, 1);
  };

  return (
    <>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#details">
        <Row>
          <Col
            style={{ marginRight: '-40px', marginLeft: '15px', marginTop: '40px' }}
            sm={1}
          >
            <ListGroup>
              <ListGroup.Item style={{ padding: 0 , borderRadius: '.35rem 0 0 0', paddingLeft: '5px'}} action href="#details">
                Details
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#accounting">
                Accounting
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#employees">
                Employees
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#operations" onClick={() => drawTable()}>
                Operations
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' }} action href="#pricing">
                Pricing
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0, paddingLeft: '5px' , borderRadius: '0 0 0 .35rem'}} action href="#dispatching">
                Dispatching
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col sm={11}>
            <Card
              style={{ maxHeight: '80vh', minHeight: '60vh', overflow: 'hidden', height: '100%' }}
              className='m-3'
            >
              <Card.Header as="h5">
                <Row>
                  <Col sm='10'>
                    <span>
                      Business Unit
                    </span>
                    <span style={{ float: 'right', color: 'greenyellow' }} onClick={() => setEdit(!edit)}>
                      edit
                    </span>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body style={{ height: '100%' }}>
                <div
                  style={{ height: '100%', overflowY: 'auto' }}
                >
                  <Row>
                    <Col>
                      <Tab.Content>
                        <Tab.Pane eventKey="#details">
                          <Accordion defaultActiveKey="0">
                          <Accordion.Item eventKey="0">
                              <Accordion.Header>Business Unit Information</Accordion.Header>
                              <Accordion.Body>
                          <Row>
                            <Col>
                              <AppFormInput edit={edit} label='Name' value='My Business' />
                              <AppFormInput edit={edit} label='Country' value='United States' />
                              <AppFormInput edit={edit} label='Time Zone' value='(GMT -04:00) Eastern Time' />
                              <AppFormInput edit={edit} label='Region' value='South West' />
                              <AppFormInput edit={edit} label='Status' value='Active' />

                              <AppFormInput edit={edit} label='Start Date' value='03/05/2020' />
                              <AppFormInput edit={edit} label='Effective Date' value='' />
                              <AppFormInput edit={edit} label='Minimum Royalty' value='' />
                              <AppFormInput edit={edit} label='Operational Notes' value='' />
                              <AppFormInput edit={edit} label='Region' value='' />

                              <AppFormInput edit={edit} label='Phone' value='' />
                              <AppFormInput edit={edit} label='Phone 2' value='' />
                              <AppFormInput edit={edit} label='Fax' value='' />
                              <AppFormInput edit={edit} label='Website' value='' />
                              <AppFormInput edit={edit} label='Twitter URL' value='' />
                              <AppFormInput edit={edit} label='Facebook' value='' />
                              <AppFormInput edit={edit} label='LinkedIn' value='' />

                              <AppFormInput edit={edit} label='Legal Company Name' value='Open Door Environment, LLC' />
                              <AppFormInput edit={edit} label='DBA' value='Smash My Trash' />
                              <AppFormInput edit={edit} label='Tax Registration #' value='' />
                              <AppFormInput edit={edit} label='Legal Notes' value='' />
                            </Col>
                            <Col>
                              <AppFormInput edit={edit} label='First Name' value='Heath' />
                              <AppFormInput edit={edit} label='Last Name' value='Reid' />
                              <AppFormInput edit={edit} label='Title' value='President' />
                              <AppFormInput edit={edit} label='Direct Phone' value='' />
                              <AppFormInput edit={edit} label='Mobile' value='' />
                              <AppFormInput edit={edit} label='Direct Fax' value='' />
                              <AppFormInput edit={edit} label='Email' value='heath.reid@smashmytrash.com' />
                              <AppFormInput edit={edit} label='Skype ID' value='' />

                              <AppFormInput edit={edit} label='Invoice Notes' value='' />
                              <AppFormInput edit={edit} label='General Notes' value='' />

                              <AppFormInput edit={edit} label='Hubspot Team' value='404769' />
                            </Col>
                          </Row>
                          </Accordion.Body>
                          </Accordion.Item>
                          <Accordion.Item eventKey="1">
                              <Accordion.Header>Business Unit Addresses</Accordion.Header>
                              <Accordion.Body>
                                <Table
                                  ref={dataTable}
                                  id='address-table'
                                  style={{ fontSize: '12px' }}
                                  responsive
                                  hover
                                  size="sm"
                                >
                                </Table>
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Business Unit Documents</Accordion.Header>
                              <Accordion.Body>
                                Business Unit Documents
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Zip Codes</Accordion.Header>
                              <Accordion.Body>
                                Zip Codes
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                              <Accordion.Header>Data Important</Accordion.Header>
                              <Accordion.Body>
                                Data Important
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#accounting">
                          <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Business Unit Taxes</Accordion.Header>
                              <Accordion.Body>
                                Business Unit Taxes
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Payment Methods</Accordion.Header>
                              <Accordion.Body>
                                Payment Methods
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Authorize.net Credentials</Accordion.Header>
                              <Accordion.Body>
                                Authorize.net Credentials
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                              <Accordion.Header>Export to QuickBooks</Accordion.Header>
                              <Accordion.Body>
                                Export to QuickBooks
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                              <Accordion.Header>QuickBooks Integration Setup</Accordion.Header>
                              <Accordion.Body>
                              QuickBooks Integration Setup
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                              <Accordion.Header>Royalty Statements</Accordion.Header>
                              <Accordion.Body>
                              Royalty Statements
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#employees">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Employees</Accordion.Header>
                              <Accordion.Body>
                                Employees
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Business Unit Contacts</Accordion.Header>
                              <Accordion.Body>
                              Business Unit Contacts
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#operations">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Availability Templates</Accordion.Header>
                              <Accordion.Body>
                              Availability Templates
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Trucks</Accordion.Header>
                              <Accordion.Body>
                              Trucks
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Zones</Accordion.Header>
                              <Accordion.Body>
                              Zones
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#pricing">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Price Lists</Accordion.Header>
                              <Accordion.Body>
                              Price Lists
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#dispatching">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>Client Confirmation Emails</Accordion.Header>
                              <Accordion.Body>
                              Client Confirmation Emails
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                              <Accordion.Header>Client Reminders</Accordion.Header>
                              <Accordion.Body>
                              Client Reminders
                              </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                              <Accordion.Header>Routific Credentials</Accordion.Header>
                              <Accordion.Body>
                              Routific Credentials
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        </Tab.Pane>
                      </Tab.Content>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
}

interface InputProps {
  edit: boolean;
  label: string;
  value: string;
}

const AppFormInput: React.FC<InputProps> = ({ edit, label, value }) => {
  return (
    <div style={{ marginBottom: '5px', fontSize: '12px' }}>
      <span>{label}: </span>
      {edit ? (
        <input value={value} />
      ) : (
        <label>{value}</label>
      )}
    </div>
  )
}

export default BusinessUnitScreen;