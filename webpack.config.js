const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            "events": require.resolve("events/"),
            "util": require.resolve("util/"),
            "crypto": false // Désactivez les modules spécifiques à Node.js qui ne sont pas nécessaires
        }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // Nettoie le répertoire dist avant chaque build
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Chemin vers votre fichier HTML de base
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 9000,
        open: true, // Ouvre automatiquement le navigateur
    },
};
