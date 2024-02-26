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
  DragAndDrop,
} from '@syncfusion/ej2-react-schedule'
import { extend } from '@syncfusion/ej2-base'

import citasJSON from '../../mock/getCitas_mock.json'
import './ScheduleSelectorEditorTemplate.css'
import { useRef } from 'react'
import { ScheduleSelectorEditorFooterTemplate, ScheduleSelectorEditorHeaderTemplate, ScheduleSelectorEditorTemplate } from './ScheduleSelectorEditorTemplate'

const ScheduleSelectorSchedule = () => {
  let scheduleObj = useRef(null);

  let scheduleData = []
  
  let fieldsCita = {
    id: 'Id',
    subject: { name: 'IntervalName', default: ' ' },
  }

  const onEventRendered = (args) => {
    console.log(`onEventRedered: `)
    console.log(args)
    // TODO: Lógica para cambiar los estilos en renderizado
    args.element.style.backgroundColor = '#0097c1'

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
        <h2>ScheduleSelector View</h2>

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
              fields: fieldsCita,
            }}

            editorHeaderTemplate={ScheduleSelectorEditorHeaderTemplate}
            editorTemplate={ScheduleSelectorEditorTemplate.bind(this)}
            // editorFooterTemplate={ScheduleSelectorEditorFooterTemplate}

            eventRendered={onEventRendered}
            // actionBegin={onActionBegin}
            popupOpen={onPopupOpen}

            showQuickInfo={false}
          >
            <ViewsDirective>
              <ViewDirective option="Week" />
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month, DragAndDrop, Resize]} />
          </ScheduleComponent>
        </div>
      </div>
    </div>
  )
}

export default ScheduleSelectorSchedule
