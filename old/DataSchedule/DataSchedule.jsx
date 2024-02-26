import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
} from '@syncfusion/ej2-react-schedule'

import citasJSON from '../../mock/getCitas_mock.json'

export const DataSchedule = (props) => {

  let formattedCitas = citasJSON
.map((cita) => {
  return {
    Id: cita.citaId,
    PatientFullName: cita.pacienteFullName,
    ProfessionalName: cita.profesionalFullName,
    Sumary: cita.profesionalFullName,
    AreaName: cita.areaName,
    StartTime: cita.StartTime,
    EndTime: cita.EndTime,
    Status: cita.Status,
  }
})

  let data = [
    {
      Id: 1,
      Subject: 'Explosion of Betelgeuse Star',
      StartTime: new Date(2018, 1, 15, 9, 30),
      EndTime: new Date(2018, 1, 15, 11, 0),
    },
    {
      Id: 2,
      Subject: 'Thule Air Crash Report',
      StartTime: new Date(2018, 1, 12, 12, 0),
      EndTime: new Date(2018, 1, 12, 14, 0),
    },
    {
      Id: 3,
      Subject: 'Blue Moon Eclipse',
      StartTime: new Date(2018, 1, 13, 9, 30),
      EndTime: new Date(2018, 1, 13, 11, 0),
    },
    {
      Id: 4,
      Subject: 'Meteor Showers in 2018',
      StartTime: new Date(2018, 1, 14, 13, 0),
      EndTime: new Date(2018, 1, 14, 14, 30),
    },
  ]

  console.log(data)
  console.log(formattedCitas)

  const eventSettings = { dataSource: data }

  return (
    <ScheduleComponent
      height="550px"
      selectedDate={new Date(2018, 1, 15)}
      eventSettings={eventSettings}
    >
      <Inject services={[Week, Agenda, Resize]} />
    </ScheduleComponent>
  )
}
