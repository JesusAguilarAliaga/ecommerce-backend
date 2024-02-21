const User = require("../../models/User")

const userCreate = async () => {
    try {
        await User.create({
            firstName: "Jhon",
            lastName: "Doe",
            email: "jhon@example.com",
            password: "jhon123",
            phone: "+134322234243"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = userCreate;