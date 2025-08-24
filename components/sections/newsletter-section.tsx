import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function NewsletterSection() {
  return (
    <div className="py-16 bg-gray-200">
      <div className=" px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-4">JOIN OUR NEWSLETTER</h3>
        <p className="text-gray-600 mb-8">Be fast to get the latest news, promotions, and much more!</p>

        <div className=" flex flex-col items-center gap-y-4 md:flex-row md:justify-center max-w-md mx-auto gap-x-4">
          <Input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3"
          />
          <Button className="px-6 py-3 rounded-r-md">JOIN NOW</Button>
        </div>
      </div>
    </div>
  )
}
