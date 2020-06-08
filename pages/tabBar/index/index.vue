<template>
	<view class="home">
		<navBar></navBar>
		<tab :tabList="tabList" @tab="tab" :tabIndex="tabIndex"></tab>
		<!-- <list-scroll>
			
		</list-scroll> -->
		<list :tab="tabList" :tabIndex="tabIndex" @changeTabIndex="changeTabIndex"></list>
		<!-- 	<list-scroll>
			<view v-for="item in 100" :key="item">{{item}} -- 哈哈哈哈</view>
		</list-scroll> -->
	</view>
</template>

<script>
export default {
	name: 'home',
	data() {
		return {
			tabList: [],
			tabIndex: 0
		};
	},
	created() {
		uni.$on('label', res => {
			// console.log('已经监听到了事件...')
			this.get_label()
		})
		this.get_label();
	},
	methods: {
		// 调用云函数的方法 - 获取tab栏的名称
		get_label() {
			this.$api.get_label().then(data => {
				// const { data } = res
				data.unshift({
					name: '全部'
				});
				// console.log((data))
				this.tabList = data;
			});
			// console.log(this.tabList)
		},
		// 点击tab时
		tab(data) {
			this.tabIndex = data.index || 0;
		},
		// 滑动swiper时
		changeTabIndex(index) {
			this.tabIndex = index;
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	display: flex;
}
.home {
	flex: 1;
	display: flex;
	// 设置这样就不会让其直接子元素挤在一行了。而是像正常的块级元素一样。每一个项目竖向排列，非横向排列
	flex-direction: column;
	height: 100%;
	// border: 1px solid red;
	box-sizing: border-box;
	.scroll {
		flex: 1;
		display: flex;
		overflow: hidden;
		flex-direction: column;
		box-sizing: border-box;
		.list-scroll {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
