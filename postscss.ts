export const options = {
    sourceMap: true,
    ident: 'postcss',
    plugins: () => {
        return [
            require('autoprefixer')({
                browsers: [
                    "> 5%",
                    "last 2 versions"
                ]
            })
        ]
    }
}
