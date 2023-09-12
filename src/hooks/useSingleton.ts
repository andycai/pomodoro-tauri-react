import { useRef } from "react";

export function useSingleton(callback: any) {
  const called = useRef(false)
  if (called.current) return 
  callback()
  called.current = true
}
  
// example

// const MyComp = () => {
//   useSingleton(() => {
//     console.log("只执行一次")
//   })
  
//   return (
//     <div>My Component</div>
//   )
// }