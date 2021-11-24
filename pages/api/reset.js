import { withSentry } from '@sentry/nextjs';
import { signInUser } from '@utils/auth';

const decodeToken = async (req, res) => {
    const { token } = req.headers;
    const result = await signInUser(token);
    return res.json({ uid: result.uid, email: result.email });
};

export default withSentry(decodeToken);
