import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import webpack from 'webpack';
import ZipPlugin from 'zip-webpack-plugin';

// MJS compatibility with CJS globals
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setting env
process.env.NODE_ENV = 'production';

// Env-dependent imports
import config from './webpack.config';

const PROJECT_ROOT = path.join(__dirname, '..');

// Zipping extension
const PACKAGE_INFO = JSON.parse(
    fs.readFileSync('package.json', 'utf-8')
) as object & { name: string; version: string };

// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
config.plugins = [...(config.plugins || [])].concat(
    new ZipPlugin({
        filename: `${PACKAGE_INFO.name}-${PACKAGE_INFO.version}.zip`,
        path: path.join(PROJECT_ROOT, 'zip')
    })
);

webpack(config);
