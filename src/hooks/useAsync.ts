import { useCallback, useState } from "react"

export const useAsync = (asyncFunction: any) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const execute = useCallback(() => {
      setLoading(true)
      setData(null)
      setError(null)
      asyncFunction()
        .then((res: any) => {
          setLoading(false)
          setData(res.data)
        })
        .catch((err: any) => {
          setLoading(false)
          setError(err)
        })
    }, [asyncFunction])

    return { execute, loading, data, error }
}

// example
// export default function UserList() {
//   // 通过 useAsync 这个函数，只需要提供异步逻辑的实现
//   const { 
//     execute: fetchUsers,
//     data: users,
//     loading,
//     error,
//   } = useAsync(async () => {
//     const res = await fetch("https://reqres.in/api/users/")
//     const json = await res.json(); return json.data;
//   })
  
//   return ( 
//     // 根据状态渲染 UI...
//   )
// }