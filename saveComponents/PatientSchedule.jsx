import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  Resize,
} from '@syncfusion/ej2-react-schedule'
import { extend } from '@syncfusion/ej2-base'

import citasJSON from '../../mock/getCitas_mock.json'
import './PatientEditorTemplate.css'
import { useRef } from 'react'
import { PatientEditorFooterTemplate, PatientEditorHeaderTemplate, PatientEditorTemplate } from './PatientEditorTemplate'

const PatientSchedule = () => {
  let scheduleObj = useRef(null);

  let patientID = 1

  let formattedCitas = citasJSON
    // .filter((cita) => cita.pacienteId === patientID)
    .map((cita) => {
      let formattedCita = {
        Id: cita.citaId,
        PacienteId: cita.pacienteId,
        PatientFullName: cita.pacienteFullName,
        ProfesionalId: cita.profesionalId,
        ProfessionalName: cita.profesionalFullName,
        AreaName: cita.areaName,
        StartTime: cita.StartTime,
        EndTime: cita.EndTime,
        Status: cita.Status,
      }

      return formattedCita
    })

  let scheduleData = formattedCitas
  
  let fieldsCita = {
    id: 'Id',
    subject: { name: 'ProfessionalName' },
    description: { name: 'AreaName', title: 'Area' },
    startTime: { name: 'StartTime' },
    endTime: { name: 'EndTime' },
  }

  const onEventRendered = (args) => {
    console.log(`onEventRedered: `)
    console.log(args)
    let status = args.data.Status
    switch (status) {
      case 'PENDING':
        args.element.style.backgroundColor = '#f7d881'
        break
      case 'ATTENDED':
        args.element.style.backgroundColor = '#c5e4b7'
        break
      case 'CANCELLED':
        args.element.style.backgroundColor = '#f8a398'
        break
      case 'RESCHEDULED':
        args.element.style.backgroundColor = '#a6d7e3'
        break
      default:
        args.element.style.backgroundColor = '#b5bdb5'
        break
    }
  }

  const onActionBegin = (args) => {
    console.log(`onActionBegin: `)
    console.log(args)
    if (
      args.requestType === 'eventCreate' ||
      args.requestType === 'eventChange'
    ) {
      let data = args.data instanceof Array ? args.data[0] : args.data
      // TODO: Lógica para implementar los horarios disponible
      args.cancel = !scheduleObj.current.isSlotAvailable(
        data.StartTime,
        data.EndTime
      )
    }
    if (args.requestType === 'eventRemove') {
      console.log("eliminando")
    }
  }

  const onPopupOpen = (args) => {
    console.log(`onPopupOpen: `)
    console.log(args)
    
    // *: Abrir quickInfo solo si el evento ya existe
    if(args.target && args.type === "QuickInfo" && !args.data.AreaName){
      args.cancel = true
    }

    // *: Abrir editor solo si se está editando un evento existente o se está creando uno nuevo con el botón de Agendar Cita
    if(args.type === "Editor" && !args.data.AreaName && args.duration) {
      args.cancel = true
    }

    if (args.type === 'Editor') {
      let statusElement = args.element.querySelector('#EventType');
      if (statusElement) {
        statusElement.setAttribute('name', 'EventType');
      }
    }
  }


  const onAgendarCitaButtonClick = () => {
    let eventDetails = {
      // TODO: Fetching de un citaId disponible
      StartTime: new Date(2024, 1, 25, 17, 0),
      EndTime: new Date(2024, 1, 25, 18, 0),
    }
    scheduleObj.current.openEditor(eventDetails, 'Add', true)
  }

  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
      <h2>Patient View</h2>
        <div className="control-wrapper">
          <button
            onClick={onAgendarCitaButtonClick}
          >
            Agendar Cita
          </button>

          <button onClick={() => {console.log(scheduleData)}}>
            Imprimir ScheduleData
          </button>

          <ScheduleComponent
            width="100%"
            height="650px"

            ref={scheduleObj}
            
            eventSettings={{ 
              dataSource: scheduleData, 
              fields: fieldsCita 
            }}

            editorHeaderTemplate={PatientEditorHeaderTemplate}
            editorTemplate={PatientEditorTemplate.bind(this)}
            // editorFooterTemplate={PatientEditorFooterTemplate}

            eventRendered={onEventRendered}
            // actionBegin={onActionBegin}
            popupOpen={onPopupOpen}

            showQuickInfo={true}
          >
            <ViewsDirective>
              <ViewDirective option="Week" />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  )
}

export default PatientSchedule
