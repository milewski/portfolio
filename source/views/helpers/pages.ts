import { parseDomain } from "../../../helpers";
import { conform, boolean } from 'dotenv-utils';

export default compiler => {

    const { language, env } = compiler.data.root.htmlWebpackPlugin.options;
    const schema = { ENABLE_ANALYTICS: boolean }
    const DOMAIN = { DOMAIN: parseDomain(env) }

    return compiler.fn(
        Object.assign({}, require(`../../languages/${language}.json`), conform(env, schema), DOMAIN)
    );

};
