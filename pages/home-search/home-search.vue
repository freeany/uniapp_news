<template>
	<view class="home">
		<navBar isSearch :keyword="keyword" @input="keywordInput"></navBar>
		<view class="home-list" v-if="!is_searchResult">
			<view class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click="clear">清空</text>
				</view>
				<view v-if="historyLists.length>0" class="label-content">
					<view 
						class="label-content__item" 
						v-for="(item, index) in historyLists" 
						:key="index"
						@click="historySearch(item)">{{ item }}</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
		</view>
		<view v-else>
			<list-scroll v-if="list.length>0">
			<!-- 点击的时候将该数据存放到vuex中， 只有再本组件中的卡片被点击了，才会存放到vuex中，所以在本组件中监听点击事件 -->
				<list-card :item="item" v-for="(item, index) in list" :key="index" @click.native="putStore"></list-card>
			</list-scroll>
			<view v-else class="no-data">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
/* 
	关于搜索这里，在删除的时候，如果用户的删除速度大于一秒，则也会将该数据存放到vuex中，这不是程序问题，而是产品设计问题。
*/
import { mapState } from 'vuex'
import { throttle } from '@/common/utils.js'
export default {
	name: 'home-search',
	data() {
		return {
			list: [],
			is_searchResult: false,
			keyword: ''
		}
	},
	computed: {
		...mapState(['historyLists'])
	},
	onLoad() {
		// this.getSearch()
	},
	methods: {
		getSearch(newVal) {
			uni.showLoading()
			this.$api.get_search({
				value: newVal
			}).then(data => {
				uni.hideLoading()
				this.list = data
				console.log(data, '...')
			}).catch(() => {
				uni.hideLoading()
			}) 
		},
		keywordInput(value, ishistory) {
			if(!value) {
				// 如果没有值的情况下，则不显示搜索结果页
				this.is_searchResult = false
				clearTimeout(this.timer)
				return
			}
			if(!this.historyLists.includes(value)) {
				this.keyword = value
			}
			if(ishistory) {
				this.getSearch(value)
				this.is_searchResult = true
				return
			}
			// 输入框实现防抖，而非节流
			if(this.timer){
				clearTimeout(this.timer)
				this.timer = null
			}
			this.timer = setTimeout(()=>{
				this.getSearch(value)
				this.is_searchResult = true
			},1000)
		},
		// 点击卡片将关键字放入store中
		putStore() {
			this.$store.dispatch('SET_HISTORYLISTS', this.keyword)
		},
		// 点击历史搜索关键字直接进入搜索, 如果是从这里点击进去的，则没必要用防抖函数了
		historySearch(item) {
			// console.log(item)
			this.keywordInput(item,true)
			this.keyword = item
		},
		// 点击清空，清空搜索历史
		clear() {
			this.$store.dispatch('CLEAR_HISTORYLISTS')
			uni.showToast({
				title:"清空完成"
			})
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	display: flex;
	background-color: #f5f5f5;
}

.home {
	display: flex;
	flex-direction: column;
	flex: 1;
	.label-box {
		background-color: #fff;
		margin-bottom: 10px;

		.label-header {
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			color: #666;
			padding: 10px 15px;
			border-bottom: 1px #f5f5f5 solid;

			.label-title {
				color: $news-color;
			}

			.label-clear {
				color: #30b33a;
				font-weight: bold;
			}
		}

		.label-content {
			display: flex;
			flex-wrap: wrap;
			padding: 15px;
			padding-top: 0;

			.label-content__item {
				padding: 2px 10px;
				margin-top: 12px;
				margin-right: 10px;
				border-radius: 5px;
				border: 1px #666 solid;
				font-size: 14px;
				color: #666;
			}
		}
	}
}

.no-data {
	height: 200px;
	line-height: 200px;
	width: 100%;
	text-align: center;
	font-size: 12px;
	color: #666;
}
</style>
