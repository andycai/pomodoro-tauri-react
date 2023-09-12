import { useState, useCallback } from "react";

export function CounterRenderProps({ children } : any) {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    setCount(count + 1)
  }, [count])
  const decrement = useCallback(() => {
    setCount(count - 1)
  }, [count])

  return children({ count, increment, decrement })
}

// example
// function CounterRenderPropsExample() {
//   return (
//     <CounterRenderProps>
//       {({ count, increment, decrement }) => {
//         return (
//           <div>
//             <button onClick={decrement}>-</button>
//             <span>{count}</span>
//             <button onClick={increment}>+</button>
//           </div>
//         )
//       }}
//     </CounterRenderProps>
//   )
// }