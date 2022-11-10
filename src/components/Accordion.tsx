/**
 * This is the implementation of an Accordion.
 *
 * Refer to https://www.w3.org/WAI/ARIA/apg/patterns/accordion for the
 * accessibility requirements.
 */

import { createContext, useContext, useId, useState } from "react";

type Component<P = {}> = React.FC<P & { children?: React.ReactNode }>;

interface AccordionContextValue {
  expandedItem?: string;
  onExpandedItemChange: (item: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("No provider found for AccordionContext");
  return context;
}

export const AccordionRoot: Component<{
  initialExpandedItem?: string;
}> = ({ initialExpandedItem, children }) => {
  const [expandedItem, onExpandedItemChange] = useState(initialExpandedItem);

  return (
    <AccordionContext.Provider
      value={{
        expandedItem,
        onExpandedItemChange,
      }}
    >
      <div>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemContextValue {
  name: string;
  isExpanded: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

function useAccordionItemContext() {
  const context = useContext(AccordionItemContext);
  if (!context) throw new Error("No provider found for AccordionItemContext");
  return context;
}

export const AccordionItem: Component<{ name: string }> = ({
  name,
  children,
}) => {
  const { expandedItem } = useAccordionContext();
  const itemId = useId();

  const isExpanded = expandedItem === name;
  const triggerId = `accordion-trigger-${itemId}`;
  const contentId = `accordion-content-${itemId}`;

  return (
    <AccordionItemContext.Provider
      value={{ name, isExpanded, triggerId, contentId }}
    >
      <div>{children}</div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger: Component = ({ children }) => {
  const { onExpandedItemChange } = useAccordionContext();
  const { name, isExpanded, triggerId, contentId } = useAccordionItemContext();

  return (
    <h3>
      <button
        id={triggerId}
        type="button"
        aria-controls={contentId}
        aria-disabled={isExpanded}
        aria-expanded={isExpanded}
        onClick={() => onExpandedItemChange(name)}
      >
        {children}
      </button>
    </h3>
  );
};

export const AccordionContent: Component = ({ children }) => {
  const { isExpanded, triggerId, contentId } = useAccordionItemContext();
  return (
    <div id={contentId} role="region" aria-labelledby={triggerId}>
      {isExpanded ? children : null}
    </div>
  );
};
