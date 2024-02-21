const sequelize = require("../utils/connection")
const userCreate = require("./createData/userCreate")

const testMigrate = async () => {
    try {
        await sequelize.sync({force: true})
        console.log("DB reset ✅⭐")
        await userCreate()
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

testMigrate()