import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import citasJSON from "../../mock/patient_dates_mock.json";
import avaibleJSON from "../../mock/getDisponible_mock (1).json";
import areas from "../../mock/getArea_mock.json";
import { MiniSchedule } from "../PatientSchedule/miniSchedule";
import { useState, useRef, useEffect } from "react";
import { dataBinding } from "@syncfusion/ej2-react-schedule";

export const TestEditorTemplate = (props) => {
  const verificador = new Date("1900-01-11T11:11");
  const scheduleObj = useRef(null)
  //En caso sea una nueva cita
  //Pseudo llamada a la api para saber las areas
  const Areas = areas.map((area) => area);

  let citas_available = [{}];
  let intervaloCitas = 0;
  //Pseudo llamada a la Api con el dato del area
  const UpdateArea = (area) => {
    console.log(area);
    if (area === "Area 2") {
      intervaloCitas = 2;
      citas_available = Object.values(avaibleJSON).flatMap((day) => {
        return day.flatMap((disponibles) => {
          let cita_temp = {
            startTime: disponibles.startTime,
            endTime: disponibles.endTime,
            professionalsName: disponibles.professionals.map(
              (professional) => professional.profesionalFullName
            ),
          };
          return cita_temp;
        });
      });
    }
  };

  //CONFIGURAR LOS VALORES INICIALES
  var InicialstartTime = "";
  var InicialProfessionalsName = [];
  var InicialHorarioStartTime = new Date("");
  var InicialHorarioEndTime = new Date("");
  
  if (String(props.StartTime) !== String(verificador) && citas_available) {
    UpdateArea(props.AreaName);
    if (citas_available[0].startTime) {
      var InicialstartTime = citas_available[0].startTime;
      var InicialProfessionalsName =
        citas_available[0].startTime.professionalsName;
      var InicialHorarioStartTime = new Date(citas_available[0].startTime);
      var InicialHorarioEndTime = new Date(InicialHorarioStartTime.getTime() + (2 * 60 * 60 *1000));
    }
  }

  const [eleccStart, setEleccStart] = useState({
    tiempo: InicialstartTime,
    profesionales: InicialProfessionalsName,
    startTime: InicialHorarioStartTime,
    endTime: InicialHorarioEndTime,
  });

  const actualizarProfesionales = (nuevoHorario, startTime, endTime) => {
    const disponibles = citas_available.find(
      (cita) => cita.startTime === nuevoHorario
    );
    const profesionales = disponibles ? disponibles.professionalsName : [];
    setEleccStart({ nuevoHorario, profesionales, startTime, endTime });
  };

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
            {String(props.StartTime) === String(verificador) ? (
              <DropDownListComponent
                id="Area"
                placeholder="Seleccionar el Area"
                data-name="AreaName"
                className="e-field"
                style={{ width: "100%" }}
                onClick={UpdateArea(dataBinding)}
                dataSource={Areas.map((area) => area.areaName)}
              />
            ) : (
              <input
                id="Area"
                className="e-field e-input"
                type="text"
                name="AreaName"
                readOnly
                style={{ width: "100%" }}
              />
            )}
          </td>
        </tr>
        <tr>
          <td className="e-textlabel">From</td>
          <td colSpan={4}>
            <DateTimePickerComponent
              format="dd/MM/yy hh:mm a"
              id="StartTime"
              data-name="StartTime"
              value={eleccStart.startTime}
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
              value={eleccStart.endTime}
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
              dataSource={eleccStart.profesionales}
            />
          </td>
        </tr>
        <tr>
          <td className="e-textlabel"></td>
          <td colSpan={4}>
            <MiniSchedule
              props={props}
              citas_available={citas_available}
              eleccStart={eleccStart.tiempo}
              update={actualizarProfesionales}
            />
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
