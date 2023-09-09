// import axios from "axios"

// // 定义相关的 endpoint 
// const endPoints = {
//   test: "https://60b2643d62ab150017ae21de.mockapi.io/",
//   prod: "https://prod.myapi.io/",
//   staging: "https://staging.myapi.io/",
// }

// // 创建 axios 的实例
// const instance = axios.create({
//   // 实际项目中根据当前环境设置 baseURL
//   baseURL: endPoints.test,
//   timeout: 30000,
//   // 为所有请求设置通用的 header
//   headers: { Authorization: "Bear mytoken" }
// });

// // 听过 axios 定义拦截器预处理所有请求
// instance.interceptors.response.use(
//   (res: any) => {
//     // 可以假如请求成功的逻辑，比如 log
//     return res
//   },
//   (err: any) => {
//     if (err.response.status === 403) {
//       // 统一处理未授权请求，跳转到登录界面
//       document.location = '/login'
//     }
//     return Promise.reject(err)
// } );

// export default instance


// example
