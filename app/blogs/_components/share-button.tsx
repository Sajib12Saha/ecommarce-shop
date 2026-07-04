import { FacebookSvg, WhatsAppSvg } from "@/components/social-icons";

export const ShareButtons = ({ title, url }: { title: string; url: string }) => {
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encoded}`,
      icon: <FacebookSvg size={32} />,
    },
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      icon: <WhatsAppSvg size={32} />,
    },
  ];

  return (
    <div className="flex items-center gap-3 flex-wrap">
      <span className="text-sm font-semibold text-muted-foreground">
        শেয়ার করুন:
      </span>
      {links.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden hover:opacity-80 hover:scale-110 transition-all"
        >
          {icon}
        </a>
      ))}
    </div>
  );
};