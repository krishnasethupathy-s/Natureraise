import React from "react";
import "./FilterDropdown.css";
import { Form } from "react-bootstrap";


const FilterDropdown = (props) => {
  return (
    <div className="product_showing_wrap ">
      <div className="product_showing_list">
        <h6>Showing 1–9 of 12 results</h6>
      </div>
      <div>
        <Form.Control
          as="select"
          value={props.sortvalue}
          onChange={props.filterOnchange}
        >
          {props.list_data.map((item) => (
            <>
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            </>
          ))}
        </Form.Control>
      </div>
    </div>
  );
};

export default FilterDropdown;
