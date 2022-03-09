import { BlitzPage } from "blitz"
import Layout from "app/core/layouts/Layout"
import { Box, Button, Container, Grid, Typography, useMediaQuery } from "@mui/material"
import NavigationBar from "app/core/components/NavigationBar"
import { ThemeProvider, useTheme } from "@mui/material/styles"
import { darkTheme } from "app/core/styles/theme"
import Footer from "app/core/components/Footer"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const Home: BlitzPage = () => {
  const theme = useTheme()
  const md = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <>
      <Box
        sx={{
          backgroundColor: "primary.main",
        }}
      >
        <Typography component="p" align="center" color="common.white" sx={{ py: 2 }}>
          This service is under heavy construction!
        </Typography>
      </Box>
      <ThemeProvider theme={darkTheme}>
        <section className="hero-section">
          <NavigationBar />
          <Container>
            <Grid container paddingTop={15} paddingBottom={25} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Typography
                  className="hero-section__heading--primary"
                  variant="h2"
                  component="h1"
                  fontWeight={500}
                  color="text.primary"
                >
                  Print it into the cloud, read it everywhere.
                </Typography>
                <Typography className="hero-section__heading--sub" color="text.primary">
                  Println aims to help developers stay up to date with what their software is doing,
                  whether it runs in the cloud, or not.
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    mr: 2,
                  }}
                >
                  <Typography>Get started</Typography>
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    mt: 2,
                  }}
                >
                  <Typography>Try demo</Typography>
                </Button>
              </Grid>
              <Grid
                className="hero-section__preview"
                item
                md={5}
                alignItems="center"
                justifyContent="center"
                pt={md ? 12 : 0}
              >
                <Typography color="text.primary" align="center" variant="h3" component="h3">
                  &gt;Printline |
                </Typography>
              </Grid>
            </Grid>
          </Container>
          <div className={md ? "small-margin" : "big-margin"}>
            <Footer />
          </div>
        </section>
      </ThemeProvider>

      <style type="text/css">
        {`
        .hero-section {
            background-color: #330033;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='414' height='414' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23404' stroke-width='3.3'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23505'%3E%3Ccircle cx='769' cy='229' r='10'/%3E%3Ccircle cx='539' cy='269' r='10'/%3E%3Ccircle cx='603' cy='493' r='10'/%3E%3Ccircle cx='731' cy='737' r='10'/%3E%3Ccircle cx='520' cy='660' r='10'/%3E%3Ccircle cx='309' cy='538' r='10'/%3E%3Ccircle cx='295' cy='764' r='10'/%3E%3Ccircle cx='40' cy='599' r='10'/%3E%3Ccircle cx='102' cy='382' r='10'/%3E%3Ccircle cx='127' cy='80' r='10'/%3E%3Ccircle cx='370' cy='105' r='10'/%3E%3Ccircle cx='578' cy='42' r='10'/%3E%3Ccircle cx='237' cy='261' r='10'/%3E%3Ccircle cx='390' cy='382' r='10'/%3E%3C/g%3E%3C/svg%3E");
        }

        .hero-section__cta {
          padding-top: 1rem;
        }

        .big-margin {
          margin-top: 8.8rem;
        }

        .small-margin {
          margin-top: 0;
        }
      `}
      </style>
    </>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
