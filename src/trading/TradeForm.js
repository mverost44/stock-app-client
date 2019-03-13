import React from 'react'
import Form, { Col } from 'react-bootstrap/Form'

const TradeForm = () => (
  <Form>
    <Form.Group>
      <Form.Label>Symbol</Form.Label>
      <Form.Control placeholder="Symbol" />
    </Form.Group>

    <Form.Row>
      <Form.Group as={Col}>
        <Form.Label>Action</Form.Label>
        <Form.Control as="select">
          <option>Buy</option>
          <option>Sell</option>
          <option>Short</option>
          <option>Buy to Cover</option>
        </Form.Control>
      </Form.Group>

      <Form.Group as={Col}>
        <Form.Label>Quantity</Form.Label>
        <Form.Control placeholder="Quantity" />
      </Form.Group>
    </Form.Row>
  </Form>
)

export default TradeForm
