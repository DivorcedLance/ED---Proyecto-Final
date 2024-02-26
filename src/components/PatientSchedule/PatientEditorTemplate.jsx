import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import citasJSON from '../../mock/patient_dates_mock.json'
import areasJSON from '../../mock/getArea_mock.json'
import avaibleJSON from "../../mock/getDisponible_mock.json";
import { MiniSchedule } from './MiniSchedule'
import { AreaDropDownList } from './AreaDropDownList';
import { useEffect, useState } from 'react';

export const PatientEditorTemplate = (props) => {
  console.log('PatientEditorTemplate props:')
  console.log(props)

  let areaSource = areasJSON.map((area) => area.areaName)

  const [area, setarea] = useState(props.AreaName)
  const [selectedInterval, setSelectedInterval] = useState([new Date(props.StartTime), new Date(props.EndTime)])
  const [professionalsNames, setProfessionalsNames] = useState([])

  const onChangeArea = (e) => {
    setarea(e.value)
  }

  console.log("area:")
  console.log(area)

  return (
    <table
      className="custom-event-editor"
      style={{ width: "100%" }}
      cellPadding={5}
    >
      <tbody>
        <tr>
          <td className="e-textlabel">Area</td>
          <td colSpan={4}>
            <DropDownListComponent
              id="Area"
              placeholder="Elegir Area"
              data-name="AreaName"
              className="e-field"
              style={{ width: '100%' }}
              dataSource={areaSource}
              change={onChangeArea}
            />
          </td>
        </tr>
        <tr style={{display: "none"}}>
          <td className="e-textlabel">Desde</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="StartTime"
              data-name="StartTime"
              value={selectedInterval[0]}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr style={{display: "none"}}>
          <td className="e-textlabel">Hasta</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="EndTime"
              data-name="EndTime"
              value={selectedInterval[1]}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        {(area) ? (
        <tr>
          <td className="e-textlabel"></td>
          <td colSpan={4}>
            <MiniSchedule
              area={area}
              setSelectedInterval={setSelectedInterval}
              setProfessionalsNames={setProfessionalsNames}
              props={props}
            />
          </td>
        </tr>) : null}
        {(selectedInterval[0].getFullYear() != 1900) ? (
        <tr>
          <td className="e-textlabel">Profesional</td>
          <td colSpan={4}>
            <DropDownListComponent
              id="ProfessionalName"
              placeholder="Elegir Profesional"
              data-name="ProfessionalName"
              className="e-field"
              style={{ width: '100%' }}
              dataSource={professionalsNames.map((professional) => professional.profesionalFullName)}
            />
          </td>
        </tr>) : null
        }
      </tbody>
    </table>
  )
}

export const PatientEditorHeaderTemplate = (props) => {
  return (
    <div id="event-header">
      <div>Crear Nueva Cita</div>
    </div>
  )
}

export const PatientEditorFooterTemplate = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          console.log(`editorFooterTemplate props:`)
          console.log(props)
        }}
      >
        Footer button
      </button>
    </div>
  )
}
