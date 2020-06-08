// 中间多走了一层，代码结构清晰

// 批量导出文件
const requireApi = require.context(
	// 当前目录是api目录, 需要批量获取的文件 相对于当前是目录是 '.'
	'.',
	// 是否查询子目录
	false,
	// 查询文件的后缀名
	/.js$/
)
let module = {}
// console.log(requireApi) // 是一个函数，但是在其原型上放了一个keys方法
requireApi.keys().forEach(item => {
	if(item==='./index.js') return 
	Object.assign(module, requireApi(item))
})
// console.log(module)
export default module
// import { get_label, get_list } from './list.js'

// export default {
// 	get_label,
// 	get_list
// }