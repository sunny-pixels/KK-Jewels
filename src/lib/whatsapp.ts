import { contact } from "@/content/config";

export function whatsappUrl(message: string) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function enquiryMessage(names: string[]) {
  if (names.length === 0) {
    return "Hello KK Jewels Silver Studio, I would like to know more about your silver collections.";
  }
  if (names.length === 1) {
    return `Hello KK Jewels Silver Studio, I would like to enquire about the ${names[0]}.`;
  }
  const list = names.map((n, i) => `${i + 1}. ${n}`).join("\n");
  return `Hello KK Jewels Silver Studio, I would like to enquire about these pieces:\n${list}`;
}
