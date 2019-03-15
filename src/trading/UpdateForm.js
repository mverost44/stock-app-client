import React from 'react'
import Form, { Col } from 'react-bootstrap/Form'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

const TradeForm = ({ handleChange, handleSubmit, confirmSymbol, symbol, size }) => (
  <Form className="mx-3 mt-2">
    <Form.Label>Symbol</Form.Label>
    <Form.Label><span className="text-muted ml-2">Must Confirm Symbol in order to make a trade.</span></Form.Label>
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon3">
          {symbol}
        </InputGroup.Text>
      </InputGroup.Prepend>
      <InputGroup.Append>
        <Button onClick={confirmSymbol} variant="outline-secondary">Confirm Symbol</Button>
      </InputGroup.Append>
    </InputGroup>

    <Form.Row>
      <Form.Group as={Col} className="mr-2">
        <Form.Label>Action</Form.Label>
        <Form.Control onChange={handleChange} name="action" as="select">
          <option>Sell</option>
          <option>Buy to Cover</option>
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Quantity</Form.Label>
        <Form.Control name="size" type="number" onChange={handleChange} value={size} />
      </Form.Group>
    </Form.Row>
    <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Trade</button>
  </Form>
)

export default TradeForm
