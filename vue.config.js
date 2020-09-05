module.exports = {
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
	},
	devServer: {
		proxy: {
			'/api': {
				target: 'http://192.168.11.100:7001'
			}
		}
	}
}
