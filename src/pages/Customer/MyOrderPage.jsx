import React from "react";
import {
  Box,
  Link,
  Breadcrumbs,
  Stack,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";
import "./../../styles/MyOrderPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
export const MyOrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const customerId = JSON.parse(sessionStorage.getItem("user")).id;
  useEffect(() => {
    getOrders().then((data) => {
      setOrders(data);
      console.log(orders);
    });
  }, []);
  const getOrders = async () => {
    return axios
      .get(`http://localhost:8080/api/orders/allOrder?CustomerID=${customerId}`)
      .then((res) => res.data);
  };

  const RenderOrder = () => {
    const data = orders.map((order, index) => (
      <Stack className="my-order_detail">
        <Stack className="my-order_item" direction="row">
          <Stack>
            <Typography>Đơn hàng số {order.OrderID}</Typography>
            <Typography>
              <b>Ngày đặt hàng: </b>
              {order.DATE_TIME}
            </Typography>
            <Typography>
              <b>Ngày giao hàng dự kiến: </b>
              {String(new Date())}
            </Typography>
          </Stack>
          <Stack>
            <Typography>
              <b>Trạng thái đơn hàng:</b>{" "}
              {order.STATUS == 0 ? "Đang tiến hành" : "Đặt thành công"}
            </Typography>
            <Typography>
              <b>Phương thức thanh toán:</b> {order.PAY_METHOD}
            </Typography>
          </Stack>
        </Stack>
        <Stack className="my-order_item-detail">
          <Stack className="item-detail">
            <Stack>
              <Typography>
                <b>Tên: {order.NAME}</b>
              </Typography>
              <Typography>
                <b>Số điện thoại:</b> {order.RECEIVE_PHONE}
              </Typography>
              <Typography>
                <b>Địa chỉ:</b> {order.RECEIVE_ADDRESS}
              </Typography>
              <Typography>
                <b>Tổng đơn hàng:</b> {order.TOTAL_PRODUCT}
              </Typography>
              <Typography>
                <b>Giá:</b> {order.TOTAL_COST} VND
              </Typography>
            </Stack>
            <Button
              variant="contained"
              onClick={() => navigate(`/order/detail?orderID=${order.OrderID}`)}
            >
              Xem chi tiết
            </Button>
          </Stack>
        </Stack>
      </Stack>
    ));
    return data;
  };

  return (
    <React.Fragment>
      <Box className="my-order_container">
        <Box className="my-order_wrapper">
          <Stack className="my-order_breadcrumbs">
            <Breadcrumbs aria-label="breadcrumbs" separator=">">
              <Link href="#">Home</Link>
              <Link href="#">Shop All</Link>
              <Link href="#">Shop All</Link>
            </Breadcrumbs>
          </Stack>
          <Stack className="my-order_content">
            <Typography>Đơn hàng của tôi</Typography>
            <Stack className="my-order_items">
              <RenderOrder />
            </Stack>
          </Stack>
        </Box>
      </Box>
    </React.Fragment>
  );
};
