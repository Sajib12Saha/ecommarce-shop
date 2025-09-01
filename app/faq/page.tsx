import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQITEMS } from "@/data";
import { MailOpen } from 'lucide-react';

const FaqPage = () => {
    return (
        <div className="p-4 lg:px-8 flex flex-col items-center  gap-y-6">
            <h2 className="text-3xl font-bold">FAQ</h2>
<Accordion
  type="multiple"
  defaultValue={FAQITEMS.map((_, index) => `item-${index}`)} 
  className="w-full max-w-2xl space-y-10"
>
  {FAQITEMS.map((item, index) => (
    <AccordionItem key={index} value={`item-${index}`}>
      <AccordionTrigger className="bg-primary px-4 text-white  lg:text-lg">
        {item.question}
      </AccordionTrigger>
      <AccordionContent className="px-2 py-4 text-md lg:text-base">
        <p>{item.answer}</p>
        {item.mail && (
          <p className="mt-2 flex gap-x-2 flex-wrap items-center">
            <MailOpen className="size-4"/>
            <a
              href={`mailto:${item.mail}`}
              className="text-blue-600 underline"
            >
              {item.mail}
            </a>
          </p>
        )}
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>
        </div>
    )
}

export default FaqPage;