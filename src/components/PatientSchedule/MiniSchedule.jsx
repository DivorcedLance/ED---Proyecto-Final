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

import availableJSON from "../../mock/getDisponible_mock.json";

export const MiniSchedule = ({props, area, setSelectedInterval, setProfessionalsNames}) => {

  console.log("MiniSchedule props:")
  console.log(props)

  let scheduleData = []

  let citas_available = Object.values(availableJSON).flatMap((days) => {
    return days.flatMap((disponibles) => {
      let cita_temp = {
        StartTime: disponibles.startTime,
        EndTime: disponibles.endTime,
        ProfessionalsNames: disponibles.professionals
      };
      return cita_temp;
    });
  });
  
  scheduleData = citas_available
  console.log("scheduleData:")
  console.log(scheduleData)

  const onEventRendered = (args) => {
      // if(args.data.Identificador === eleccStart){
      //   args.element.style.backgroundColor = '#0078d4'
      // }else{
      //   args.element.style.backgroundColor = '#1f1f1f'
      // }
  }

  
  const onPopupOpen = (args) => {
    if(args.target.classList.contains('e-appointment')){
      console.log("args.data")
      console.log(args.data)
      setSelectedInterval([args.data.StartTime, args.data.EndTime]);
      setProfessionalsNames(args.data.ProfessionalsNames);
      args.cancel = true;
    } else {
      args.cancel = true;
    }

  }
  
  const onRendercell = (args) => {
    // if (args.elementType == "workCells") {
    //   args.element.style.background = "#6b6b6b"
    // }
  }

  return (
    <div className="schedule-control-section">
      <div className="col-xl-12 control-section">
        <div className="control-wrapper">
          <ScheduleComponent
            width="100%"
            height="400px"
            eventSettings={{
              dataSource: scheduleData,
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
