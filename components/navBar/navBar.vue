<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<view :style="{ height: statusBarHeight + 'px' }"></view>
			<view
				class="navbar-content"
				:class="{ 'navbar-search__search-page': isSearch }"
				:style="{ height: navbarHeight + 'px', width: windowWidth ? windowWidth + 'px' : '100%' }"
			>
				<view v-if="isSearch" class="navbar-content__search-icons" @click="back">
					<uni-icons type="back" size="22" color="#fff"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search" :style="{ height: searchHeight + 'px' }" @click="openSearch">
					<view class="navbar-search_icon">
						<!-- <text class="iconfont icon-search"></text> -->
						<uni-icons type="search" size="16" color="#999"></uni-icons>
					</view>
					<view class="navbar-search_text">uniapp、vue</view>
				</view>
				<view v-else class="navbar-search" :style="{ height: searchHeight + 'px' }">
					<input class="navbar-search_text input-search" type="text" :value="keyword" @input="keywordHandler" placeholder="请输入要搜索的内容" />
				</view>
			</view>
		</view>
		<view class="h45" :style="{ height: statusBarHeight + navbarHeight + 'px' }"></view>
	</view>
</template>

<script>
export default {
	name: 'navBar',
	props: {
		isSearch: {
			type: Boolean,
			default: false
		},
		// 搜索关键字
		keyword: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			// 状态栏的高度
			statusBarHeight: '',
			// 算出来的每个机型的navbar的高度
			navbarHeight: 45,
			// 得到搜索框的长度，避开胶囊按钮
			windowWidth: '',
			// 搜索框的高度与胶囊按钮一致
			searchHeight: 30
		};
	},
	created() {
		// 获取手机系统信息
		const info = uni.getSystemInfoSync();
		// console.log(info)
		// 获取状态栏的高度
		const { statusBarHeight } = info;
		this.statusBarHeight = statusBarHeight;
		// #ifndef H5 || APP-PLUS || MP-ALIPAY
		// 获取胶囊按钮的位置
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		// 得到导航栏的高度  （胶囊按钮的高度 + 胶囊按钮距离上下的高度）
		// (bottom - 状态栏的高度) + (top-状态栏的高度)
		const { top, bottom, height, left } = menuButtonInfo;
		const navbarHeight = bottom - statusBarHeight + (top - statusBarHeight);
		this.navbarHeight = navbarHeight;
		console.log('navbarHeight', navbarHeight);
		this.windowWidth = left;
		// 搜索框的高度与胶囊按钮一致
		this.searchHeight = height;
		console.log('胶囊按钮的高度', height);
		// console.log(this.navbarHeight)
		// 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度
		// const height1 =  (top-statusBarHeight)*2 +  height + statusBarHeight
		// #endif
	},
	methods: {
		openSearch() {
			console.log('跳转');
			uni.navigateTo({
				url: '/pages/home-search/home-search'
			});
		},
		keywordHandler(e) {
			const { value } = e.detail;
			this.$emit('input', value);
		},
		back() {
			uni.switchTab({
				url: '/pages/tabBar/index/index'
			});
		}
	}
};
</script>

<style lang="scss">
@import '../../common/css/icons.css';
.navbar {
	.navbar-fixed {
		position: fixed;
		top: 0;
		left: 0;
		background-color: $news-color;
		width: 100%;
		z-index: 99;
		.navbar-content {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 45px;
			width: 100%;
			padding: 0 15px;
			box-sizing: border-box;
			
			&.navbar-search__search-page {
				padding-left: 0;
				.navbar-content__search-icons {
					margin-left: 10px;
					margin-right: 10px;
				}
				.navbar-search {
					border-radius: 5px;
				}
				// border-radius: 5px;
			}
			.navbar-search {
				display: flex;
				align-items: center;
				width: 100%;
				height: 30px;
				padding: 0 10px;
				background-color: #fff;
				border-radius: 30px;
				.navbar-search_icon {
					// width: 10px;
					// height: 10px;
					// border: 1px solid $news-color;
					margin-right: 10px;
				}
				.navbar-search_text {
					font-size: 14px;
					color: #999;
					&.input-search {
						color: #000;
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	.h45 {
		height: 45px;
	}
}
</style>
