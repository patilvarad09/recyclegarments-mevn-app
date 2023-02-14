import mongoose from 'mongoose'


const SingleOrderItemSchema = mongoose.Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    amount: {type: Number},
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true,
    }
});

const orderSchema = mongoose.Schema({
    shippingAddress: {
        type: String,
       
    },
    tax: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderItems: [SingleOrderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
        default: 'pending',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    clientSecret: {
        type: String,
        required: true
    },
    paymentIntentId: {
        type: String,
    },
    // name: {type: String, required: true},
    // image: {type: String, required: true},
    // price: {type: Number, required: true},
    // amount: {type: Number, required: true},
    // product: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'Product',
    //     required: true,
    // }
    // orderItems: [
    //     {
    //         name: { type: String, required: true},
    //         qty: { type: Number, required: true},
    //         image: { type: String, required: true},
    //         price: { type: Number, required: true},
    //         product: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             required: true,
    //             ref: 'Product'
    //         }
            
    //     }
    // ],
    // shippingAddress: {
    //     address: { type: String, required: true },
    //     city: { type: String, required: true },
    //     postalCode: { type: String, required: true },
    //     country: { type: String, required: true }
    // },
    
    // itemsPrice: {
    //     type: Number,
    //     required: true
    // },
  
    
    // paymentResult: {
    //     id: { type: String},
    //     status: { type: String},
    //     update_time: { type: String},
    //     email_address: { type: String}
    // },
    // totalPrice: {
    //     type: Number,
    //     required: true,
    //     default: 0.0
    // },
    // isPaid: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    // paidAt: {
    //     type: Date
    // },
    // isDelivered: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    // DeliveredAt: {
    //     type: Date
    // },
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema)

export  default Order 