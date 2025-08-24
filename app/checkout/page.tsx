import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"

// React Icons
import { FaShoppingCart } from "react-icons/fa"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress steps */}
        <div className="mb-8">
         <div className="flex items-center justify-between max-w-2xl mx-auto">
  {/* Step 1 */}
  <div className="flex flex-col items-center relative">
    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
      <FaShoppingCart className="w-5 h-5" />
    </div>
    <span className="text-sm mt-2 text-orange-500 font-medium">Cart</span>
    <div className="hidden md:block absolute top-5 left-full ml-2 w-12 h-1 bg-orange-500"></div>
  </div>

  {/* Step 2 */}
  <div className="flex flex-col items-center relative">
    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white">
      <span className="text-sm font-bold">2</span>
    </div>
    <span className="text-sm mt-2 text-orange-500 font-medium text-center">
      Shipping & Billing
    </span>
    <div className="hidden md:block absolute top-5 left-full -ml-6 w-12 h-1 bg-gray-300"></div>
  </div>

  {/* Step 3 */}
  <div className="flex flex-col items-center relative">
    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
      <span className="text-sm font-bold">3</span>
    </div>
    <span className="text-sm mt-2 text-gray-500">Payment</span>
    <div className="hidden md:block absolute top-5 left-full ml-2 w-12 h-1 bg-gray-300"></div>
  </div>

  {/* Step 4 */}
  <div className="flex flex-col items-center">
    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
      <span className="text-sm font-bold">4</span>
    </div>
    <span className="text-sm mt-2 text-gray-500">Confirmation</span>
  </div>
</div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Area Selection */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Select Delivery Area*</h3>
                <RadioGroup defaultValue="dhaka-city" className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dhaka-city" id="dhaka-city" />
                    <Label htmlFor="dhaka-city">ঢাকা সিটির ভিতরে</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="chittagong-city" id="chittagong-city" />
                    <Label htmlFor="chittagong-city">চট্টগ্রাম সিটির ভিতরে</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="outside-cities" id="outside-cities" />
                    <Label htmlFor="outside-cities">ঢাকা ও চট্টগ্রাম সিটির বাইরে</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Billing Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Billing Info</h3>
                <div className="space-y-4">
                  <Input placeholder="Full Name*" className="w-full" />
                  <Input placeholder="Phone Number*" className="w-full" />
                  <Textarea placeholder="Full Address*" className="w-full min-h-[100px]" />
                  <Button className="w-full py-3">Continue</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Cart Summary */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Items In Your Cart :</h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="font-medium">Product</span>
                    <span className="font-medium">Total</span>
                  </div>

                  <div className="flex items-center gap-3 py-3 border-b">
                    <img src="/bangladeshi-food.png" alt="Product" className="w-12 h-12 rounded" />
                    <div className="flex-1">
                      <div className="text-sm">শাহজাদি প্রিমিয়া ইউজা (৫০০ গ্রাম)</div>
                      <div className="text-xs text-gray-500">Qty: 1</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">Tk240</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Sub Total:</span>
                    <span>Tk240</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TAX:</span>
                    <span>Tk0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT:</span>
                    <span>Tk0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Discount:</span>
                    <span>Tk0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Charge:</span>
                    <span>Tk0</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total:</span>
                    <span>Tk240</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <Input placeholder="Please enter promo code" className="flex-1" />
                    <Button className="px-4 w-full sm:w-auto">Apply Discount</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
