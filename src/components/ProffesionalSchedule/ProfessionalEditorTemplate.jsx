import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import citasJSON from '../../mock/patient_dates_mock.json'

export const ProfessionalEditorTemplate = (props) => {
  console.log('ProfessionalEditorTemplate props:')
  console.log(props)

  return (
    <table
      className="custom-event-editor"
      style={{ width: '100%' }}
      cellPadding={5}
    >
      <tbody>
        <tr>
          <td className="e-textlabel">Area</td>
          <td colSpan={4}>
            <input
              id="Area"
              className="e-field e-input"
              type="text"
              name="AreaName"
              // readOnly
              style={{ width: '100%' }}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Desde</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="StartTime"
              data-name="StartTime"
              value={new Date(props.startTime || props.StartTime)}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Hasta</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="EndTime"
              data-name="EndTime"
              value={new Date(props.endTime || props.EndTime)}
              className="e-field"
            ></DateTimePickerComponent>
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">Profesional</td>
          <td colSpan={4}>
            <DropDownListComponent
              id="PatientFullName"
              placeholder="Elegir Profesional"
              data-name="PatientFullName"
              className="e-field"
              style={{ width: '100%' }}
              dataSource={citasJSON.map((cita) => cita.ProfessionalName)}
            />
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export const ProfessionalEditorHeaderTemplate = (props) => {
  return (
    <div id="event-header">
      <div>Crear Nueva Cita</div>
    </div>
  )
}

export const ProfessionalEditorFooterTemplate = (props) => {
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
