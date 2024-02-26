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
import './ProfessionalEditorTemplate.css'
import { useRef } from 'react'
import { ProfessionalEditorFooterTemplate, ProfessionalEditorHeaderTemplate, ProfessionalEditorTemplate } from './ProfessionalEditorTemplate'

const ProfessionalSchedule = () => {
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
    subject: { name: 'PatientFullName' },
    description: { name: 'AreaName', title: 'Area' },
    startTime: { name: 'StartTime' },
    endTime: { name: 'EndTime' },
  }

  const onEventRendered = (args) => {
    console.log(`onEventRedered: `)
    console.log(args)
    // TODO: Lógica para cambiar los estilos en renderizado
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
    args.element.classList.add('e-read-only')
    args.element.setAttribute('aria-readonly', 'true')
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
    if (args.target && args.type === "Editor") {
      args.cancel = true
    }

    // // *: Abrir editor solo si se está editando un evento existente o se está creando uno nuevo con el botón de Agendar Cita
    // if(args.type === "Editor" && !args.data.AreaName && args.duration) {
    //   args.cancel = true
    // }

    // if (args.type === 'Editor') {
    //   let statusElement = args.element.querySelector('#EventType');
    //   if (statusElement) {
    //     statusElement.setAttribute('name', 'EventType');
    //   }
    // }


  }

  return (
    
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
      <h2>Proffesional View</h2>
        <div className="control-wrapper">

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

            editorHeaderTemplate={ProfessionalEditorHeaderTemplate}
            editorTemplate={ProfessionalEditorTemplate.bind(this)}
            // editorFooterTemplate={ProfessionalEditorFooterTemplate}

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

export default ProfessionalSchedule
