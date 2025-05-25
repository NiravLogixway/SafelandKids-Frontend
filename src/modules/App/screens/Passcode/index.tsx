import React from 'react'
import AppLayout from '@/layouts/AppLayout'
import PasscodeForm from './PasscodeForm'
import CustomHeader from '../../common/CustomHeader'

const Passcode = (props: any) => {
  const { kid } = props.route.params
  const childName = kid ? `${kid.firstName ?? ""} ${kid.lastName ?? ""}`.trim() : ""

  return (
    <AppLayout isBack header={<CustomHeader defaultValue={false} />}>
      <PasscodeForm />
    </AppLayout>
  )
}

export default Passcode