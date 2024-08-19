import { NextResponse } from "next/server";
import { Stripe } from 'stripe'

export async function GET(){
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if(!stripeSecretKey){
        throw new Error('Stripe secret key is not defined in environment variables')
    }
    const stripe = new Stripe(stripeSecretKey)
    const prices = await stripe.prices.list()
    return NextResponse.json(prices.data);


}