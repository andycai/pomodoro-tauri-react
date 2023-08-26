const ONE_MINUTE = 60;

/**
 * 转换秒数为显示：分:秒
 */
function convertCount(count: number) : string {
  return (`${Math.floor(count / ONE_MINUTE)}:${Math.floor(count % ONE_MINUTE) < 10 ? "0" : ""}${count % ONE_MINUTE}`);
}

// function defaultWorkDuration() {
//   return localStorage.getItem("defaultWorkDuration()") === null ? 1500 : Number(localStorage.getItem("defaultWorkDuration"));
// }
// function defaultBreakDuration() {
//   return localStorage.getItem("defaultBreakDuration") === null ? 300 : Number(localStorage.getItem("defaultBreakDuration"));
// }

// const initialState = {
//   title: "Work",
//   status: Status.Idle,
//   count: defaultWorkDuration(),
//   workType: WorkType.Work,
//   loaded: LoadDataStatus.Idle, // 是否完成加载数据
// }

// function workReducer(state: any, action: any) {
//   switch (action.type) {
//     case Action.Pause:
//       clearInterval(ticker);
//       return {
//         ...state,
//         status: Status.Pause,
//       };
//     case Action.Reset:
//       clearInterval(ticker);
//       return {
//         ...state,
//         count: defaultWorkDuration(),
//         status: Status.Idle,
//         title: "Work",
//         type: WorkType.Work,
//       };
//     case Action.Ready:
//       return {
//         ...state,
//         status: Status.Tick,
//       }
//     case Action.Tick:
//       console.info("action", action.workType);
//       if (action.count < 0) {
//         clearInterval(ticker);
//         if (action.workType === WorkType.Work) {
//           return {
//             ...state,
//             count: defaultWorkDuration(),
//             title: "Work",
//             status: Status.Idle,
//             workType: action.workType,
//           }
//         } else {
//           return {
//             ...state,
//             count: defaultBreakDuration(),
//             title: "Break",
//             status: Status.Idle,
//             workType: action.workType,
//           }
//         }
//       } else {
//         return {
//           ...state,
//           status: Status.Tick,
//           count: action.count,
//         }
//       }
//     default:
//       return state;
//   }
// }

function TimeCounterCom(props: any) {
  // const [state, dispatch] = useReducer(workReducer, initialState);
  // const {title} = state;

  console.info("render TimeCounter");

  let counterShow = convertCount(props.data);

  return (
      <div className="content">
        <h4 className="title">{props.title}</h4>
        <h1 className="time">{counterShow}</h1>
      </div>
  );
}

export default TimeCounterCom;