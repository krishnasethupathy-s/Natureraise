import React, { useState } from "react";

import { Accordion, Card } from "react-bootstrap";

const FilterAccordion = ({ title, eventKey, children, defaultActiveKey }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordionOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="product_collapse">
      <Accordion defaultActiveKey={defaultActiveKey}>
        <Card>
          <Accordion.Toggle
            onClick={toggleAccordionOpen}
            as={Card.Header}
            eventKey={eventKey}
          >
            {title}
            <i
              onClick={toggleAccordionOpen}
              style={{
                color: isOpen === true ? "red" : "",
              }}
              className={
                isOpen === true ? "fa fa-caret-down" : "fa fa-caret-up"
              }
              aria-hidden="true"
            ></i>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey={eventKey}>
            <Card.Body>{children}</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
};

export default FilterAccordion;
