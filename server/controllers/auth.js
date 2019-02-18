const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email});
    if(candidate) {
        //email совпадает > делаем проверку пароля
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult) {
            //генерация токена. пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60*2});

            res.status(200).json({
                token: `Bearer ${token}`
            });

        } else {
            res.status(401).json({
                message: 'Пароли не совпадают.'
            });
        }
    } else {
        //email не найден  > выкидываем ошибку.
        res.status(404).json({
            message: 'Пользователь с таким email не найден.'
        });
    }
}



module.exports.register = async function (req, res) {

    //существует ли пользователь с таким email    
    const candidate = await User.findOne({email: req.body.email});

    if (candidate) {
        //совпадение найдено - вывести ошибку
        res.status(409).json({
            message: 'Email занят. Попробуйте другой.'
        });
    } else {
        //совпадений нет - можно регистрировать
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;

        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password,salt)
        });

        try {
            await user.save();
            res.status(201).json(user);
        } catch(e) {
            errorHandler(res, e);
        }        
    }
}