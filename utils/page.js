import Prismic from 'prismic-javascript';
import { apiEndpoint } from '../config/prismic';
import { i18n } from './i18n';
import { languages } from '../constants/i18n';

export async function getPageType(req) {
    let pageType = req.url;
    pageType = pageType.replace('/', '');
    return pageType;
}

export async function getPageData(req, docType) {
    const api = await Prismic.getApi(apiEndpoint, req);
    const options = { lang: languages[i18n.language] };

    const data = await api.query(
        Prismic.Predicates.at('document.type', docType),
        options,
    );

    return data.results[0];
}
