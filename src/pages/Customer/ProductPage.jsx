import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Stack,
  Breadcrumbs,
  Link,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  RadioGroup,
  Radio,
  Autocomplete,
  TextField,
  InputAdornment,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Pagination,
  Drawer,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import TuneIcon from "@mui/icons-material/Tune";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "../../styles/ProductPage.css";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

export const ProductPage = () => {
  const [price, setPrice] = useState(0);
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("search");

    if (query) {
      getSearchResults(query).then((data) => setProducts(data));
    } else {
      getProducts().then((data) => setProducts(data));
    }
    getCategories().then((data) => setCategories(data));
    getCollections().then((data) => setCollections(data));
  }, [window.location.search]);

  const getProducts = async () => {
    return axios
      .get("http://localhost:8080/api/products/all")
      .then((res) => res.data);
  };
  const getCategories = async () => {
    return axios
      .get("http://localhost:8080/api/products/categories")
      .then((res) => res.data);
  };
  const getCollections = async () => {
    return axios
      .get("http://localhost:8080/api/products/collections")
      .then((res) => res.data);
  };
  const getCategoriesId = async (id) => {
    return axios
      .get(`http://localhost:8080/api/products/filter_categories?id=${id}`)
      .then((res) => res.data);
  };

  const handleCategories = (id) => {
    getCategoriesId(id)
      .then((data) => setProducts(data))
      .catch((err) => {
        setProducts([]);
        setOpen(true);
      });
  };

  const handleFilter = () => {
    if (price == 0 && size != "") {
      axios
        .get(`http://localhost:8080/api/products/filter_pro?size=${size}`)
        .then((res) => res.data)
        .then((data) => setProducts(data))
        .catch((err) => {
          setProducts([]);
          setOpen(true);
        });
    } else if (size == "" && price != 0) {
      axios
        .get(`http://localhost:8080/api/products/filter_pro?price=${price}}`)
        .then((res) => res.data)
        .then((data) => setProducts(data))
        .catch((err) => {
          setProducts([]);
          setOpen(true);
        });
    } else {
      axios
        .get(
          `http://localhost:8080/api/products/filter_pro?size=${size}&&price=${price}`
        )
        .then((res) => res.data)
        .then((data) => setProducts(data))
        .catch((err) => {
          setProducts([]);
          setOpen(true);
        });
    }
  };

  const getSearchResults = async (query) => {
    return axios
      .get(
        `http://localhost:8080/api/products/search?query=${encodeURIComponent(
          query
        )}`
      )
      .then((res) => res.data)
      .catch((err) => {
        setProducts([]);
        setOpen(true);
      });
  };
  const navigate = useNavigate();
  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const RenderProduct = () => {
    const productList = products.map((product, index) => (
      <Card className="product_item" elevation={0} key={index}>
        <Box>
          <Typography>New</Typography>
          <Typography>-20%</Typography>
        </Box>
        <CardMedia
          component="img"
          image={product.IMG1}
          alt="unsplash img"
          sx={{ objectFit: "contain", backgroundColor: "#e3e3e3" }}
          onClick={() => navigate(`/product/detail?code=${product.CODE}`)}
        />
        <CardContent>
          <Typography variant="h6" component="div">
            {product.NAME}
          </Typography>
          <Stack>
            <Typography
              variant="h6"
              sx={{ fontSize: 13, ml: 1 }}
              component="div"
            >
              {product.PRICE.toLocaleString("vi-VN")} VND
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: 13, ml: 6 }}
              component="div"
            >
              {(product.PRICE * 1.2).toLocaleString("vi-VN")} VND
            </Typography>
            <Rating
              size="small"
              defaultValue={Math.random() * (5 - 3) + 3}
            ></Rating>
          </Stack>
        </CardContent>
      </Card>
    ));
    return productList;
  };

  const RenderProductSidebar = () => {
    return (
      <React.Fragment>
        <Accordion elevation={0} defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Blue"
              name="radio-buttons-group"
            >
              {categories.map((category, index) => (
                <FormControlLabel
                  key={category.ID}
                  value={category.ID}
                  label={category.NAME}
                  control={
                    <Link
                      component="button"
                      sx={{ ml: 2, mb: 5 }}
                      onClick={() => handleCategories(category.ID)}
                    />
                  }
                />
              ))}
            </RadioGroup>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Box className="product_container">
        <Box className="product_wrapper">
          <Stack className="product_breadcrumbs">
            <Breadcrumbs aria-label="breadcrumbs" separator=">">
              <Link href="#">Home</Link>
              <Link href="#">Shop All</Link>
              <Link href="#">Shop All</Link>
            </Breadcrumbs>
          </Stack>
          <Box className="product_content">
            <IconButton onClick={() => setOpenDrawer(true)}>
              <TuneIcon />
              <Typography>Bộ lọc</Typography>
            </IconButton>
            <Stack className="product_sidebar">
              <RenderProductSidebar />
            </Stack>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: "100%" }}
              >
                Product not found!
              </Alert>
            </Snackbar>
            <Box className="product_display" component="main">
              <Stack className="product_header"></Stack>
              <Box>
                {products.length > 0 ? (
                  <RenderProduct />
                ) : (
                  <Typography>No Result Found</Typography>
                )}
              </Box>
              <Stack spacing={2}>
                <Pagination count={3} shape="rounded" />
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
      <Drawer variant="persistent" open={openDrawer} className="product_drawer">
        <Typography>Bộ lọc</Typography>
        <IconButton onClick={() => setOpenDrawer(false)}>
          <CloseIcon />
        </IconButton>
        <Stack className="product_sidebar">
          <RenderProductSidebar />
        </Stack>
      </Drawer>
    </React.Fragment>
  );
};
