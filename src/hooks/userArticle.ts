// import { useState, useEffect } from "react";
// import { httpClient } from "./httpClient";

// // 将获取文章的 API 封装成一个远程资源Hook
// const useArticle = (id: number) => {
//   // 设置三个状态分别存储 data, error, loading
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // 重新获取数据时重置三个状态
//     if (!id) return;
//     setLoading(true);
//     setData(null);
//     setError(null);
//     httpClient
//       .get(`/posts/${id}`)
//       .then((res: any) => {
//         // 请求成功时设置返回数据到状态
//         setLoading(false);
//         setData(res.data);
//       })
//       .catch((err: any) => {
//         // 请求失败时设置错误状态
//         setLoading(false)
//         setError(err)
//       })
//   }, [id]); // 当 id 变化时重新获取数据

//   // 将三个状态作为 Hook 的返回值
//   return { loading, error, data }
// }