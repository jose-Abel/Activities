import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import NavBar from "./NavBar";
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    });

  }, []);

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();

    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity) {
    activity.id 
    ? setActivities([
        ...activities.filter(x => x.id !== activity.id), activity]) 
    : setActivities([...activities, {...activity, id: uuid()}]);

    setEditMode(false);
    setSelectedActivity(activity);
  }

  return (
    <>
      <NavBar 
        openForm={handleFormOpen}
      />
      <Container style={{ marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          
          selectedActivity={selectedActivity}
          
          selectActivity={handleSelectActivity}

          cancelSelectActivity={handleCancelSelectedActivity}

          editMode={editMode}
          
          openForm={handleFormOpen}

          closeForm={handleFormClose}

          createOrEdit={handleCreateOrEditActivity}
        />

      </Container>
    </>
  );
}

export default App;
