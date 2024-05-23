import { Task } from "../../dist/types/public-types";

// export function initTasks() {
//   const currentDate = new Date();
//   const tasks: Task[] = [
//     {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
//       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
//       name: "Some Project",
//       id: "ProjectSample",
//       progress: 25,
//       type: "project",
//       hideChildren: false,
//       displayOrder: 1,
//     },
//     {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
//       end: new Date(
//         currentDate.getFullYear(),
//         currentDate.getMonth(),
//         2,
//         12,
//         28
//       ),
//       name: "Idea",
//       id: "Task 0",
//       progress: 45,
//       type: "task",
//       project: "ProjectSample",
//       displayOrder: 2,
//       relationshipMap: [
//         {
//           relatedTask: "Task 1",
//           type: "SS"
//         }
//       ]
//     },
//     {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
//       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
//       name: "Research",
//       id: "Task 1",
//       progress: 25,
//       type: "task",
//       project: "ProjectSample",
//       displayOrder: 3,
//       relationshipMap: [
//         {
//           relatedTask: "Task 2",
//           type: "FF"
//         }
//       ]
//     },
//     {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
//       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
//       name: "Discussion with team",
//       id: "Task 2",
//       progress: 10,
//       type: "task",
//       project: "ProjectSample",
//       displayOrder: 4,
//       relationshipMap: [
//         {
//           relatedTask: "Task 3",
//           type: "FS"
//         },
//         {
//           relatedTask: "Task 4",
//           type: "FS"
//         }
//       ]
//     },
//     {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
//       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
//       name: "Developing",
//       id: "Task 3",
//       progress: 2,
//       type: "task",
//       project: "ProjectSample",
//       displayOrder: 5,
//       relationshipMap: []
//     },
//     {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
//       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
//       name: "Review",
//       id: "Task 4",
//       type: "task",
//       progress: 70,
//       project: "ProjectSample",
//       displayOrder: 6,
//       relationshipMap: [
//         {
//           relatedTask: "Task 6",
//           type: "FS"
//         }
//       ]
//     },
//     {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
//       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
//       name: "Release",
//       id: "Task 6",
//       progress: currentDate.getMonth(),
//       type: "milestone",
//       project: "ProjectSample",
//       displayOrder: 7,
//       relationshipMap: []
//     },
//     {
//       start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
//       end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 19),
//       name: "Party Time",
//       id: "Task 9",
//       progress: 0,
//       isDisabled: true,
//       type: "task",
//     },
//   ];
//   return tasks;
// }

export function initTasks() {
  const tasks = [
    {
      id: "1",
      name: "Task 1",
      start: new Date('2023-01-01'),
      end: new Date('2023-01-15'),
      charge_number: 101,
      comments: "Initial phase of the project",
      control_account: "CA-001",
      cost: 5000,
      hrs: 160,
      obs_id: "OBS-01",
      pre_milestone: 0,
      prob: 80,
      progress: 0,
      project_id: 1,
      risk_factor: 5,
      skillset: 2,
      suc_milestone: 1,
      type: "task",
      wbs_id: "WBS-01",
      physical_percent_complete: 0,
      performance: 100,
      bac_hrs: 160,
      etc_hrs: 160,
      actual_hrs: 0,
      dependencies: [],
      relationshipMap: [
        {
          relatedTask: "2",
          type: 'SS'
        }
      ]
    },
    {
      id: "2",
      name: "Task 2",
      start: new Date('2023-01-16'),
      end: new Date('2023-01-31'),
      charge_number: 102,
      comments: "Follow-up phase of the project",
      control_account: "CA-002",
      cost: 3000,
      hrs: 100,
      obs_id: "OBS-02",
      pre_milestone: 1,
      prob: 90,
      progress: 0,
      project_id: 1,
      risk_factor: 3,
      skillset: 3,
      suc_milestone: 0,
      type: "task",
      wbs_id: "WBS-02",
      physical_percent_complete: 0,
      performance: 100,
      bac_hrs: 100,
      etc_hrs: 100,
      actual_hrs: 0,
      dependencies: [],
      relationshipMap: []
    }
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
