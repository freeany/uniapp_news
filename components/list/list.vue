<template>
	<view class="home-swiper">
		<swiper class="home-swiper-list" @change="change" :current="tabIndex">
			<swiper-item v-for="(item, index) in tab" :key="index">
				<view class="swiper-item">
					<!-- 原来的 -->
					<!-- <list-item :list="list"></list-item> -->
					<list-item :list="listCatchData[index]" @loadmore="loadmore" :load="load[index]"></list-item>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// 为什么这里要引入，因为不符合easy component 的规范
import listItem from './list-item.vue'
export default {
	props: {
		tab: {
			type: Array,
			default() {
				return []
			}
		},
		tabIndex: {
			type: Number,
			default: 0
		}
	},
	created() {
		// this.get_list()
	},
	components: {
		listItem
	},
	data() {
		return {
			list: [],
			listCatchData: {
				
			},
			load: {},
			pageSize: 5
		};
	},
	methods: {
		// swiper 滑动的时候
		change(e) {
			const { current } = e.detail
			this.$emit('changeTabIndex', current)
			// swiper 被change的时候触发数据，不管是什么原因触发的change事件都需要获取get_list接口的数据
			// 因为tab 和 swiper是联动的，所以都会tab点击的时候更改:current的值，也会触发change事件。
			if(this.listCatchData[current] || this.tab.length === 0) return
			this.get_list(current)
		},
		// 获取list集合
		get_list(index) {
			// 每次切换的时候如果已经加载过就不用再去请求了。 如果想要更新的数据，用户手动上拉刷新就会有新的请求了。(产品设计问题)
			// 上拉加载加的逻辑
			if(!this.load[index]) {
				this.$set(this.load, index, {page: 1, loading: 'loading'})
			}
			// 传递index，用传递过来的index进行判断 筛选当前 组件有的数据
			this.$api.get_list({
				name: this.tab[index].name,
				page: this.load[index].page,
				pageSize: this.pageSize
			}).then(data => {
				if(data.length === 0) {
					this.load[index].loading = 'noMore'
					return
				}
				// 在未处理以前，每次tabIndex改变，页面都会闪烁一下，
				// 因为 每次拿接口数据和渲染到dom上(渲染dom的时间可以忽略)都需要时间，而切换的动作发生的时候，没拿到数据之前，页面显示的是原来的值，
				// 拿到值之后，再去渲染成新的值。
				// this.list = data // 原来的
				
				// 解决方案： 
				/*
					定义一个缓存数据的对象，给list-item的时候，给 缓存对象的所对应的下标的值，这样如果缓存对象中没有的话，就显示空，如果有的话，就显示缓存对象中的数据
					而且不用担心数据被缓存无法拿到最新的数据的问题，因为每次都是请求的新的数据，除非新的数据与旧的数据非常不一致的情况，可能会出现闪烁的情况。
					每个组件中的数据都不同的(根据index和listCatchData的缘故)， 所以滑动的时候会显示原先的
					如果粗暴的this.list = data, 那么每一个组件的list数据都是相同的，所以会出现滑动的过程看到上一页或者下一页还是当前的。
				*/
			   // console.log(data)
			   // let fullListData = []
			   // this.listCatchData[index]
			   let currentListData = this.listCatchData[index] || []
			   let fullList = [...currentListData, ...data]
			   this.$set(this.listCatchData, index, fullList)
			})
		},
		loadmore() {
			if(this.load[this.tabIndex].loading === 'noMore') return
			this.$set(this.load, this.tabIndex, {page: ++this.load[this.tabIndex].page, loading: 'loading'})
			this.get_list(this.tabIndex)
		}
	},
	watch: {
		tab(newValue) {
			this.get_list(this.tabIndex)
		}
	}
}
</script>

<style lang="scss">
.home-swiper {
	height: 100%;
	.home-swiper-list {
		height: 100%;
		// overflow: hidden;
		.swiper-item {
			height: 100%;
			display: flex;
		}
	}
}
</style>
