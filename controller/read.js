const { Product } = require("../models/product");
const User  = require("../models/user");

// Products Methods
const productRead = async () => {
    const sortedProducts = await Product.find({})
    return sortedProducts;
};
const productReadById = async () => {
    const sortedProducts = await Product.findById({id})
    return sortedProducts;
};

// User Methods
const userRead = async () => {
    const sortedUsers = await User.find({})
    // console.log(sortedProducts);
    return sortedUsers;
};
module.exports = { productRead, userRead, productReadById }