import * as React from 'react';
import { useEffect, useRef } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import './editor-template.css';
import { extend } from '@syncfusion/ej2-base';
import citasJSON from "../../mock/getCitas_mock.json";
import {editorTemplate, editorHeaderTemplate} from './editorTemplate'
/**
 * Schedule editor template sample
 */
const ModalSchedule = () => {
  //DEFINIENDO EL PATIENT ID
  let patientID = 1
  let citas_data = citasJSON.filter(cita => cita.pacienteId === patientID).map((cita) => {
    const formattedCita = {
      Id: cita.id,
      PatientName: cita.PatientName,
      ProfessionalName: cita.profesionalFullName,
      Sumary: cita.ProfessionalName,
      AreaName: cita.areaName,
      StartTime: cita.StartTime,
      EndTime: cita.EndTime,
      Status: cita.status,
    };

    return formattedCita;
  });

  let fliedsCita = {
    id: 'Id',
    subject: {name: 'AreaName', title:'Area', default: 'Add Area'},
    description: {name: 'ProfessionalName'},
    startTime: {name: 'StartTime'},
    endTime: {name: 'EndTime'} 
  }

    let scheduleObj = useRef(null);
    const data = extend([], citas_data, null, true);

    const onEventRendered = (args) => {
      console.log(args.element);
        switch (args.data.Status) {
            case 'PENDING':
                args.element.style.backgroundColor = '#F57F17';
                break;
            case 'Confirmed':
                args.element.style.backgroundColor = '#7fa900';
                break;
            case 'New':
                args.element.style.backgroundColor = '#8e24aa';
                break;
        }
    };
    const onActionBegin = (args) => {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            let data = args.data instanceof Array ? args.data[0] : args.data;
            args.cancel = !scheduleObj.current.isSlotAvailable(data.StartTime, data.EndTime);
        }
    };
    
    /*
    Evitar que se abra el editor cuando no se presione una cita agendada
    */
    const onPopupOpen = (args) => {
      console.log(args)

      if(args.data.AreaName == "Add Area"){
        args.cancel = true
        return
        
      }
      if(args.target && args.type === "QuickInfo"){
        args.cancel = true
        args.type = "Editor"

      }
      /* if((args.target && !args.target.classList.contains('e-appointment') && (args.type === "QuickInfo")) ||((args.type === "Editor") && args.target && (!args.target.classList.contains('e-lib') || !args.target.classList.contains('e-appointment-border')))){
        args.cancel = onEventCheck(args);
      } */
    }

    const onEventCheck = (args) =>{
      let eventObj = args.data instanceof Array ? args.data[0]: args.data;
      return false;
    }

    return (<div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='300px' selectedDate={new Date(2024, 1, 25)} ref={scheduleObj} eventSettings={{ dataSource: data,  fields: fliedsCita}} editorTemplate={editorTemplate} editorHeaderTemplate={editorHeaderTemplate} actionBegin={onActionBegin} showQuickInfo={true} popupOpen={onPopupOpen} eventRendered={onEventRendered}>
            <ViewsDirective>
              <ViewDirective option='Day'/>
              <ViewDirective option='Week'/>
              <ViewDirective option='WorkWeek'/>
              <ViewDirective option='Month'/>
            </ViewsDirective>
            <Inject services={[Day, Week, WorkWeek, Month]}/>
          </ScheduleComponent>
        </div>
      </div>
    </div>);
};
export default ModalSchedule;
