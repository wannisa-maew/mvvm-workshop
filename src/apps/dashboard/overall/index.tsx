import { Table, TableBody } from "baseUI/table";
import Toggle from "baseUI/button/toggle";
import useViewModel from "../useViewModel";
import { TableColumn } from "./components/tableColumn";
import { TableRow } from "./components/tableRow";

export const OverallPage = () => {
  const { data, onRemoveData, onDuplicateData, isError, filterErrors } = useViewModel();

  return (
    <div className=" p-8 pt-[72px] mx-auto">
      <div><Toggle enabled={isError} setEnabled={() => filterErrors(!isError)} /></div>
      <Table>
        <TableColumn />
        <TableBody>
          {data.map((entry, index) => (
            isError ? (
              entry.error && (
                <TableRow
                  data={entry}
                  index={index}
                  onRemove={() => onRemoveData(index)}
                  onDuplicateData={() => onDuplicateData(index)}
                  error={entry.error}
                />
              )
            ) : (
              <TableRow
              data={entry}
              index={index}
              onRemove={() => onRemoveData(index)}
              onDuplicateData={() => onDuplicateData(index)}
              error={entry.error}
            />
            )
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
