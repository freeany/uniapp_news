<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label-title">我的标签</view>
				<view class="label-edit" @click="editLabel">{{ is_edit ? '完成' : '编辑' }}</view>
			</view>
			<view class="label-content">
				<view class="label-content__item" v-for="item in labelList" :key="item._id">
					{{ item.name }}
					<uni-icons v-if="is_edit" class="icons-close" type="clear" size="20" color="red" @click="clickLabelListItem(item)"></uni-icons>
				</view>
			</view>
		</view>

		<view class="label-box" style="margin-top: 20px;">
			<view class="label-header"><view class="label-title">标签推荐</view></view>
			<view class="label-content">
				<view class="label-content__item" v-for="item in list" :key="item._id" @click="clickListItem(item)">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			is_edit: false,
			// 当前用户选择的标签
			labelList: [],
			// 当前用户没有选择的标签
			list:[],
			loading: false
		};
	},
	onLoad() {
		this.getLabel()
	},
	methods: {
		editLabel() {
			if(this.is_edit) {
				this.is_edit = false
				const ids = this.labelList.map(item => item._id)
				this.unpdate_label(ids)
			}else {
				this.is_edit = true
			}
		},
		getLabel() {
			this.loading = true;
			this.$api
				.get_label({
					type: 'all'
				})
				.then(res => {
					this.labelList = res.filter(item => item.current);
					this.list = res.filter(item => !item.current);
					this.loading = false;
					
				});
		},
		// 点击下面的推荐标签
		clickListItem(item) {
			if(!this.is_edit) return
			this.labelList.push(item)
			const index = this.list.findIndex(item1 => item1._id === item._id )
			this.list.splice(index, 1)
		},
		// 点击我的标签的 叉号
		clickLabelListItem(item) {
			this.list.push(item)
			const index = this.labelList.findIndex(item1 => item1._id === item._id )
			this.labelList.splice(index, 1)
		},
		// 更新label标签
		unpdate_label(label) {
			console.log(label)
			uni.showLoading()
			this.$api.update_label({
				label
			}).then(() => {
				uni.showToast({
					title: '更新成功',
					icon: 'none'
				})
				uni.hideLoading()
				// 发送已经更新了label的事件，首页会监听到此事件
				uni.$emit('label')
			}).catch(() => {
				uni.hideLoading()
			})
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f5f5f5;
}
.label {
	display: flex;
	flex-direction: column;
	.label-box {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		.label-header {
			padding: 0 15px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 40px;
			font-size: 16px;
			color: #666;
			border-bottom: 1px solid #f5f5f5;
			.label-edit {
				color: #30b33a;
			}
		}
		.label-content {
			display: flex;
			flex-wrap: wrap;
			flex-shrink: 0;
			padding: 10px 15px;
			.label-content__item {
				position: relative;
				font-size: 14px;
				color: #666666;
				text-align: center;
				// width: 50px;
				padding: 3px 5px;
				height: 20px;
				line-height: 20px;
				border: 1px solid #666;
				margin: 5px;
				border-radius: 5px;
				.icons-close {
					position: absolute;
					right: -8px;
					top: -8px;
					background-color: #fff;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
