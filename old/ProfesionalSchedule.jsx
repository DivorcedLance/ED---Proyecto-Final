import citasJSON from '../mock/citas_mock.json'

import { Inject, ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule'
import Cell from "./Cell"

function ProfesionalSchedule() {
  let citas_data = citasJSON.map((cita) => {
    const formattedCita = {
      Id: cita.id,
      PatientName: cita.PatientName,
      ProfessionalName: cita.ProfessionalName,
      AreaName: cita.AreaName,
      StartTime: cita.date.start,
      EndTime: cita.date.end,
      Status: cita.status,
    }
    
    return formattedCita
  })

  const eventTemplate = (props) => {
    console.log(props)
    return (
      <div>
        <Cell props={props}/>
      </div>
    )
  }

  return (
    <>
      <ScheduleComponent 
        eventSettings = {{dataSource: citas_data}}
      >
        <ViewsDirective>
          <ViewDirective option='Week' eventTemplate={eventTemplate}/>
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
      </ScheduleComponent>
    </>
  )
}

export default ProfesionalSchedule