import React from 'react';
import {Form, Segment, Button } from "semantic-ui-react";

export default function AcvitityForm() {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title"/>
        <Form.TextArea placeholder="Description"/>
        <Form.Input placeholder="Category"/>
        <Form.Input placeholder="Date"/>
        <Form.Input placeholder="City"/>
        <Form.Input placeholder="Venue"/>

        <Button floated="right" positive type="submit" content="submit" />

        <Button floated="right" type="button" content="cancel" />

      </Form>
    </Segment>
  )
}