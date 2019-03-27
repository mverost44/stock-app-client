import React, { Component, Fragment } from 'react'
import Form, { Col } from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'

class TradeForm extends Component {
  render () {
    const { handleChange, handleSubmit, confirmSymbol, shareSize, symbol, entryPrice, companyName, handleActionChange, isBuy, accountBalance } = this.props

    const confirmed = (
      <InputGroup>
        <InputGroup.Prepend>
          <InputGroup.Text>{companyName}</InputGroup.Text>
          <InputGroup.Text>Market Price: ${entryPrice}</InputGroup.Text>
        </InputGroup.Prepend>
      </InputGroup>
    )

    const shortSize = (
      <Form.Group as={Col}>
        <Form.Label>Quantity</Form.Label>
        <Form.Control name="size" type="number" max="-1" min={-Math.floor(accountBalance / entryPrice) || -1} onChange={handleChange} value={shareSize} required/>
        <Form.Text className="text-muted">
          *Required Field
        </Form.Text>
      </Form.Group>
    )

    const buySize = (
      <Form.Group as={Col}>
        <Form.Label>Quantity</Form.Label>
        <Form.Control name="size" type="number" min="1" max={Math.floor(accountBalance / entryPrice) || 1} onChange={handleChange} value={shareSize} required/>
        <Form.Text className="text-muted">
          *Required Field
        </Form.Text>
      </Form.Group>
    )

    return (
      <Fragment>
        <Form className="mx-3 my-3">
          <Form.Label>Symbol</Form.Label>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Symbol"
              type="text"
              name="tickerSymbol"
              onChange={handleChange}
              value={symbol}
              required
            />
            <InputGroup.Append>
              <Button onClick={confirmSymbol} variant="outline-secondary">Confirm Symbol</Button>
            </InputGroup.Append>
            <Form.Text className="text-muted mb-1">
            *Must Confirm Symbol in order to make a trade.
            </Form.Text>
          </InputGroup>

          {this.props.entryPrice ? confirmed : '' }

          <Form.Row>
            <Form.Group as={Col} className="mr-2">
              <Form.Label>Action</Form.Label>
              <Form.Control onChange={handleActionChange} name="action" as="select">
                <option>Buy</option>
                <option>Short</option>
              </Form.Control>
            </Form.Group>

            {isBuy ? buySize : shortSize}
          </Form.Row>

          <InputGroup>
            <Button variant="btn btn-primary" type="submit" onClick={handleSubmit}>Trade</Button>
            <InputGroup.Prepend>
              <InputGroup.Text>Trade Amount: ${(entryPrice * shareSize).toFixed(2)}</InputGroup.Text>
            </InputGroup.Prepend>
          </InputGroup>
        </Form>
      </Fragment>
    )
  }
}

export default TradeForm
