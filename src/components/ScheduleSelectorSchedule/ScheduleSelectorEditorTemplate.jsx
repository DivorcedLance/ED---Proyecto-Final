import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars'
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import citasJSON from '../../mock/patient_dates_mock.json'

export const ScheduleSelectorEditorTemplate = (props) => {
  console.log('ScheduleSelectorEditorTemplate props:')
  console.log(props)

  return (
    <table
      className="custom-event-editor"
      style={{ width: '100%' }}
      cellPadding={5}
    >
      <tbody>
        <tr style={{ display: 'none' }}>
          <td className="e-textlabel">Area</td>
          <td colSpan={4}>
            <input
              id="IntervalName"
              className="e-field e-input"
              type="text"
              name="IntervalName"
              style={{ width: '100%' }}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">From</td>
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
          <td className="e-textlabel">To</td>
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
      </tbody>
    </table>
  )
}

export const ScheduleSelectorEditorHeaderTemplate = (props) => {
  return (
    <div id="event-header">
      <div>Crear Intervalo</div>
    </div>
  )
}

export const ScheduleSelectorEditorFooterTemplate = (props) => {
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
