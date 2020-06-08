const $http = options => {
	const {
		url,
		data
	} = options
	const dataObj = {
		user_id: '5ed2390aa12c6f004e6aa092',
		...data
	}
	return new Promise((resovle, reject) => {
		uniCloud.callFunction({
			name: url,
			data: dataObj
		}).then(data => {
			const {
				result
			} = data
			if (result.code === 200) {
				resovle(result.data)
			} else {
				reject(result.data)
			}
		}).catch((err) => {
			reject(err)
		})
	})
}

export default $http
