import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const quickLinks = [
    { label: "Faq", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
    { label: "Return Policy", href: "#" },
  ];

  const myAccount = [
    { label: "Sign In", href: "#" },
    { label: "Profile", href: "#" },
    { label: "Track Order", href: "#" },
  ];

  const payments = [
"/logo/cod.png",
"/logo/bkash.svg",
"/logo/nagad.svg",
"/logo/rocket.png",
  ];

  const socialLinks = [
    { href: "#", hover: "hover:text-blue-600" },
    { href: "#", hover: "hover:text-blue-800" },
    { href: "#", hover: "hover:text-pink-600" },
    { href: "#", hover: "hover:text-red-600" },
    { href: "#", hover: "hover:text-blue-600" },
  ];

    const year = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <h1 className="text-2xl font-bold text-primary mb-4">ePahar</h1>
            <p className="text-sm text-gray-600 leading-relaxed">
              ePahar is directly involved with marginal farmers living in hills and agriculture.
              We work for the overall development of tribal and non-tribal people.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">CONTACT INFO</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Address:</span></p>
              <p>1st Floor, 441 Plot, Road 4, Maitranga Bazar,</p>
              <p>Khagrachari, Bangladesh</p>

              <p className="mt-3"><span className="font-medium">Email:</span></p>
              <p>mail@epahar.com</p>

              <p className="mt-3"><span className="font-medium">Phone Number:</span></p>
              <p>(+88) 09613821316</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">QUICK LINKS</h4>
            <div className="space-y-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* My Account */}
          <div>
            <h4 className="text-lg font-bold text-gray-800 mb-4">MY ACCOUNT</h4>
            <div className="space-y-2">
              {myAccount.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-gray-600 hover:text-green-600"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left - copyright */}
            <div className="text-sm text-gray-600 text-center lg:text-left">
              ©{year} - ePahar. All rights reserved.
            </div>

            {/* Center - Payment Methods */}
 <div className="flex justify-center gap-x-5 flex-wrap">
  {payments.map((p, index) => (
    <Image
      key={index}
      src={p}
      alt="Payment method"
      width={100}
      height={40}
      className="object-contain size-16 lg:size-24"
    />
  ))}
</div>


            {/* Right - Social Media */}
            <div className="flex justify-center lg:justify-end space-x-3">
              {socialLinks.map((s, i) => (
                <a key={i} href={s.href} className={`text-gray-400 ${s.hover}`} target="_blank">
                  {/* Placeholder for icons */}
                  <span className="w-5 h-5 inline-block bg-gray-300 rounded-full" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
