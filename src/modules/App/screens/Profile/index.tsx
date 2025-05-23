import React from 'react'
import AppLayout from '@/layouts/AppLayout'
import ProfileView from './ProfileView'

const Profile = () => {
  return (
    <AppLayout title="Account" isBack>
      <ProfileView />
    </AppLayout>
  )
}

export default Profile