
import { useEffect, useState } from 'react';
import axios from 'axios';
import filter from 'lodash/filter';
import DropDown from "./DropDown";
import { Card, Col, Container, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [country, setCountry] = useState('');
  const [state, setStateVal] = useState('');
  const [city, setCity] = useState('');
  useEffect(() => {
    axios.get('https://raw.githubusercontent.com/Sangeetha-R/sangeetha-r.github.io/main/data/countries.json').then((resp) => {
      setCountries(resp.data);
    });
    axios.get('https://raw.githubusercontent.com/Sangeetha-R/sangeetha-r.github.io/main/data/states.json').then((resp) => {
      setStates(resp.data);
    });
    axios.get('https://raw.githubusercontent.com/Sangeetha-R/sangeetha-r.github.io/main/data/cities.json').then((resp) => {
      setCities(resp.data);
    });
  }, []);
  return (
    <div className="App">
      <Navbar bg="light" expand={false}>
        <Container fluid>
          <Navbar.Brand>Filter Country State City</Navbar.Brand>
        </Container>
      </Navbar>
      <br></br>
      <Container>
        <Row>
          <Col lg={4} xs={12}>
          <Card>
            <Card.Header as="h5">Country</Card.Header>
            <Card.Body>
              {/* <Card.Title>Special title treatment</Card.Title> */}
              <Card.Text>
              <DropDown
                placeholder={'Select a Country'}
                data={countries}
                name="country"
                value={country}
                onChange={(e) => {
                  setCountry(+e.target.value);
                  setStateVal('');
                  setCity('');
                }}
              />
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col lg={4} xs={12}>
          <Card>
            <Card.Header as="h5">State</Card.Header>
            <Card.Body>
              {/* <Card.Title>Special title treatment</Card.Title> */}
              <Card.Text>
              <DropDown
                placeholder={'Select a State'}
                data={filter(states, { country_id: country })}
                name="state"
                value={state}
                onChange={(e) => {
                  setStateVal(+e.target.value);
                  setCity('');
                }}
              />
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col lg={4} xs={12}>
            <Card>
              <Card.Header as="h5">City</Card.Header>
              <Card.Body>
                {/* <Card.Title>Special title treatment</Card.Title> */}
                <Card.Text>
                <DropDown
                  placeholder={'Select a City'}
                  data={filter(cities, { state_id: state })}
                  name="city"
                  value={city}
                  onChange={(e) => {
                    setCity(+e.target.value)
                  }}
                />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
