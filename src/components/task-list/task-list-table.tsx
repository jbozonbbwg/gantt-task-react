import styles from "./task-list-table.module.css";
import { Task } from "../../types/public-types";
import React from "react";

// const localeDateStringCache = {};
// const toLocaleDateStringFactory =
//   (locale: string) =>
//   (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => {
//     const key = date.toString();
//     let lds = localeDateStringCache[key];
//     if (!lds) {
//       lds = date.toLocaleDateString(locale, dateTimeOptions);
//       localeDateStringCache[key] = lds;
//     }
//     return lds;
//   };
// const dateTimeOptions: Intl.DateTimeFormatOptions = {
//   weekday: "short",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };

const TaskRowEditMode = (
  t: Task,
  rowHeight: number,
  rowWidth: string,
  expanderSymbol: string,
  onExpanderClick: (task: Task) => void,
  updateTasks: (task: Task) => void
) => {
  return (
    <div
      className={styles.taskListTableRow}
      style={{ height: rowHeight }}
      key={`${t.id}row`}
    >
      <div
        className={styles.taskListCell}
        style={{
          minWidth: rowWidth,
          maxWidth: rowWidth,
          border: "none",
          backgroundColor: "transparent"
        }}
        title={t.name}
      >
        <div className={styles.taskListNameWrapper}>
          <div
            className={
              expanderSymbol
                ? styles.taskListExpander
                : styles.taskListEmptyExpander
            }
            onClick={() => onExpanderClick(t)}
          >
            {expanderSymbol}
          </div>
          <input
            type="text"
            value={t.name}
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
              width: "100%", // Add this line to make the input fit the cell
            }}
            onChange={(e) => {
              const newTask = {...t, name: e.target.value};
              updateTasks(newTask);
            }}
          />
        </div>
      </div>
      <div
        className={styles.taskListCell}
        style={{
          minWidth: rowWidth,
          maxWidth: rowWidth,
        }}
      >
        <input
          type="date"
          value={t.start.toISOString().split("T")[0]}
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            width: "80%", // Add this line to make the input fit the cell
          }}
          onChange={(e) => {
            const newTask = {...t, start: new Date(e.target.value)};
            updateTasks(newTask);
          }}
        />
      </div>
      <div
        className={styles.taskListCell}
        style={{
          minWidth: rowWidth,
          maxWidth: rowWidth,
        }}
      >
        <input
          type="date"
          value={t.end.toISOString().split("T")[0]}
          style={{
            border: "none",
            backgroundColor: "transparent",
            outline: "none",
            width: "80%", // Add this line to make the input fit the cell
          }}
          onChange={(e) => {
            const newTask = {...t, end: new Date(e.target.value)};
            updateTasks(newTask);
          }}
        />
      </div>
    </div>
  );
}

// const TaskRow = (
//   t: Task,
//   rowHeight: number,
//   rowWidth: string,
//   expanderSymbol: string,
//   onExpanderClick: (task: Task) => void,
//   toLocaleDateString: (date: Date, dateTimeOptions: Intl.DateTimeFormatOptions) => string
// ) => {
//   return (
//     <div
//       className={styles.taskListTableRow}
//       style={{ height: rowHeight }}
//       key={`${t.id}row`}
//     >
//       <div
//         className={styles.taskListCell}
//         style={{
//           minWidth: rowWidth,
//           maxWidth: rowWidth,
//         }}
//         title={t.name}
//       >
//         <div className={styles.taskListNameWrapper}>
//           <div
//             className={
//               expanderSymbol
//                 ? styles.taskListExpander
//                 : styles.taskListEmptyExpander
//             }
//             onClick={() => onExpanderClick(t)}
//           >
//             {expanderSymbol}
//           </div>
//           <div>{t.name}</div>
//         </div>
//       </div>
//       <div
//         className={styles.taskListCell}
//         style={{
//           minWidth: rowWidth,
//           maxWidth: rowWidth,
//         }}
//       >
//         &nbsp;{toLocaleDateString(t.start, dateTimeOptions)}
//       </div>
//       <div
//         className={styles.taskListCell}
//         style={{
//           minWidth: rowWidth,
//           maxWidth: rowWidth,
//         }}
//       >
//         &nbsp;{toLocaleDateString(t.end, dateTimeOptions)}
//       </div>
//     </div>
//   );
// }

export const TaskListTableDefault: React.FC<{
  rowHeight: number;
  rowWidth: string;
  fontFamily: string;
  fontSize: string;
  locale: string;
  tasks: Task[];
  selectedTaskId: string;
  setSelectedTask: (taskId: string) => void;
  onExpanderClick: (task: Task) => void;
}> = ({
  rowHeight,
  rowWidth,
  tasks,
  fontFamily,
  fontSize,
  onExpanderClick,
}) => {
  
  const [tasksState, setTasksState] = React.useState(tasks);

  const updateTasks = (task: Task) => {
    setTasksState(tasksState.map(t => (t.id === task.id ? task : t)));
  }

  return (
    <div
      className={styles.taskListWrapper}
      style={{
        fontFamily: fontFamily,
        fontSize: fontSize,
      }}
    >
      {tasks.map(t => {
        let expanderSymbol = "";
        if (t.hideChildren === false) {
          expanderSymbol = "▼";
        } else if (t.hideChildren === true) {
          expanderSymbol = "▶";
        }
        
        return TaskRowEditMode(t, rowHeight, rowWidth, expanderSymbol, onExpanderClick, updateTasks);

      })}
    </div>
  );
};


