import { conform, boolean } from 'dotenv-utils';

const schema = {
    ANALYTICS_ENABLED: boolean
}

export default (data, compiler) => {
    const { env, language } = compiler.data.root.htmlWebpackPlugin.options;
    return Object.assign({ language }, env, conform(env, schema))[data];
}
