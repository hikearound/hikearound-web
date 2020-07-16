import { verifyToken } from '../../utils/auth/admin';

const verifyUser = async (req, res) => {
    const { token } = req.headers;

    try {
        const status = await verifyToken(token);
        return res.json({ status });
    } catch (error) {
        return res.json({ error });
    }
};

export default verifyUser;
