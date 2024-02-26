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
} from "@syncfusion/ej2-react-schedule";
import '../TestSchedule/TestEditorTemplate.css'

export const MiniSchedule = ({ props, citas_available, eleccStart, update }) => {

  let formatData = [{}];
  if(citas_available[0].startTime){
    formatData = citas_available.map((cita) =>{
      let format = {
        Identificador: String(cita.startTime),
        StartTime: cita.startTime,
        EndTime: cita.endTime,
        Professionals: cita.professionalsName.map((professionalName) => professionalName),
      }
      return format
    })
  }
  

  let scheduleData = formatData;
  console.log("DATA DEL SCHEDULE")
  console.log(scheduleData)
  let fieldsData = {
    identificador: {name: 'Identificador'},
    startTime: { name: "StartTime" },
    endTime: { name: "EndTime" },
    professionalNames: { name: "Professionals" },
  };
  
  const onEventRendered = (args) => {
      if(args.data.Identificador === eleccStart){
        args.element.style.backgroundColor = '#0078d4'
      }else{
        args.element.style.backgroundColor = '#1f1f1f'
      }
  }

  
  const onPopupOpen = (args) => {
    if(args.target.classList.contains('e-appointment')){
      update(args.data.Identificador, args.data.StartTime, args.data.EndTime);
    }
    
    args.target.classList.toggle('seleccionado');
    args.cancel = true;
  }
  
  const onRendercell = (args) => {
    if (args.elementType == "workCells") {
      args.element.style.background = "#6b6b6b" 
    }
  }

  return (
    <div className="schedule-control-section">
      <div className="col-lg-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            width="100%"
            height="400px"
            selectedDate={new Date(2024, 1, 25)}
            eventSettings={{
              dataSource: scheduleData,
              fields: fieldsData,
            }}
            eventRendered={onEventRendered}
            popupOpen={onPopupOpen}
            renderCell={onRendercell}
          >
            <Inject services={[Week]} />
            <ViewsDirective>
              <ViewDirective option="Week" />
            </ViewsDirective>
          </ScheduleComponent>
        </div>
      </div>
    </div>
  );
};
