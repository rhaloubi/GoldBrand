import React from 'react';

const ViewProduct = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="hidden md:block">
        <div className="relative">
          <div className="flex flex-col">
            <div className="cursor-pointer hover:opacity-75">
              <img className="w-full" src="//lemkus.com/cdn/shop/files/FV7122-100-1.png?v=1723119424" alt="Jordan Graphics T-Shirt (W)" />
            </div>
            <div className="cursor-pointer hover:opacity-75">
              <img className="w-full" src="//lemkus.com/cdn/shop/files/FV7122-100-2.png?v=1723119424" alt="Jordan Graphics T-Shirt (W)" />
            </div>
            <div className="cursor-pointer hover:opacity-75">
              <img className="w-full" src="//lemkus.com/cdn/shop/files/FV7122-100-3.png?v=1723119423" alt="Jordan Graphics T-Shirt (W)" />
            </div>
            <div className="cursor-pointer hover:opacity-75">
              <img className="w-full" src="//lemkus.com/cdn/shop/files/FV7122-100-4.png?v=1723119424" alt="Jordan Graphics T-Shirt (W)" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="relative">
          <div className="flex flex-col">
            <div className="cursor-pointer">
              <img className="w-full" src="//lemkus.com/cdn/shop/files/FV7122-100-1.png?v=1723119424" alt="Jordan Graphics T-Shirt (W)" />
            </div>
            <div className="cursor-pointer">
              <img className="w-full" src="//lemkus.com/cdn/shop/files/FV7122-100-2.png?v=1723119424" alt="Jordan Graphics T-Shirt (W)" />
            </div>
            <div className="cursor-pointer">
              <img className="w-full" src="//lemkus.com/cdn/shop/files/FV7122-100-3.png?v=1723119423" alt="Jordan Graphics T-Shirt (W)" />
            </div>
            <div className="cursor-pointer">
              <img className="w-full" src="//lemkus.com/cdn/shop/files/FV7122-100-4.png?v=1723119424" alt="Jordan Graphics T-Shirt (W)" />
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 md:hidden">
          <span className="text-sm">SWIPE</span>
          <div className="flex items-center space-x-2">
            <span>1</span><span>/4</span>
          </div>
        </div>
      </div>
      <div className="md:ml-4 mt-4 md:mt-0 flex-1">
        <div>
          <h1 className="text-2xl font-bold uppercase">Jordan Graphics T-Shirt (W)</h1>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xl">R 799.00</span>
            <a href="https://cdn.shopify.com/s/files/1/0538/9280/8895/files/Lemkus_Approved.pdf?" target="_blank" rel="noopener noreferrer" className="underline uppercase">SIZE GUIDE</a>
          </div>
        </div>

        <form className="mt-6">
          <div className="flex space-x-4">
            {['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input type="radio" name="size" value={size} className="form-radio" />
                <span>{size}</span>
              </label>
            ))}
          </div>

          <div className="mt-4 flex items-center space-x-2">
            <span>Quantity</span>
            <input type="number" name="quantity" min="1" defaultValue="1" className="w-12 text-center border rounded" />
          </div>

          <button type="submit" className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            ADD TO BAG
          </button>

          <button type="button" className="mt-4 ml-4 bg-gray-200 py-2 px-4 rounded hover:bg-gray-300">
            NOTIFY ME
          </button>
        </form>

        <div className="mt-4 text-sm">
          <strong>Product SKU:</strong> FV7122-100XS
        </div>

        <div className="mt-4">
          <h5 className="font-semibold cursor-pointer">DETAILS</h5>
          <div className="hidden">
            <p>Midweight cotton keeps this tee soft while slightly dropped shoulders and a loose fit provide a comfortable, confident feel. Add in a vintage-inspired MJ graphic and you've got yourself a real winner.</p>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="font-semibold cursor-pointer">SHIPPING / RETURNS</h5>
          <div className="hidden">
            <p><strong>SHIPPING:</strong> Lemkus.com exclusively uses RAM, one of the leading Courier Companies in SA offering door to door FREE delivery on every order over R1 200.</p>
            <p><strong>RETURNS:</strong> Please see our returns and exchanges section for more information.</p>
          </div>
        </div>

        <div className="mt-4">
          <h5 className="font-semibold cursor-pointer">BUY NOW, PAY LATER</h5>
          <div className="hidden">
            <div className="flex items-center mb-2">
              <img src="https://cdn.shopify.com/s/files/1/0089/4602/4553/files/PayJustNow_Logo.svg?v=1656929207" alt="PayJustNow" className="w-24 mr-2" />
              <span>Pay R266 over 3 payments with PayJustNow. Interest Free.</span>
            </div>
            <div className="flex items-center mb-2">
              <img src="https://cdn.shopify.com/s/files/1/3101/1544/files/Payflex_New_Logo.jpg?v=1637062133" alt="Payflex" className="w-24 mr-2" />
              <span>Pay with 4 interest-free payments of R199. Interest Free.</span>
            </div>
            <div className="flex items-center">
              <img src="https://cdn.shopify.com/s/files/1/0538/9280/8895/files/button-happypay.png?v=1693907736" alt="HappyPay" className="w-24 mr-2" />
              <span>No deposit. Pay R399 over 2 months with Happy Pay. Interest Free.</span>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 border border-black">
          This item is not available to ship outside of South Africa
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
