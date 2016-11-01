module.exports = {
	entry: './index.js',
	output: {
		path: './dist',
		filename: 'index.js'
	},
	library: 'Watch',
	libraryTarget: 'umd',
	umdNamedDefine: true,
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react', 'stage-0'],
				plugins: ['transform-object-assign']
			}
		}]
	},
	devtool: '#sourcemap',
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
		scrollmonitor: 'scrollMonitor'
	}
};
