const Cart = require("./Cart");
const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");
const Purchase = require("./Purchase");
const User = require("./User");

//products categoryId
Category.hasMany(Product)
Product.belongsTo(Category)

//products images productId
Product.hasMany(ProductImg)
ProductImg.belongsTo(Product)

//relaciones para la tabla CART
User.hasMany(Cart)
Cart.belongsTo(User)

Product.hasMany(Cart)
Cart.belongsTo(Product)

//relaciones para la tabla PURCHASE
User.hasMany(Purchase)
Purchase.belongsTo(User)

Product.hasMany(Purchase)
Purchase.belongsTo(Product)
