const catchError = require("../utils/catchError")

const getAllProducts = catchError(async (req, res) => {
    const users = await User.findAll();

    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    return res.send(users);
})

const getOneProduct = catchError(async (req, res) => {
    const { id } = req.params
    const result = await User.findByPk(id);

    if(!result) return res.send("User not found").status(404);

    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    return res.json(result)
})

const createProduct = catchError(async (req, res) => {
    const { password, email, firstName, frontBaseUrl } = req.body

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    const newBody = {
        ...req.body,
        password: hashedPassword
    }

    const userCreated = await User.create(newBody)

    User.prototype.toJSON = function () {
        const values = { ...this.get() };
        delete values.password;
        return values;
    };

    //generate code to verify from email
    const code = crypto.randomBytes(64).toString("hex");

    const bodyCode = {
        code,
        userId: userCreated.id
    }

    await EmailCode.create(bodyCode)

    sendEmail({
        to: email,
        subject: "Verify your email",
        html: `<a href="${frontBaseUrl}/verify_email/${code}">Verify your email</a>`
    })

    return res.json(userCreated)
})

const deleteProduct = catchError(async (req, res) => {
    const { id } = req.params;

    const userDeleted = await User.destroy({ where: {id}})

    if(!userDeleted) return res.send("User not found").status(404);

    return res.send("User deleted")
})

const updateProduct = catchError(async (req, res) => {
    const { id } = req.params;

    const idUser = await User.findByPk(id)

    if(!idUser) return res.status(404).send("User not found")

    const fieldsToDelete = ["email", "password", "isVerified"]

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


module.exports = {
    getAllProducts,
    getOneProduct,
    createProduct,
    deleteProduct,
    updateProduct
}