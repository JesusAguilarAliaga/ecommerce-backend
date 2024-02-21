const User = require("../models/User");
const catchError = require("../utils/catchError");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllUsers = catchError(async (req, res) => {
    const users = await User.findAll();

    return res.send(users);
})

const createUser = catchError(async (req, res) => {
    const { password, email, firstName, frontBaseUrl } = req.body

    //hash password
    //const hashedPassword = await bcrypt.hash(password, 10)

    const newBody = {
        ...req.body,
        //password: hashedPassword
    }

    const userCreated = await User.create(newBody)

    //generate code to verify from email
    /* const code = crypto.randomBytes(64).toString("hex");

    const bodyCode = {
        code,
        userId: userCreated.id
    }

    await EmailCode.create(bodyCode)

    sendEmail({
        to: email,
        subject: "Verify your email",
        html: `<a href="${frontBaseUrl}/verify_email/${code}">Verify your email</a>`
    }) */

    return res.status(201).json(userCreated)
})

const deleteUser = catchError(async (req, res) => {
    const { id } = req.params;

    const userDeleted = await User.destroy({ where: {id}})

    if(!userDeleted) return res.send("User not found").status(404);

    return res.status(204).send("User deleted");
})

const updateUser = catchError(async (req, res) => {
    const { id } = req.params;

    const idUser = await User.findByPk(id)

    if(!idUser) return res.status(404).send("User not found")

    const fieldsToDelete = ["email", "password"]

    fieldsToDelete.forEach(field => {
        delete req.body[field]
    })

    const userUpdated = await User.update(req.body, {
        where: { id },
        returning: true
    })

    if(userUpdated[0] === 0) return res.sendStatus(400)

    return res.json(userUpdated[1][0])
})

const loginUser = catchError(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ where: { email }})
    if(!user) return res.status(401).send("Invalid credentials")
    
    const passwordMatch = await bcrypt.compare( password, user.password)
    if(!passwordMatch) return res.status(401).send("Invalid credentials")

    const token = jwt.sign(
        { user },
        process.env.TOKEN,
        {
            expiresIn: "24h"
        }
    )

    return res.json({
        user,
        token
    })
})

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    loginUser
}