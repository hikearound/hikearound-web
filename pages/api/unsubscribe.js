import { withSentry } from '@sentry/nextjs';
import { decode } from 'js-base64';
import { unsubscribe } from '@utils/admin/unsubscribe';

const unsubscribeUser = async (req, res) => {
    const { token, type } = req.headers;

    const uid = decode(token);
    const status = await unsubscribe(uid, type);

    return res.json({ status, type });
};

export default withSentry(unsubscribeUser);
