import { Stripe } from 'stripe'
import { ButtonCheckout } from '@/components/ButtonCheckout'

async function loadPrices(){
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if(!stripeSecretKey){
        throw new Error('Stripe secret key is not defined in environment variables')
    }
    const stripe = new Stripe(stripeSecretKey)
    const prices = await stripe.prices.list()
    //const sortedPrices = prices.data.sort((a,b) => a.unit_amount - b.unit_amount)
    return prices.data;

}

async function PricingPage() {
    const prices = await loadPrices()


  return (
    <div className='flex flex-col justify-center items-center h-screen w-full'>
         <div>
            <h1 className='text-center text-3xl text-gray-600 my-5'>Pricing</h1>
         </div>
        <div className='flex gap-x-2'>
            {
                prices.map((price) => (
                    <div key={price.id} className='w-48 bg-slate-300 mb-2 p-8 rounded-xl'>
                        <h3>{price.nickname}</h3>
                        <h2 className='text-3xl font-bold pb-4'>${
                                price.unit_amount ? price.unit_amount / 100 : 0
                            }
                        </h2>
                        <ButtonCheckout priceId={price.id}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default PricingPage