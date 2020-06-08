'use strict';
// 获取数据库的引用
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	console.log(event, '.....')
	const {
		user_id,
		name,
		page = 1,
		pageSize = 10
	} = event
	let matchObj = {}
	if (name !== '全部') {
		matchObj = {
			classify: name
		}
	}
	
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_likes_ids = userinfo.data[0].article_likes_ids
	
	// 聚合 ： 更精细化的去处理数据 求和 、分组、指定那些字段

	const list = await db.collection('article')
		.aggregate()
		// 追加字段
		.addFields({
			is_like:$.in(['$_id',article_likes_ids])
		})
		.match(matchObj)
		.project({
			content: 0
		})
		// 要跳过多少数据
		.skip(pageSize * (page - 1))
		.limit(pageSize)
		.end()
	// 接受分类，通过分类去筛选数据
	// const list = await db.collection('article')
	// .field({
	// 	// true 值返回这个字段，false 表示不返回
	// 	content:false
	// })
	// .get()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
