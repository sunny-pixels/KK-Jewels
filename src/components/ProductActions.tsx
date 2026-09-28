"use client";

import { enquiryMessage, whatsappUrl } from "@/lib/whatsapp";
import { useUI } from "./UIProvider";
import { CheckIcon, PlusIcon, WhatsAppIcon } from "./Icons";

export default function ProductActions({ slug, name }: { slug: string; name: string }) {
  const { addEnquiry, hasEnquiry, open } = useUI();
  const added = hasEnquiry(slug);
  return (
    <div className="product-page__actions">
      <a className="button full" href={whatsappUrl(enquiryMessage([name]))} target="_blank" rel="noopener">
        <WhatsAppIcon /> Enquire on WhatsApp
      </a>
      <button className="button outline full" onClick={() => (added ? open("enquiry") : addEnquiry(slug))}>
        {added ? (
          <>
            <CheckIcon /> In your enquiry list
          </>
        ) : (
          <>
            <PlusIcon /> Add to enquiry list
          </>
        )}
      </button>
    </div>
  );
}
