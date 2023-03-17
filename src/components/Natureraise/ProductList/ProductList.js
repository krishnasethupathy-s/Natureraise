import React, { Component, Fragment } from "react";

import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  Accordion,
  Spinner,
} from "react-bootstrap";
import images from "../../constants/images";
import SectionHeader from "../../constants/SectionHeader/SectionHeader";
import StarRatingComponent from "react-star-rating-component";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactSlider from "react-slider";
import { toast } from "react-toastify";

import {
  SLIDER_IMAGE,
  PRODUTS_DATA,
  PRODUCT_DISCOUNT,
  CUSTOMER_RATING,
  SORT_LIST,
} from "../../constants/AccountData";
import { connect } from "react-redux";
import * as ProductActions from "../store/actions/Product/ProductActions";
import { Redirect } from "react-router-dom";
import * as qs from "query-string";
import { Helmet } from "react-helmet-async";

import ProductCard from "../Common/Components/ProductCard/ProductCard";
import Filters from "./Filters";

import "./ProductList.css";
import FilterAccordion from "./filter-accordion";

const LOCAL_FILTERS = [
  {
    filter_heading: "Discount1",
    filter_value: ["10", "30", "50", "80", "90"],
    id: "1",
  },
  {
    filter_heading: "Rating",
    filter_value: ["1", "2", "3", "4", "5"],
    id: "2",
  },
];

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.query = qs.parse(this.props.location.search);
    this.state = {
      product_slider: images.product_image,
      rating: 1,
      categories_value: "",
      sort_by_value: "",
      wishcolor: "green",
      rating_status: false,
      hasMore: true,
      page_number: 1,
      data_limit: "10",
      item_name: "",
      // categories_id: localStorage.getItem("categories_id"),
      categories_id: this.props.match.params.id || "",
      isLoading: true,

      // resetting
      discountSelect: Array(PRODUCT_DISCOUNT.length).fill(false),
      ratingSelect: Array(CUSTOMER_RATING.length).fill(false),

      //filters
      slider_range: [100, 1000000],
      slider_min: 100,
      slider_max: 1000000,
      sort: 1,

      filters: {},
      selectedValues: {},
      category: "",
    };

    this.Authorization = localStorage.getItem("Authorization");
  }

  isParentPath = () => {
    const { pathname } = this.props.location;
    const isParent = pathname.split("/").includes("p");
    return isParent;
  };

  componentDidMount() {
    this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    this.props.dispatch(ProductActions.empty_message());

    window.scrollTo(0, 0);
    const { page_number, data_limit, item_name, sort, slider_range, filters } =
      this.state;
    const productdata_id = this.props.match.params.id;

    if (productdata_id) {
      this.props.dispatch(
        ProductActions.getFilterBySubCategory(productdata_id ?? "")
      );
      this.getSubCategoryDetail(productdata_id);
    } else {
      this.props.dispatch({
        type: "LOCAL_FILTERS",
        // data: LOCAL_FILTERS,
      });
    }

    if (this.props.location.search) {
      const query = qs.parse(this.props.location.search);
      const qFilters = Object.keys(query)
        .filter((key) => key !== "sort" && key !== "range" && key !== "search")
        .reduce((obj, key) => {
          obj[key] = Array.isArray(query[key]) ? query[key] : [query[key]];
          return obj;
        }, {});
      console.log("sort", query);
      console.log("sort", qFilters);
      const rangeToNumbers = query?.range?.map((range) => +range);
      this.setState({
        sort: isNaN(+query?.sort) ? 1 : +query?.sort,
        slider_range: rangeToNumbers ?? slider_range,
        item_name: query?.search ?? "",

        filters: qFilters,
        selectedValues: qFilters,
      });

      this.props.dispatch({ type: "RESETITEMLISTBYSUBCATEGORY" });
      if (this.isParentPath()) {
        this.props.dispatch(
          ProductActions.getItemSearch(
            "",
            "" + page_number,
            data_limit,
            this.query.search ?? item_name,
            filters, //filter_values
            slider_range, // price_values
            "" + sort, // sort_by
            true,
            productdata_id
          )
        );
      } else {
        this.props.dispatch(
          ProductActions.getItemSearch(
            productdata_id ? productdata_id : "",
            "" + page_number,
            data_limit,
            this.query.search ?? item_name,
            filters, //filter_values
            slider_range, // price_values
            "" + sort, // sort_by
            true,
            ""
          )
        );
      }
    }
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.categories_id !== this.props.match.params.id) {
      this.setState({
        page_number: 1,
        categories_id: this.props.match.params.id,
        slider_range: [100, 1000000],
        sort: 1,
        item_name: "",
        discount: [],
        filters: {},
        ratings: [],
        selectedValues: {},
      });

      return true;
    } else {
      return false;
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      page_number,
      data_limit,
      item_name,
      categories_id,
      sort,
      slider_range,
      discount,
      ratings,
      filters,
    } = this.state;

    if (snapshot) {
      window.scrollTo(0, 0);
      this.props.dispatch({ type: "IS_LOADING", is_loading: true });
      this.props.dispatch(ProductActions.empty_message());
      const productdata_id = this.props.match.params.id;
      if (productdata_id) {
        this.props.dispatch(
          ProductActions.getFilterBySubCategory(productdata_id)
        );
        this.getSubCategoryDetail(productdata_id);
      } else {
        this.props.dispatch({
          type: "LOCAL_FILTERS",
          // data: LOCAL_FILTERS,
        });
        this.setState({ category: "" });
      }

      this.props.dispatch(
        ProductActions.getItemSearch(
          this.isParentPath()
            ? ""
            : this.state.categories_id
            ? this.state.categories_id
            : "",
          "" + page_number,
          data_limit,
          this.query.search === "" ? item_name : this.query.search,
          "",
          slider_range,
          "" + sort,
          true,
          this.isParentPath() ? this.state.categories_id : ""
        )
      );
    }

    if (
      prevState.filters !== filters ||
      prevState.sort !== sort ||
      prevState.slider_range !== slider_range
    ) {
      this.addQueryParam();
    }
    console.log(this.props.location.search, prevProps.location.search);
    if (this.props.location.search !== prevProps.location.search) {
      console.log(this.props.location, prevProps.location);
      this.props.dispatch(ProductActions.empty_message());
      const query = qs.parse(this.props.location.search);
      this.props.dispatch({ type: "IS_LOADING", is_loading: true });
      this.props.dispatch(
        ProductActions.getItemSearch(
          this.isParentPath()
            ? ""
            : this.state.categories_id
            ? this.state.categories_id
            : "",
          "1",
          data_limit,
          query?.search || "",
          filters,
          slider_range,
          "" + sort,
          true,
          this.isParentPath() ? this.state.categories_id : ""
        )
      );
      this.setState({ page_number: 1, item_name: query?.search });
      if (categories_id === "") this.setState({ category: "" });
    }

    if (this.props.success_message === "ITEM_ADD_TO_CART") {
      toast.success("Item added to the cart");

      this.props.dispatch(ProductActions.empty_message());
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }

    if (this.props.success_message === "CART_SUCCESS") {
      this.props.dispatch(
        ProductActions.getProductquantity(this.productId, this.unique_id)
      );

      this.props.dispatch(ProductActions.empty_message());
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }

    console.log("Discount ", this.state.selectedValues);
    console.log(qs.parse(this.props.location.search));
  }

  getSubCategoryDetail = (id) => {
    const category = this.props.category
      ?.map((category) => category.itemSubCategory)
      .reduce((a, b) => a.concat(b), [])
      .find((item) => item.id === id);

    this.setState({
      category,
    });
  };

  onRating_function = () => {
    this.setState((prevState) => ({ rating_status: !prevState.rating_status }));
  };

  property_data_fun = (event) => {
    const event_value = event.target.value;

    console.log(event_value);
    this.setState({ categories_value: event_value });
    this.setState({ sort: +event_value });
  };

  wishlistfun = () => {
    this.setState({ wishcolor: "red" });
  };
  navigate_function = (item) => {
    localStorage.setItem("product_id", item.id);
    this.props.history.push(`/ProductDescription/${item.id}`);
  };

  add_to_cart = (id, product_price_id) => {
    this.props.dispatch(ProductActions.getProductquantity(id, id));

    if (this.props.product_quantity === 0) {
      this.addtocart_function(id, product_price_id);
    }
  };

  addtocart_function = (id, product_price_id) => {
    if (this.Authorization !== null) {
      this.props.dispatch(
        ProductActions.addtocartdb(
          id,
          "plus",
          "",
          product_price_id,
          "ITEM_ADD_TO_CART"
        )
      );
      this.props.dispatch(ProductActions.getCartList());
      this.props.dispatch({ type: "IS_LOADING", is_loading: true });
    } else {
      this.props.dispatch(ProductActions.addToCartLocal(id));
      toast.success("Item added to the cart");
      this.props.dispatch({ type: "IS_LOADING", is_loading: false });
    }
    this.props.dispatch({
      type: "RESET_PRODUCT_QUANTITY",
    });
  };

  // Filters

  changeRangeValue = (values, idx) => {
    const convertToNumber = values.map(Number);
    this.setState({ slider_range: convertToNumber });
  };

  addQueryParam = () => {
    console.log(this.state.sort);
    console.log(this.state.slider_range);
    console.log("filters", this.state.filters);

    console.log(this.props.params);
    console.log(this.props.location);
    let { pathname } = this.props.location;

    let stringArray = pathname.split("/");
    let path = stringArray.splice(0, stringArray.length - 1).join("/");
    console.log(path);
    const q = qs.parse(this.props.location.search);

    const query = qs.stringify({
      range: this.state.slider_range,
      sort: this.state.sort,
      search: q.search ? q.search : "",
      ...this.state.filters,
    });
    console.log(query);

    if (this.state.categories_id) {
      this.props.history.push({
        pathname: `${path}/${this.state.categories_id}`,
        search: "?" + query,
      });
    } else {
      this.props.history.push({
        pathname: `/products`,
        search: "?" + query,
      });
    }
  };

  handleFilters = (filter) => {
    this.setState((prev) => ({
      filters: { ...prev.filters, ...filter },
    }));
  };

  fetchData = () => {
    // if (this.props.is_loading) return;

    this.props.dispatch(
      ProductActions.getItemSearch(
        this.isParentPath()
          ? ""
          : this.state.categories_id
          ? this.state.categories_id
          : "",
        this.state.page_number + 1 + "",
        this.state.data_limit,
        this.state.item_name,
        this.state.filters,
        this.state.slider_range,
        "" + this.state.sort,
        false,
        this.isParentPath() ? this.state.categories_id : ""
      )
    );
    this.setState((prev) => ({ page_number: prev.page_number + 1 }));
  };

  searchHandleChange = (e) => {
    this.setState({
      item_name: e.target.value,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.addQueryParam();
  };

  resetSelectedValues = (filterName) => {
    const { [filterName]: _, ...obj } = this.state.selectedValues;
    this.selectedValues = obj;
  };

  render() {
    const { rating, sort, rating_status, category } = this.state;

    return (
      <>
        <Helmet>
          <title>
            {category ? category.item_sub_category_name : "Search Results"} |
            Natureraise
          </title>
          <meta property="og:title" content="Natureraise" />
          <meta property="og:type" content="website" />

          <meta
            property="og:description"
            content={category ? category.description : "Product Search Results"}
          />
        </Helmet>

        <section className="product_list_container" id="product_list_container">
          <SectionHeader
            about_banner="about_banner"
            section_title="Shop"
            section_subtitle="Products"
          />
          <div className="product_list_wrap section_padding_top_bottom">
            <Container>
              <Row>
                <Col xs={{ order: 1 }} md={{ span: 3, order: 1 }} xl={3}>
                  <div className="product_list_card sticky-top">
                    {/* <div className="product_search_wrap">
                      <Form onSubmit={this.handleSearch}>
                        <InputGroup>
                          <Form.Control
                            className="product_search_input"
                            type="text"
                            placeholder="Search Here..."
                            value={this.state.item_name}
                            onChange={this.searchHandleChange}
                          />

                          <InputGroup.Append>
                            <button type="submit" className="search_icon_wrap1">
                              <i
                                className="fa fa-search"
                                aria-hidden="true"
                              ></i>
                            </button>
                          </InputGroup.Append>
                        </InputGroup>
                      </Form>
                    </div> */}
                    <div className=" common_divison_padding">
                      <div className="product_title_parent">
                        <h3 className="product_titles">Price Range </h3>
                      </div>
                      <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="example-thumb"
                        trackClassName="example-track"
                        min={this.state.slider_min}
                        max={this.state.slider_max}
                        defaultValue={[
                          this.state.slider_min,
                          this.state.slider_max,
                        ]}
                        value={this.state.slider_range}
                        ariaLabel={["Lower thumb", "Upper thumb"]}
                        ariaValuetext={(state) =>
                          `Thumb value ${state.valueNow}`
                        }
                        pearling
                        onAfterChange={this.changeRangeValue}
                        renderThumb={(props, state) => (
                          <div {...props}>
                            {+state.valueNow < 1000
                              ? +state.valueNow
                              : +state.valueNow < 100000
                              ? Math.floor(+state.valueNow / 1000) + "K"
                              : Math.floor(+state.valueNow / 100000) + "L"}
                          </div>
                        )}
                      />
                      <div>
                        <h6 className="product_price_values">
                          Price: ₹ {this.state.slider_range[0]} — ₹{" "}
                          {this.state.slider_range[1]}
                        </h6>
                      </div>

                      {/* <Form>
                      <Form.Group controlId="formBasicRange">
                        <Form.Control
                          type="range"
                          min={1000}
                          max={100000}
                          value={this.state.slider_range}
                          onChange={this.changeRangeValue}
                        />
                      </Form.Group>
                    </Form> */}
                    </div>
                    {!!this.props.filters.length && (
                      <div className="product_categories common_divison_padding">
                        {this.props.filters.map((data, index) =>
                          index === 0 ? (
                            <React.Fragment key={data.id}>
                              <div className="product_title_parent">
                                <h3 className="product_titles">
                                  {data.filter_heading}{" "}
                                </h3>
                              </div>
                              <Filters
                                values={
                                  typeof data?.filter_value === "string"
                                    ? JSON.parse(data?.filter_value)
                                    : data?.filter_value
                                }
                                filterName={data.filter_heading.toLowerCase()}
                                handlerFilters={this.handleFilters}
                                persistSelected={
                                  this.state.selectedValues[
                                    data.filter_heading.toLowerCase()
                                  ]
                                }
                                resetPersistValues={this.resetSelectedValues}
                              />
                            </React.Fragment>
                          ) : (
                            <FilterAccordion
                              title={data.filter_heading}
                              eventKey={index}
                              key={data.id}
                              defaultActiveKey={index}
                            >
                              <Filters
                                values={
                                  typeof data?.filter_value === "string"
                                    ? JSON.parse(data?.filter_value)
                                    : data?.filter_value
                                }
                                filterName={data.filter_heading.toLowerCase()}
                                handlerFilters={this.handleFilters}
                                persistSelected={
                                  this.state.selectedValues[
                                    data.filter_heading.toLowerCase()
                                  ]
                                }
                                resetPersistValues={this.resetSelectedValues}
                              />
                            </FilterAccordion>
                          )
                        )}
                      </div>
                    )}
                    {/* {!!!this.props.filters.length && (
                    <div className="product_categories common_divison_padding">
                      {LOCAL_FILTERS.map((data, index) =>
                        index === 0 ? (
                          <React.Fragment key={data.id}>
                            <div className="product_title_parent">
                              <h3 className="product_titles">
                                {data.filter_heading}{" "}
                              </h3>
                            </div>
                            <Filters
                              values={data?.filter_value}
                              filterName={data.filter_heading.toLowerCase()}
                              handlerFilters={this.handleFilters}
                              persistSelected={
                                this.state.selectedValues[
                                  data.filter_heading.toLowerCase()
                                ]
                              }
                              resetPersistValues={this.resetSelectedValues}
                            />
                          </React.Fragment>
                        ) : (
                          <FilterAccordion
                            title={data.filter_heading}
                            eventKey={index}
                            key={data.id}
                          >
                            <Filters
                              values={data?.filter_value}
                              filterName={data.filter_heading.toLowerCase()}
                              handlerFilters={this.handleFilters}
                              persistSelected={
                                this.state.selectedValues[
                                  data.filter_heading.toLowerCase()
                                ]
                              }
                              resetPersistValues={this.resetSelectedValues}
                            />
                          </FilterAccordion>
                        )
                      )}
                    </div>
                  )} */}
                    <div className="common_divison_padding">
                      {/* <div className="product_title_parent">
                      <h3 className="product_titles">Bestsellers </h3>
                    </div> */}
                      {/* {(SLIDER_IMAGE || []).map((x, index) => {
                      return (
                        <Row key={x.id}>
                          <Col md={4} xs={4}>
                            <div className="related_products_card">
                              <img
                                src={images.product_image1}
                                className="img-fluid"
                                alt="Best Ecommerce natureraise"
                              />
                            </div>
                          </Col>
                          <Col md={8} xs={8}>
                            <div className="product_list_info_wrapper">
                              <div className="product_list_info">
                                <h6 className="product_list_title">
                                  Solar Panel 380w
                                </h6>
                                <h6 className="product_list_amount">
                                  ₹ 230.00
                                </h6>
                                <StarRatingComponent
                                  name="rate1"
                                  starCount={5}
                                  value={rating}
                                />
                              </div>
                            </div>
                          </Col>
                        </Row>
                      );
                    })} */}
                    </div>
                  </div>
                </Col>
                <Col sm={{ order: 1 }} md={9} xl={9}>
                  {!!this.props.error_message && (
                    <p style={{ textAlign: "center" }}>
                      {!!Array.isArray(this.props.error_message) &&
                        this.props.error_message.map((msg, idx) => (
                          <b key={idx}>{msg}</b>
                        ))}
                      {!!!Array.isArray(this.props.error_message) &&
                        this.props.error_message}
                    </p>
                  )}
                  {!!!this.props.error_message && (
                    <>
                      {" "}
                      <div className="product_showing_wrap ">
                        <div className="product_showing_list">
                          {!!this.props?.product_list_data?.length && (
                            <h6>
                              Showing {this.props?.product_list_data[0].rack_id}{" "}
                              results
                            </h6>
                          )}
                        </div>
                        <div>
                          <Form.Control
                            as="select"
                            value={sort}
                            onChange={this.property_data_fun}
                          >
                            {SORT_LIST.map((item) => (
                              <Fragment key={item.id}>
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              </Fragment>
                            ))}
                          </Form.Control>
                        </div>
                      </div>
                      {!!!this.props.product_list_data.length &&
                      !this.props.is_loading ? (
                        <p style={{ textAlign: "center" }}>
                          <b>New products coming soon!...</b>
                        </p>
                      ) : (
                        <div className="common_divison_padding ">
                          <InfiniteScroll
                            dataLength={this.props?.product_list_data?.length} //This is important field to render the next data
                            next={this.fetchData}
                            hasMore={
                              !!!(
                                this.props?.product_list_data?.length ===
                                +this.props?.product_list_data[0]?.rack_id
                              )
                            }
                            // hasMore={this.props.hasMore}
                            style={{ overflow: "hidden" }}
                            scrollThreshold={0.8}
                            loader={
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  zIndex: 3,
                                }}
                              >
                                <Spinner
                                  animation="grow"
                                  variant="dark"
                                  size="lg"
                                >
                                  <span className="sr-only">Loading...</span>
                                </Spinner>
                              </div>
                            }
                            endMessage={
                              <p style={{ textAlign: "center" }}>
                                <b>Yay! You have seen it all</b>
                              </p>
                            }
                          >
                            <Row>
                              {this.props?.product_list_data.map((x, index) => (
                                <Col md={4} xl={4} className="mb-2" key={x.id}>
                                  <ProductCard
                                    id={x?.id}
                                    percentage={x?.percentage}
                                    navigate_function={() => {
                                      this.navigate_function(x);
                                    }}
                                    item_name={x?.item_name}
                                    special_price={x?.special_price}
                                    selling_price={x?.selling_price}
                                    retail_price={x.retail_price}
                                    image={x?.image_address}
                                    addToCart={() =>
                                      this.add_to_cart(
                                        x?.id,
                                        x?.product_price_id
                                      )
                                    }
                                  />
                                </Col>
                              ))}
                            </Row>
                          </InfiniteScroll>
                        </div>
                      )}
                    </>
                  )}
                </Col>
              </Row>
            </Container>
          </div>
        </section>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    product_list_data: state.ProductActions.product_list,
    product_quantity: state.ProductActions.product_quantity,
    is_loading: state.ProductActions.is_loading,
    success_message: state.ProductActions.success_message,
    error_message: state.ProductActions.error_message,
    hasMore: state.ProductActions.hasMore,
    filters: state.ProductActions.filters,
    category: state.ProductActions.product_categories_list,
  };
};

export default connect(mapStateToProps, null)(ProductList);
