import { withSentry } from '@sentry/nextjs';
import { decode } from 'js-base64';
import { verify } from '../../utils/admin/verify';

const verifyUser = async (req, res) => {
    const { token } = req.headers;

    const uid = decode(token);
    const status = await verify(uid);

    return res.json({ status });
};

export default withSentry(verifyUser);
