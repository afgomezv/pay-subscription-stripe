import { NextRequest, NextResponse } from "next/server";
import { Stripe } from 'stripe'

export async function POST(request : NextRequest){
    const data = await request.json()
    
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if(!stripeSecretKey){
        throw new Error('Stripe secret key is not defined in environment variables')
    }
    const stripe = new Stripe(stripeSecretKey)

    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: data.priceId,
                quantity: 1
            }
        ],
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/pricing',
    })
    
    return  NextResponse.json({
        url: session.url
    })
}