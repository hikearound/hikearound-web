import { withSentry } from '@sentry/nextjs';
import { signInWithCustomToken } from '@utils/auth';

const decodeToken = async (req, res) => {
    const { token } = req.headers;
    const result = await signInWithCustomToken(token);
    return res.json({ uid: result.uid, email: result.email });
};

export default withSentry(decodeToken);
