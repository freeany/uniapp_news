<template>
	<view class="scroll">
		<scroll-view class="list-scroll" scroll-y @scrolltolower="scrolltolower">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: 'g-listScroll',
		methods: {
			scrolltolower() {
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
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
</style>
