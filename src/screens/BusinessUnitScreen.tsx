import React, { useState } from 'react';
import { Card, Col, FormControl, InputGroup, ListGroup, Row, Tab } from 'react-bootstrap';
import AppTitle from '../components/layout/AppTitle';

const BusinessUnitScreen = () => {
  const [edit, setEdit] = useState(false);
  return (
    <>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col
            style={{ marginRight: '-40px', marginLeft: '15px', marginTop: '15px' }}
            sm={1}
          >
            <ListGroup>
              <ListGroup.Item style={{ padding: 0 }} action href="#link1">
                Details
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0 }} action href="#link2">
                Addresses
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0 }} action href="#link3">
                Documents
              </ListGroup.Item>
              <ListGroup.Item style={{ padding: 0 }} action href="#link4">
                Zip Codes
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
                    <Col sm={8}>
                      <Tab.Content>
                        <Tab.Pane eventKey="#link1">
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
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link2">
                          <div>Foo Bar</div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link3">
                          <div>Documents</div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="#link4">
                          <div>Zip Codes</div>
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