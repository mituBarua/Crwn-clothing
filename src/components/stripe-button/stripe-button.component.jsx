import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H1vwGLGL5iDX5rFq8I2yJIla6MqAC09SYB1jbH9GMvr8DGxxlCNvONLLygOxpRmiXpLTcVZUiG6tf54T5Br1ufF00Qce8TydF';
  const onToken = token => {
       console.log(token);
       alert('Payment Successful');
   }
    return (
        <StripeCheckout 
        label ='Pay Now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAdress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}

        />
    );
};
export default StripeCheckoutButton;