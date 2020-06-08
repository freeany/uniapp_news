<template>
	<view class="detail">
		<view class="detail-title">
			{{ article_info.title }}
		</view>
		<view class="detail-header">
			<view class="detail-header__logo">
				<image :src="article_info.author.avatar" mode="aspectFill"></image>
			</view>
			<view class="detail-header__content">
				<view class="detail-header__content-title">
					{{article_info.author.author_name}}
				</view>
				<view class="detail-header__content-info">
					<text>{{ article_info.create_time }}</text>
					<text>{{ article_info.browse_count }}浏览</text>
					<text>{{ article_info.thumbs_up_count }}赞</text>
				</view>
			</view>
			<button class="detail-header__button" type="default" >关注</button>
		</view>
		<view class="detail-content">
			ddd
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom__input" @>
				<text>谈谈你的看法</text>
				<uni-icons type="compose" size="16" color="#F07373"></uni-icons>
			</view>
			<view class="detail-bottom__icons">
				<view class="detail-bottom__icons-box" >
					<uni-icons type="chat" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box" >
					<uni-icons type="heart" size="22" color="#F07373"></uni-icons>
				</view>
				<view class="detail-bottom__icons-box">
					<uni-icons type="hand-thumbsup" size="22" color="#F07373"></uni-icons>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'home-detail',
		onLoad(query) {
			const params = JSON.parse(query.params)
			this.article_info = params
		},
		data() {
			return {
				article_info: {}
			}
		}
	}
</script>
<style lang="scss">
	.detail {
		padding: 15px 0;
		padding-bottom: 54px;
	}

	.detail-title {
		padding: 0 15px;
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.detail-header {
		display: flex;
		align-items: center;
		margin-top: 10px;
		padding: 0 15px;

		.detail-header__logo {
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail-header__content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;

			.detail-header__content-title {
				font-size: 14px;
				color: #333;
			}

			.detail-header__content-info {
				color: #999;

				text {
					margin-right: 10px;
				}
			}
		}
		.detail-header__button {
			flex-shrink: 0;
			height: 30px;
			font-size: 12px;
			color: #fff;
			background-color: $news-color;
		}
	}

	.detail-content {
		margin-top: 20px;
		min-height: 500px;
		.detail-html {
			padding:0 15px;
		}
		.detail-comment {
			margin-top: 30px;
			.comment-title {
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5ff solid;
			}
			.comment-content {
				padding: 0 15px;
				border-top: 1px #eee solid;
			}
		}
	}

	.detail-bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		width: 100%;
		height: 44px;
		border-top: 1px #f5f5f5 solid;
		background-color: #fff;
		box-sizing: border-box;

		.detail-bottom__input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-left: 10px;
			padding: 0 10px;
			width: 100%;
			height: 30px;
			border: 1px #ddd solid;
			border-radius: 5px;

			text {
				font-size: 14px;
				color: #999;
			}
		}

		.detail-bottom__icons {
			display: flex;
			flex-shrink: 0;
			padding: 0 10px;

			.detail-bottom__icons-box {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 44px;
			}
		}
	}
	

</style>
