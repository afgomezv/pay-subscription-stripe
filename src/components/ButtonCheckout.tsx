'use client'

interface Props {
  priceId: string
}

export const ButtonCheckout = ({priceId}: Props) => {
  return (
    <button 
      className='bg-cyan-500 px-3 py-2 rounded-xl'
      onClick={async() => {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          body: JSON.stringify({
            priceId: priceId
          }),
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json()
        window.location.href = data.url
      }}
    >
      buy
    </button>
  )
}
