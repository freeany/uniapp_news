<template>
	<list-scroll  v-on="$listeners">
		<list-card :item="item" v-for="(item, index) in list" :key="index" @click.native="openDetail"></list-card>
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
			openDetail() {
				console.log('打开文章详情')
				// 获取当前输入框中的数据
				uni.navigateTo({
					url: '/pages/home-detail/home-detail'
				})
				
			}
		}
	}
</script>

<style>
</style>
