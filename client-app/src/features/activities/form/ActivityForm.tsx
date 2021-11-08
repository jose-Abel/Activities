import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import {Form, Segment, Button } from "semantic-ui-react";
import { useStore } from '../../../app/stores/store';

export default observer(function AcvitityForm() {
  const {activityStore} = useStore();

  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore

  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }

  const [activity, setActivity] = useState(initialState);

  function handleSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = e.target;

    setActivity({...activity, [name]: value});
  }

  return (
    <Segment clearing>
      <Form 
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <Form.Input 
          placeholder="Title" 
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
  
        <Form.TextArea 
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input 
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input 
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input 
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input 
          placeholder="Venue"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />

        <Button 
          floated="right" 
          positive 
          type="submit" 
          content="submit" 
          loading={loading}
        />

        <Button
          onClick={closeForm} 
          floated="right" 
          type="button" 
          content="cancel"

        />

      </Form>
    </Segment>
  )
});