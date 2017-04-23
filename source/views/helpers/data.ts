function dot(object: any, path: string) {

    return path.split('.').map(property => {

        if (object[property] instanceof Object) {
            return object = object[property]
        }

        return object[property]

    }).reduceRight(a => a)

}

/**
 * Language used on the html lang="en-us"
 */
const languages = {
    english: 'en',
    portuguese: 'pt',
    chinese: 'cn',
}

export default (data, compiler) => {

    let language = compiler.data.root.htmlWebpackPlugin.options.language,
        content = require(`../../languages/${language}.json`);

    /**
     * Here the current compilation language is overridden every time
     * based on which language it should be compiled for
     */
    let context = Object.assign({ language: languages[language], languages }, content);

    return dot(context, data);

};
