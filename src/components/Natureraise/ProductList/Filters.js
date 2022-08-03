import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import qs from "query-string";

const Filters = ({
  values,
  startAlias = null,
  endAlias = null,
  filterName,
  handlerFilters,
  persistSelected,
  resetPersistValues,
}) => {
  const [filterSelect, setFilterSelect] = useState(
    Array(values.length).fill(false)
  );

  const [filterValues, setFilterValues] = useState(persistSelected || []);

  useEffect(() => {
    console.log(persistSelected);
    if (!persistSelected) {
      setFilterSelect(Array(values.length).fill(false));
      setFilterValues([]);
      return;
    }

    persistSelected.forEach((item) => {
      const valueIdx = values.indexOf(item);
      setFilterSelect((prev) =>
        prev.map((_, idx) => (idx === valueIdx ? true : _))
      );
    });
    // handlerFilters({ [filterName]: persistSelected });
    resetPersistValues(filterName);
  }, [persistSelected]);

  useEffect(() => {
    if (!persistSelected) handlerFilters({ [filterName]: filterValues });
  }, [filterSelect]);

  const filterHandleChange = (e, eIdx) => {
    const isChecked = e.target.checked;
    const value = e.target.value;

    if (isChecked) {
      setFilterSelect((prev) =>
        prev.map((_, idx) => (idx === eIdx ? true : _))
      );

      setFilterValues((prev) => [...prev, value]);
    } else {
      setFilterSelect((prev) =>
        prev.map((_, idx) => (idx === eIdx ? false : _))
      );

      setFilterValues((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <>
      <div className="product_unorder_list ">
        {values.map((data, index) => (
          <Form.Group id="formGridCheckbox" key={index}>
            <Form.Check
              type="checkbox"
              label={`${startAlias ?? ""} ${data} ${startAlias ?? ""}`}
              value={data}
              id={index}
              checked={filterSelect[index]}
              onChange={(e) => filterHandleChange(e, index)}
            />
          </Form.Group>
        ))}
      </div>
    </>
  );
};

export default Filters;
