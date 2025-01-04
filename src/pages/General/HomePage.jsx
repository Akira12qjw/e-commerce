import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Stack,
  CardMedia,
  Typography,
  Rating,
  Grid,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./../../styles/HomePage.css";
export const HomePage = ({ setLoggedIn }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);
  const getProducts = async () => {
    return axios
      .get("http://localhost:8080/api/products/all")
      .then((res) => res.data);
  };

  const RenderBestSeller = () => {
    if (products.length == 0) {
      return <div></div>;
    }
    const data = products.map((product, index) => (
      <Card
        elevation={0}
        sx={{ width: "280px", height: "370px", mb: 5, mr: 5 }}
        key={index}
      >
        <Box sx={{ position: "absolute", ml: 0.5, mt: 0.5 }}>
          <Typography
            sx={{
              color: "#fff",
              backgroundColor: "#000",
              mb: 1,
              textAlign: "center",
              fontSize: 15,
              px: 1,
            }}
          >
            New
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#f33e5d",
              color: "#fff",
              textAlign: "center",
              fontSize: 15,
            }}
          >
            -20%
          </Typography>
        </Box>
        <CardMedia
          component="img"
          image={product.IMG1}
          alt="unsplash img"
          onClick={() => navigate(`/product/detail?code=${product.CODE}`)}
          sx={{
            width: "100%",
            height: "280px",
            objectFit: "contain",
            backgroundColor: "#e3e3e3",
          }}
        />
        <CardContent sx={{ pt: 0, pl: 0, pr: 0 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ pt: 1, fontWeight: "600", fontSize: 18 }}
          >
            {product.NAME}
          </Typography>
          <Stack direction="row" display="flex" justifyContent="space-between">
            <Typography
              variant="h6"
              component="div"
              sx={{ fontSize: 18, fontWeight: "600" }}
            >
              $180.00
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textDecoration: "line-through",
                color: "#f5647d",
                fontSize: 16,
                lineHeight: "1.8",
                verticalAlign: "middle",
                pt: 0.1,
                ml: -4,
              }}
            >
              $210.90
            </Typography>
            <Rating
              size="small"
              defaultValue={Math.random() * (5 - 3) + 3}
              sx={{ pt: 0.5 }}
            ></Rating>
          </Stack>
        </CardContent>
      </Card>
    ));
    return data;
  };

  const RenderGrid = () => {
    const brands = [
      {
        id: 1,
        logo: "https://hienlaptop.com/wp-content/uploads/2024/12/logo-samsung-vector-6.png",
      },
      {
        id: 2,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZBONK_P20DdUMTMLeWeImmVdVlW8l8Vs_LA&s",
      },
      {
        id: 3,
        logo: "https://thietkelogo.mondial.vn/wp-content/uploads/2024/03/huawei-logo.png",
      },
      {
        id: 4,
        logo: "https://hoanghamobile.com/Uploads/2023/04/28/screenshot-2023-04-28-084045.png",
      },
      {
        id: 5,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStr5RSsiB_gu6DOqHs5H7CQHKYApCOFpq-RA&s",
      },
      {
        id: 6,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMIH2L9bALTUz2JWYz6P9HCfRcpH9k-m-TcA&s",
      },
      {
        id: 7,
        logo: "https://manuals.plus/wp-content/uploads/2022/05/mibro-logo.png",
      },
      {
        id: 8,
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPYKrXB0eNY-jmWcdshwdBNygOZ1CSuFRiQw&s",
      },
    ];
    const brandData = brands.map((brand, index) => (
      <Grid item xs={12} md={6} lg={3} key={index}>
        <Card
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
          elevation={0}
        >
          <CardMedia
            component="img"
            image={brand.logo}
            alt="unsplash img"
            sx={{
              width: 280,
              height: "30vh",
              objectFit: "contain",
              border: "1px solid #f3f4f6",
              backgroundColor: "white",
            }}
          />
        </Card>
      </Grid>
    ));
    return brandData;
  };

  const RenderFollowBtn = () => {
    let list = [];
    var text = "Facebook";
    for (let i = 0; i < 4; i++) {
      if (i === 1) text = "Instagram";
      if (i === 2) text = "Twitter";
      if (i === 3) text = "Linkedln";

      list.push(
        <Button
          variant="contained"
          disableElevation
          key={i}
          sx={{
            background: "inherit",
            color: "#000",
            fontWeight: 600,
            fontSize: 30,
            textTransform: "none",
            "&:hover": {
              color: "#fff",
            },
          }}
        >
          {text}
        </Button>
      );
    }
    return list;
  };
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {products && (
        <div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box sx={{ width: "80%", mt: 22 }} className="homepage_main-img">
              <Card elevation={0}>
                <Carousel>
                  <CardMedia
                    component="img"
                    image="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/b6/d7/b6d74786c3516fc8b38a96e2cb45905a.png"
                    alt="unsplash img"
                    sx={{
                      height: "30vw",
                      objectFit: "fill",
                    }}
                  />
                  <CardMedia
                    component="img"
                    image="https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/690x300_Kieslect%20Pura-newwww.jpg"
                    alt="unsplash img"
                    sx={{
                      height: "30vw",
                      objectFit: "fill",
                    }}
                  />
                  <CardMedia
                    component="img"
                    image="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/5d/34/5d3427750b8ceb380531034cde819dd8.png"
                    alt="unsplash img"
                    sx={{
                      height: "30vw",
                      objectFit: "fill",
                    }}
                  />
                  <CardMedia
                    component="img"
                    image="https://cdnv2.tgdd.vn/mwg-static/tgdd/Banner/60/85/60857e8c9674d199042d0c16f9e2cba3.png"
                    alt="unsplash img"
                    sx={{
                      height: "30vw",
                      objectFit: "fill",
                    }}
                  />
                </Carousel>
              </Card>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="homepage_main-component"
            sx={{ mt: 15 }}
          >
            <Box sx={{ width: "80%" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontSize: 40, fontWeight: 700 }}
              >
                Best Sellers
              </Typography>
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
                className="homepage_best-seller"
              >
                <RenderBestSeller />
              </Stack>
            </Box>
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box
              direction="row"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className="homepage_main-component"
              sx={{ width: "80%", mt: 10 }}
            >
              <Card elevation={0} sx={{ width: "49%" }}>
                <CardMedia
                  component="img"
                  image="https://donghoduyanh.com/upload_images/images/2023/07/15/RNhgesJJB6NGUTYpmarnmi.jpg"
                  alt="unsplash img"
                  sx={{
                    height: "40vh",
                  }}
                />
              </Card>
              <Card elevation={0} sx={{ width: "49%" }}>
                <CardMedia
                  component="img"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAnfjfjTWpd1apmSsLU08NjsX4MG9t4m4smA&s"
                  alt="unsplash img"
                  sx={{
                    height: "40vh",
                  }}
                />
              </Card>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            className="homepage_main-component"
            sx={{ mt: 15 }}
          >
            <Box sx={{ width: "80%" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontSize: 40, fontWeight: 700 }}
              >
                Newly Added
              </Typography>
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
                className="homepage_best-seller"
              >
                <RenderBestSeller />
              </Stack>
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 15 }}
            className="homepage_main-component"
          >
            <Box sx={{ width: "80%" }}>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontSize: 40, fontWeight: 700 }}
              >
                Explore Our Brand
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <RenderGrid />
              </Grid>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              mt: 10,
            }}
            className="homepage_main-component"
          >
            <Card elevation={0}>
              <CardMedia
                component="img"
                image="https://raw.githubusercontent.com/anduckhmt146/resource/master/public/342507301_9245703945471694_8487561683018262835_n.png"
                alt="unsplash img"
                sx={{
                  height: "45vw",
                  border: "1px solid #f3f4f6",
                }}
              />
            </Card>
          </Box>
          <Box
            mt={10}
            mb={10}
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            className="homepage_main-component"
          >
            <Typography mb={2}>Follow Us</Typography>
            <Stack
              direction="row"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <RenderFollowBtn />
            </Stack>
          </Box>
        </div>
      )}
    </React.Fragment>
  );
};
