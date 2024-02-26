import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import citasJSON from "../../mock/patient_dates_mock.json";
import {MiniSchedule} from './miniSchedule'


export const editorTemplate = (props) => {
  console.log("editor template")
    console.log(props)
    return ((props !== undefined) ?
        <table className="custom-event-editor" style={{ width: '100%' }} cellPadding={5}>
    <tbody>
      <tr>
        <td className="e-textlabel">Area</td>
        <td colSpan={4}>
          <input id="Area" className="e-field e-input" type="text" name="AreaName" readOnly style={{ width: '100%' }}/>
        </td>
      </tr>
      <tr>
        <td className="e-textlabel">Profesional</td>
        <td colSpan={4}>
          <DropDownListComponent id="EventType" placeholder='Elegir Profesional' data-name='EventType' className="e-field" style={{ width: '100%' }} dataSource={(citasJSON.map(cita => cita.ProfessionalName))}/>
        </td>
      </tr>
      <tr>
        <td className="e-textlabel">Desde</td>
        <td colSpan={4}>
          <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field"/>
        </td>
      </tr>
      <tr>
        <td className="e-textlabel">Hasta</td><td colSpan={4}>
          <DateTimePickerComponent id="EndTime" format='dd/MM/yy hh:mm a' data-name="EndTime" value={new Date(props.endTime || props.EndTime)} className="e-field"/>
        </td>
      </tr>
      <tr>
      <td className="e-textlabel"></td>
        <td colSpan={4}>
        <MiniSchedule props={props}/>
        </td>
      </tr>
    </tbody>
  </table>
        :
            <div></div>);
};

export const editorHeaderTemplate = (props) => {
    return (<div id="event-header">
    {(props !== undefined) ? ((props.Subject) ? <div>{props.Subject}</div> : <div>Crear Nueva Cita</div>) : <div></div>}
  </div>);
};

export const editorFooterTemplate = (props) =>{
  return(
    <div>
      <button onClick={() => {
        console.log(`editorFooterTemplate props: ${props}`)
      }}>Footer button</button>
    </div>
  )
}