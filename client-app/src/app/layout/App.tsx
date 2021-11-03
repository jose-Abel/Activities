import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from "./NavBar";
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { Activity } from "../models/activity";
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
      agent.Activities.list().then(response => {

        let activities: Activity[] = [];

        response.forEach((activity) => {
          activity.date = activity.date.split('T')[0];
          activities.push(activity);
        });

        setActivities(activities);
        setLoading(false);
      })
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

  function handleDeleteActivity(id: string) {
    setActivities([...activities.filter(x => x.id !== id)]);
  }

  if (loading) return <LoadingComponent content='Loading app' />

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

          deleteActivity={handleDeleteActivity}
        />

      </Container>
    </>
  );
}

export default App;
