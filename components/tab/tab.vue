<template>
	<view class="tab">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tab-scroll_box">
				<view 
					class="tab-scroll_item" 
					:class="{'active': currentIndex === index}" 
					v-for="(item, index) in tabList" 
					:key="item._id" 
					@click="clickTab(item, index)">
					{{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons" @click="openEditLabel">
			<uni-icons type="gear" size="26" color="#666"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'tab',
		props: {
			tabList: {
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
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			clickTab(item, index) {
				this.currentIndex = index
				item.index = index
				this.$emit('tab', item)
			},
			openEditLabel() {
				uni.navigateTo({
					url: '/pages/home-label/home-label'
				})
			}
		},
		watch: {
			tabIndex(newValue) {
				// console.log(newValue)
				this.currentIndex = newValue
			}
		}
	}
</script>

<style lang="scss">
	.tab {
		display: flex;
		width: 100%;
		border-bottom: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;
		.tab-scroll {
			flex: 1;
			overflow: hidden;
			box-sizing: border-box;
			.tab-scroll_box {
				display: flex;
				align-items: center;
				flex-wrap: nowrap;
				height: 45px;
				box-sizing: border-box;
				.tab-scroll_item {
					flex-shrink: 0;
					padding: 0 10px;
					font-size: 14px;
					color: #333;
					&.active {
						color: $news-color;
					}
				}
			}
		}
		.tab-icons {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 45px;
			
			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
	}
</style>
