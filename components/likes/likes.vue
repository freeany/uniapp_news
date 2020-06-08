<template>
	<view class="like-icon"><uni-icons size="20" color="#f07373" :type="isLike?'heart-filled':'heart'"></uni-icons></view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {},
	props: {
		isLike: {
			type: Boolean,
			default: false
		}
	}
};
</script>

<style lang="scss" scoped>
.like-icon {
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	right: 0;
	width: 20px;
	height: 20px;
}
</style>
