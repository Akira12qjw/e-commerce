import React from "react";
import { useState, useEffect } from "react";
// import styled from "styled-components";
import {
  Box,
  Stack,
  Breadcrumbs,
  Link,
  ButtonBase,
  Typography,
  FormControlLabel,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  // Checkbox,
  Radio,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Button,
  ButtonGroup,
  // IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import CircleIcon from "@mui/icons-material/Circle";
import "../../styles/ProductDetailPage.css";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";
export const ProductDetailPage = () => {
  const params = new URLSearchParams(document.location.search);
  const code = params.get("code");
  const [products, setProducts] = useState("");
  const [items, setItems] = useState("");
  const [open, setOpen] = useState(false);
  const [mainImg, setMainImg] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(1);
  const [colors, setColor] = useState(["red"]);
  const [colorSelected, setColorSelected] = useState("");
  const [inStock, setInStock] = useState(0);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    getItems().then((data) => setItems(data));
  }, []);
  const getItems = async () => {
    return axios
      .get("http://localhost:8080/api/products/all")
      .then((res) => res.data);
  };
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/products/detail?code=${code}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product:", error);
      if (error.response) {
        // Handle specific error responses
        if (error.response.status === 404) {
          // Product not found
          console.log("Product not found");
        } else if (error.response.status === 500) {
          // Server error
          console.log("Server error occurred");
        }
      }
      throw error;
    }
  };
  console.log("Code being sent to API:", code);
  useEffect(() => {
    getQuantity().then((data) => {
      setInStock(data[0]["QUANITY"]);
    });
  }, [code, colorSelected, size]);
  const getQuantity = async () => {
    return axios
      .get(
        `http://localhost:8080/api/products/get_quanity?id=${code}&&color=${colorSelected}&&size=${size}`
      )
      .then((res) => res.data);
  };
  const getData = async () => {
    return await getProducts().then((res) => {
      setProducts(res);
      setMainImg(res[0].IMG1);
      setColor(res[0].COLOR.split("/"));
      setColorSelected(res[0].COLOR.split("/")[0]);
      setSize(res[0].SIZE.split(",")[0]);
    });
  };
  useEffect(() => {
    getData();
  }, [code]);
  const handleQuantity = (index) => {
    if (index === 0) {
      if (quantity <= 1) {
        return;
      }
      setQuantity(quantity - 1);
    } else {
      if (quantity >= inStock) {
        return;
      }
      setQuantity(quantity + 1);
    }
  };
  const handleClickAdd = () => {
    let isCustomer = "";
    let customerID = "";
    if (sessionStorage.getItem("user")) {
      isCustomer = JSON.parse(sessionStorage.getItem("user")).name;
      customerID = JSON.parse(sessionStorage.getItem("user")).id;
    } else {
      setOpen(true);
      return;
    }
    axios({
      method: "post",
      url: "http://localhost:8080/api/cart/add",
      data: {
        CustomerID: customerID,
        CODE: code,
        COLOR: colorSelected,
        SIZE: size,
        NUM: quantity,
      },
    })
      .then((res) => {
        console.log("Success");
        navigate("/cart");
      })
      .catch((res) => {
        console.log("Error");
        console.log(res);
      });
  };
  const RenderImage = () => {
    let img;
    if (products.length == 0) {
      return <div></div>;
    } else {
      img = [products[0].IMG1, products[0].IMG2, products[0].IMG3];
    }
    let list = [];
    for (let i = 0; i < 3; i++) {
      list.push(
        <ButtonBase
          disableRipple
          key={i}
          value={i}
          onClick={(event) => setMainImg(event.target.currentSrc)}
        >
          <CardMedia
            component="img"
            image={img[i]}
            alt="unsplash img"
            sx={{ objectFit: "contain", backgroundColor: "#e3e3e3" }}
          />
        </ButtonBase>
      );
    }
    return list;
  };

  const RenderBestSeller = () => {
    if (items.length == 0) {
      return <div></div>;
    }
    const data = items.map((item, index) => (
      <Card
        className="product-detail_recommend-image"
        elevation={0}
        key={index}
      >
        <Box className="product-detail_img-detail">
          <Typography>New</Typography>
          <Typography>-20%</Typography>
        </Box>
        <CardMedia
          component="img"
          image={item.IMG1}
          alt="unsplash img"
          onClick={() => navigate(`/product/detail?code=${item.CODE}`)}
          sx={{ objectFit: "contain", backgroundColor: "#e3e3e3" }}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {item.NAME}
          </Typography>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography variant="h6" sx={{ fontSize: 15 }} component="div">
              {item.PRICE.toLocaleString("vi-VN")} VND
            </Typography>
            <Typography variant="h6" component="div">
              {(item.PRICE * 1.2).toLocaleString("vi-VN")} VND
            </Typography>
            <Rating size="small"></Rating>
          </Stack>
        </CardContent>
      </Card>
    ));
    return data;
  };

  const RenderDescription = () => {
    if (products.length == 0) {
      return <div></div>;
    }
    return (
      <Stack className="product-detail_comment-content">
        <Typography sx={{ fontSize: 20, fontWeight: "bold" }}>
          {products[0].DESCRIPTION}
        </Typography>
      </Stack>
    );
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {products && (
        <Box className="product-detail_container">
          <Box className="product-detail_wrapper">
            <Stack className="product-detail_breadcrumbs">
              <Breadcrumbs aria-label="breadcrumbs" separator=">">
                <Link href="#">Home</Link>
                <Link href="#">Shop All</Link>
                <Link href="#">Shop All</Link>
              </Breadcrumbs>
            </Stack>
            <Box className="product-detail_content">
              <Stack className="product-detail_content-side">
                <RenderImage />
              </Stack>
              <Box className="product-detail_main">
                <Stack className="product-detail_main-img">
                  <CardMedia
                    component="img"
                    image={mainImg}
                    alt="unsplash img"
                  />
                  <Stack className="product-detail_content-side product-detail_side_respon">
                    <RenderImage />
                  </Stack>
                </Stack>
                <Stack className="product-detail_main-detail">
                  <Typography variant="h6" component="div">
                    {products[0].NAME}
                  </Typography>
                  <Stack direction="row">
                    <Rating
                      size="small"
                      value={Math.random() * (5 - 3) + 3}
                    ></Rating>
                    <Typography variant="h6" component="div">
                      (12)
                    </Typography>
                  </Stack>
                  <Stack direction="row">
                    <Typography variant="h6" component="div">
                      {products[0].PRICE.toLocaleString("vi-VN")} VND
                    </Typography>
                    <Typography variant="h6" component="div">
                      {(products[0].PRICE * 1.2).toLocaleString("vi-VN")} VND
                    </Typography>
                  </Stack>
                  <Stack>
                    <Typography variant="h6" component="div">
                      Color:
                    </Typography>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      value={colorSelected}
                      name="radio-buttons-group"
                      row
                    >
                      {colors.map((color) => (
                        <FormControlLabel
                          value={color}
                          control={<Radio />}
                          onChange={(e) => {
                            setColorSelected(e.target.value);
                          }}
                          sx={{
                            "& .Mui-checked": {
                              color: colorSelected,
                            },
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </Stack>
                  <Stack>
                    <Typography variant="h6" component="div">
                      Size:
                    </Typography>
                    <ToggleButtonGroup
                      value={size}
                      exclusive
                      onChange={(e) => setSize(e.target.value)}
                      aria-label="size"
                    >
                      {products[0].SIZE.split(",").map((text) => (
                        <ToggleButton
                          key={text}
                          value={text}
                          aria-label={text}
                          disableRipple
                        >
                          {text}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Stack>
                  <Stack>
                    <Typography variant="h6" component="div">
                      In Stock: {inStock}
                    </Typography>
                    <Typography variant="h6" component="div">
                      Quantity:
                    </Typography>
                    <ButtonGroup
                      disableElevation
                      variant="contained"
                      aria-label="Disabled elevation buttons"
                    >
                      <Button
                        disableRipple
                        endIcon={<RemoveIcon />}
                        onClick={() => handleQuantity(0)}
                      ></Button>
                      <Button
                        disableRipple
                        sx={{
                          fontSize: "16px",
                        }}
                      >
                        {quantity}
                      </Button>
                      <Button
                        disableRipple
                        startIcon={<AddIcon />}
                        onClick={() => handleQuantity(1)}
                      ></Button>
                    </ButtonGroup>
                  </Stack>
                  <Stack direction="row">
                    <Button onClick={() => handleClickAdd()}>
                      Thêm vào giỏ hàng
                    </Button>
                    <Button onClick={() => handleClickAdd()}>Mua ngay</Button>
                  </Stack>
                  <Stack direction="column">
                    <Box>
                      <Typography variant="h6" component="div">
                        Mã sản phẩm: &nbsp;
                      </Typography>
                      <Typography variant="h6" component="div">
                        #20344690
                      </Typography>
                    </Box>
                    <Box>
                      <LocalShippingOutlinedIcon />
                      &nbsp;
                      <Typography variant="h6" component="div">
                        Giao hàng MIỄN PHÍ vào thứ Sáu, ngày 10 tháng 1 cho đơn
                        hàng đầu tiên.
                        <Typography variant="h6" component="span">
                          Chi tiết
                        </Typography>
                      </Typography>
                    </Box>
                    <Box>
                      <UpdateOutlinedIcon />
                      &nbsp;
                      <Typography variant="h6" component="div">
                        Giao hàng trong vòng: 3-7 ngày làm việc. &nbsp;
                      </Typography>
                      <Typography variant="h6" component="div">
                        Xem thêm
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </Box>
          <Box className="product-detail_comment">
            <Stack className="product-detail_comment-header" direction="row">
              <Button
                className={tab === 0 && "border_bottom"}
                onClick={() => setTab(0)}
                disableRipple
              >
                Chi tiết sản phẩm
              </Button>
            </Stack>
            {tab === 0 && <RenderDescription />}
            <Stack className="product-detail_recommend">
              <Typography gutterBottom variant="h6" component="div">
                Các mặt hàng tương tự bạn có thể thích
              </Typography>
              <Stack>
                <RenderBestSeller />
              </Stack>
            </Stack>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleClose}
                severity="warning"
                sx={{ width: "100%" }}
              >
                Vui lòng đăng nhập!!!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};
