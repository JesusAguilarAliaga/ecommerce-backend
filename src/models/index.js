const Category = require("./Category");
const Product = require("./Product");
const ProductImg = require("./ProductImg");

//products categoryId
Product.belongsTo(Category)
Category.hasMany(Product)

//products images productId
ProductImg.belongsTo(Product)
Product.hasMany(ProductImg)

