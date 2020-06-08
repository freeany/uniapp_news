<template>
	<list-scroll  v-on="$listeners">
		<list-card :item="item" v-for="(item, index) in list" :key="index" @click.native="openDetail(item)"></list-card>
		<uni-load-more v-if="list.length === 0 || list.length>4" :status="load.loading" iconType="snow"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default {
		name: 'listItem',
		props: {
			list: {
				type: Array,
				default() {
					return []
				}
			},
			load: {
				type: Object,
				default() {
					return {
						page: 1,
						loading: 'loading'
					}
				}
			}
		},
		methods: {
			openDetail(item) {
				console.log('打开文章详情')
				console.log(item)
				const { author, browse_count, create_time, _id, title, thumbs_up_count } = item
				const params = {
					author, browse_count, create_time, _id, title, thumbs_up_count
				}
				// 获取当前输入框中的数据
				uni.navigateTo({
					url: '/pages/home-detail/home-detail?params='+encodeURIComponent(JSON.stringify(params))
				})
				
			}
		}
	}
</script>

<style>
</style>
