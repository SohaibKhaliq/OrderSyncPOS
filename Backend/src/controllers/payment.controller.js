// Backend/src/controllers/payment.controller.js
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
    const { cartItems, customer, customerType, tableId, qrcode } = req.body;

    // Map cart items to Stripe line items
    const lineItems = cartItems.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title,
                images: [item.image && isValidUrl(item.image) ? item.image : 'https://via.placeholder.com/150'], // Validate URL
            },
            unit_amount: Math.round(item.price * 100), // Ensure price is in cents
        },
        quantity: item.quantity,
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_DOMAIN}/checkout/success`,
            cancel_url: `${process.env.FRONTEND_DOMAIN}/checkout/cancel`,
            metadata: {
                customerType,
                customerName: customer.name,
                customerPhone: customer.phone,
                tableId,
                qrcode,
            },
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error creating Stripe session:', error);
        res.status(500).json({ error: 'Failed to create Stripe checkout session' });
    }
};

// Utility function to validate URLs
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch {
        return false;
    }
}
