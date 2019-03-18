import React, { Component } from 'react'
import Form, { Col } from 'react-bootstrap/Form'

import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

class TradeForm extends Component {
  render () {
    const { handleChange, handleSubmit, confirmSymbol, symbol, size, maxSize, exitPrice, company } = this.props

    const confirmed = (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{company}</InputGroup.Text>
          <InputGroup.Text>Market Price: ${exitPrice}</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    )

    return (
      <Form className="mx-3 my-3">
        <Form.Label>Symbol</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="basic-addon3">
              {symbol}
            </InputGroup.Text>
          </InputGroup.Prepend>
          <InputGroup.Append>
            <Button onClick={confirmSymbol} variant="outline-secondary">Confirm Symbol</Button>
          </InputGroup.Append>
          <Form.Text className="text-muted mb-1">
          *Must Confirm Symbol in order to make a trade.
          </Form.Text>
        </InputGroup>

        {this.props.exitPrice ? confirmed : '' }

        <Form.Row>
          <Form.Group as={Col} className="mr-2">
            <Form.Label>Action</Form.Label>
            <Form.Control onChange={handleChange} name="action" as="select" required>
              <option>Sell</option>
              <option>Buy to Cover</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control name="size" type="number" min="1" max={maxSize} onChange={handleChange} value={size} required/>
          </Form.Group>
          <Form.Text className="text-muted mb-1">
          *Required Field
          </Form.Text>
        </Form.Row>

        <InputGroup>
          <Button variant="btn btn-primary" type="submit" onClick={handleSubmit}>Trade</Button>
          <InputGroup.Prepend>
            <InputGroup.Text>Trade Amount: ${(exitPrice * size).toFixed(2)}</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Form>
    )
  }
}

export default TradeForm
