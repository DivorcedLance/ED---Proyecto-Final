import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

export function AreaDropDownList({props, dataSource}) {
  console.log("AreaDropDownList props:")
  console.log(props)

  const onChange = (e) => {
    console.log("onChange Detectado")
  }

  return (
    <DropDownListComponent
      id="Area"
      placeholder="Elegir Area"
      data-name="AreaName"
      className="e-field"
      style={{ width: '100%' }}
      dataSource={dataSource}
      change={onChange}
    />
  )
}
