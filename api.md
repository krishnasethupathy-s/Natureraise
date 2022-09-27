# API'S:

## APP

- REST
  - RefreshToken/ (Authorization)

## Home

- REST
  - GetBanners/ (Authorization, banner_type)
- GRAPHQL
  - getSubCategoryList(item_category_id , Authorization) - Home page styles
  - getHomePageProductList(Authorization)

## SignIn

- REST
  - AddCartArray/ (Authorization, cart_list)
- GRAPHQL
  - SignInAction(username, password, client_ip, request_token)
  - LoginWithSocialID( social_id_type,
    social_id,
    first_name,
    last_name,
    email_id,
    image_address,
    client_ip,
    request_token,)

## SignUp

- GRAPHQL
  - SignUpAction(email_id,
    mobile_number1,
    first_name,
    last_name,
    password,
    request_token,
    client_ip,)

## ProductList

- GRAPHQL
  - getFilterListBySubCategory(Authorization,
    item_sub_category_id)
  - getItemSearch (Authorization,
    item_sub_category_id,
    page_number,
    data_limit,
    search_values,
    filter_values,
    price_values,
    sort_by)
  - addCartList( Authorization,
    id,
    action_type,
    cart_type,
    pincode,
    product_price_id)

## ProductDescription

- GRAPHQL
  - getItemListByMasterId (Authorization,
    master_id,
    pincode)
  - getRatingListByProductId(Authorization, product_id, page_number, data_limit)

## OrderDetail

- GRAPHQL
  - getOrderData ( Authorization, id)
  - getOrderedProductList(Authorization, order_id )
  - getOrderStatusList(Authorization, id)
  - getCategoriesByType(Authorization, type) - Order Return Reasons
  - addRating(Authorization,
    product_id,
    ratings_point,
    review_title,
    description,)
  - addOrderReturn(Authorization,
    order_id,
    order_return_type,
    product_ids,
    defect_type,
    description,)
  - cancelOrder(Authorization, id )

## Orders

- GRAPHQL
  - getOrderListPageWise ( Authorization, order_type, page_number, data_limit)

## Header Navbar

- REST
  - GetItemCategoryList/ ( Authorization)

## Footer

- GRAPHQL
  - addSubscriber ( type,
    email_id,
    status,)

## Contact

- GRAPHQL
  - addWebEnquiry ( company_name,
    contact_person,
    mobile_no,
    email_id,
    location,
    enquiry_for,
    message,)

## Checkout

- REST

  - AddProductOrder/ (Authorization,
    member_id
    order_amount ,
    coupon_amount ,
    delivery_charges
    address_type ,
    payment_type ,
    address_id ,
    net_amount ,
    order_type,
    coupon_code_value,)
  - OrderPaymentChecking/ ( Authorization,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,)

- GRAPHQL

  - getCartList ( Authorization,)

  - validateCouponCode (coupon_code_for,
    order_amount,
    coupon_code_value,
    Authorization,)

  - checkItemAvailability (Authorization, master_id, pincode)

## ChangePassword

- REST
  - ChangePasswordByCurrentPassword/ ( Authorization,
    current_password,
    new_password,
    confirm_password,)

## GST

- GRAPHQL
  - GstUpdation (Authorization,
    gst_number,
    pan_number,)

## Address

- GRAPHQL
  - getCustomerAddressList (Authorization)
  - deleteCustomerAddress ( Authorization, id )
  - addCustomerAddress(Authorization,
    address_id,
    contact_name,
    mobile_number,
    address_line1,
    address_line2,
    city,
    state,
    pincode,
    landmark,
    type,
    email_id,)

## Personal Information

- GRAPHQL
  - CustomerUpdation ( email_id,
    mobile_number1,
    first_name,
    last_name,
    Authorization,)

## ForgotPassword

- REST
  - GetResetPasswordLinkByMail/ ( email_id)
  - MailVerficationAction/ (status, customer_id)
  - ChangePasswordById/ ( Authorization,
    new_password,
    confirm_password,
    customer_id,)

## Blog

- REST
  - AllBlogList/
  - GetBlogData/ (blog_id)
