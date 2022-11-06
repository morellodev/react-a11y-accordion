import {
  AccordionContent,
  AccordionItem,
  AccordionRoot,
  AccordionTrigger,
} from "./components/Accordion";

export default function App() {
  return (
    <AccordionRoot initialExpandedItem="item-1">
      <AccordionItem name="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>Content of first accordion panel.</AccordionContent>
      </AccordionItem>

      <AccordionItem name="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>Content of second accordion panel.</AccordionContent>
      </AccordionItem>

      <AccordionItem name="item-3">
        <AccordionTrigger>Item 3</AccordionTrigger>
        <AccordionContent>Content of third accordion panel.</AccordionContent>
      </AccordionItem>
    </AccordionRoot>
  );
}
