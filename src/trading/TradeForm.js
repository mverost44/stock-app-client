import React, { Component } from 'react'
import Form, { Col } from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

class TradeForm extends Component {
  render () {
    const { handleChange, handleSubmit, confirmSymbol, shareSize, symbol, entryPrice, companyName } = this.props

    const confirmed = (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{companyName}</InputGroup.Text>
          <InputGroup.Text>Market Price: ${entryPrice}</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    )

    return (
      <Form className="mx-3 mt-2">
        <Form.Label>Symbol</Form.Label>
        <Form.Label><span className="text-muted ml-2">Must Confirm Symbol in order to make a trade.</span></Form.Label>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Symbol"
            name="ticker_symbol"
            onChange={handleChange}
            value={symbol}
            required
          />
          <InputGroup.Append>
            <Button onClick={confirmSymbol} variant="outline-secondary">Confirm Symbol</Button>
          </InputGroup.Append>
        </InputGroup>
        <Form.Text className="text-muted mb-1">
        *Required Field
        </Form.Text>

        {this.props.entryPrice ? confirmed : '' }

        <Form.Row>
          <Form.Group as={Col} className="mr-2">
            <Form.Label>Action</Form.Label>
            <Form.Control onChange={handleChange} name="action" as="select">
              <option>Buy</option>
              <option>Short</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Quantity</Form.Label>
            <Form.Control name="size" type="number" onChange={handleChange} value={shareSize} required/>
            <Form.Text className="text-muted">
              *Required Field
            </Form.Text>
          </Form.Group>
        </Form.Row>

        <InputGroup>
          <Button variant="btn btn-primary" type="submit" onClick={handleSubmit}>Trade</Button>
          <InputGroup.Prepend>
            <InputGroup.Text>Trade Amount: ${(entryPrice * shareSize).toFixed(2)}</InputGroup.Text>
          </InputGroup.Prepend>
        </InputGroup>
      </Form>
    )
  }
}

export default TradeForm
