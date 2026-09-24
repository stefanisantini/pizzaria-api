import jwt from 'jsonwebtoken';
const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:'Token de auntenticação não fornecido.'});
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2){
        return res.status(401).json({message: 'Token em formato invalido'});
    }
    const [scheme, token] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({message: 'Token mal formatado.'});

    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({message: 'Token invalido ou expirado'})
        }

    req.useCpf = decoded.cpf;
    req.userEmail = decoded.email;

    return next();
    })
}

export default authMiddleware;

