import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import citasJSON from "../../mock/patient_dates_mock.json";
import avaibleJSON from "../../mock/getDisponible_mock (1).json";
import { MiniSchedule } from "../PatientSchedule/miniSchedule";

export const TestEditorTemplate = (props) => {
  console.log("TestEditorTemplate props:");
  console.log(props);

  let citas_available = Object.values(avaibleJSON).map((day) => {
    day.map((disponibles) => {
      disponibles.professionals.map((professional) => {
        let cita_temp = {
          StartTime: disponibles.startTime,
          EndTime: disponibles.endTime,
          ProfessionalName: professional.profesionalFullName,
        };
        return cita_temp;
      });
    });
  });

  console.log(citas_available)

  return props !== undefined ? (
    <table
      className="custom-event-editor"
      style={{ width: "100%" }}
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
              readOnly
              style={{ width: "100%" }}
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
        <tr>
          <td className="e-textlabel">Profesional</td>
          <td colSpan={4}>
            <DropDownListComponent
              id="ProfessionalName"
              placeholder="Elegir Profesional"
              data-name="ProfessionalName"
              className="e-field"
              style={{ width: "100%" }}
              dataSource={citasJSON.map((cita) => cita.ProfessionalName)}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel"></td>
          <td colSpan={4}>
            <MiniSchedule props={props} citas_available={citas_available} />
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div></div>
  );
};

export const TestEditorHeaderTemplate = (props) => {
  return (
    <div id="event-header">
      {props !== undefined ? (
        props.Subject ? (
          <div>{props.Subject}</div>
        ) : (
          <div>Crear Nueva Cita</div>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
};

export const TestEditorFooterTemplate = (props) => {
  return (
    <div>
      <button
        onClick={() => {
          console.log(`editorFooterTemplate props:`);
          console.log(props);
        }}
      >
        Footer button
      </button>
    </div>
  );
};
