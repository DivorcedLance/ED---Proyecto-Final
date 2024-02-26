import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import avaibleJSON from '../../mock/getDisponible_mock (1).json'

export const MiniSchedule = (props) =>{
  let citas_available = Object.values(avaibleJSON).map((day) =>{

  })

  
  console.log(citas_available)
    return (<div className='schedule-control-section'>
      <div className='col-lg-12 control-section'>
        <div className='control-wrapper'>
          <ScheduleComponent width='100%' height='400px' selectedDate={new Date(2024, 1, 24)}>
          
            <Inject services={[Week]}/>
            <ViewsDirective>
              <ViewDirective option='Week'/>
            </ViewsDirective>
          </ScheduleComponent>
        </div>
      </div>
    </div>);
}

