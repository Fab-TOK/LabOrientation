import Image from "next/image";
import Link from "next/link";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="bg-slate text-cream">
      <div className="gutter grid gap-7 py-7 nav:grid-cols-[1.7fr_1fr_1fr_1.15fr] nav:items-start nav:gap-11 nav:py-12">
        <div className="flex flex-col">
          <div className="flex items-center nav:h-[11px]">
            <Image
              src="/logo-icon.png"
              alt="Lab’Orientation"
              width={120}
              height={120}
              className="h-[30px] w-auto brightness-0 invert nav:h-[34px]"
            />
          </div>
          <p className="mt-[30px] hidden max-w-[34ch] text-[13.5px]/[1.65] text-cream/72 nav:block">
            Orientation scolaire, universitaire et professionnelle, des collégiens aux
            adultes en reconversion. En présentiel au Bénin, en visioconférence partout
            ailleurs.
          </p>
          <div className="mt-[14px] font-serif text-[14px]/[1.5] italic text-peach nav:mt-4 nav:text-[15px]">
            {site.signature}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 nav:contents">
          <FooterColumn title="Le site">
            {footerNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-cream">
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact">
            <a href={site.phoneHref} className="hover:text-cream">
              {site.phone}
            </a>
            <a
              href={site.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-cream"
            >
              WhatsApp
            </a>
            <a href={site.emailHref} className="hover:text-cream">
              {site.email}
            </a>
          </FooterColumn>
        </div>

        <div className="hidden flex-col nav:flex">
          <div className="t-label border-b border-cream/18 pb-[14px] text-cream/50">
            Séance découverte
          </div>
          <p className="mt-4 text-[13.5px]/[1.6] text-cream/82">
            30 minutes, offertes, sans engagement. En français ou en anglais.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="t-label text-[10.5px] text-cream/50 nav:border-b nav:border-cream/18 nav:pb-[14px] nav:text-[11px]">
        {title}
      </div>
      <div className="mt-2 flex flex-col gap-[3px] text-[13px]/[1.9] text-cream/80 nav:mt-4 nav:gap-[10px] nav:text-[13.5px]/[1.3] nav:text-cream/82">
        {children}
      </div>
    </div>
  );
}
