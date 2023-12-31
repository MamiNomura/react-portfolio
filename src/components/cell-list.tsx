import "./cell-list.css";
import { Fragment } from "react";
import { useTypedSelector } from "../hooks/new-type-selector";
import CellListIten from "./cell-list-item";
import AddCell from "./add-cell";

const CellList: React.FC = () => {

  const cells = useTypedSelector( ({ cells: {order, data} }) => {
    return order.map((id) => {
      return data[id];
    })
  });
  const renderedCells = cells.map( cell => (
    <Fragment key={cell.id} >
      <CellListIten cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  )
  );
  return (
  <div className="cell-list">
    <AddCell forceVisible={cells.length === 0} previousCellId={null} />
    {renderedCells}
    </div>
  );
}

export default CellList;