import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Grid, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivityDetailedInfo';
import ActivityDetailedChat from './ActivityDetailedChat';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default observer(function ActivityDetails() {
  const {activityStore} = useStore();
  const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
  const { id } = useParams<{id: string}>();

  useEffect(() => {
    if (id) {
      loadActivity(id);
    }
  }, [id, loadActivity]);

  if(loadingInitial || !activity) return <LoadingComponent />;
  
  return (
   <Grid>
     <Grid.Column width={10}>
       <ActivityDetailedHeader />
       <ActivityDetailedInfo />
       <ActivityDetailedChat />
     </Grid.Column>
     
     <Grid.Column width={6}>
        <ActivityDetailedSidebar/>
     </Grid.Column>

   </Grid>
  )
});