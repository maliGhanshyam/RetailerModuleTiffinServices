import React, { FC, ReactElement } from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Grid2,
  IconButton,
} from "@mui/material";
import { footerStyles } from "./footer.style";
import { SOCIAL_MEDIA_LINKS } from "../../constants/SOCIAL_MEDIA_LINKS";
import { CONTACT_INFO } from "../../constants/CONTACT_INFO.ts";
import { getCurrentYear } from "../../utils/dateUtils";
import {
  Email,
  Phone,
  Facebook,
  Twitter,
  Instagram,
} from "@mui/icons-material";

export const Footer: FC = (): ReactElement => {
  return (
    <Box sx={{ ...footerStyles.root, gap: "20px" }}>
      <Container maxWidth="lg">
        <Grid2 container justifyContent="space-between" alignItems="center">
          {/* Contact Information */}
          <Grid2 size={{ xs: 12, md: 4 }} sx={footerStyles.contact}>
            <Typography
              variant="body1"
              color="white"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Email sx={{ mr: 1 }} />
              {CONTACT_INFO.EMAIL}
            </Typography>
            <Typography
              variant="body1"
              color="white"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Phone sx={{ mr: 1 }} />
              Phone: {CONTACT_INFO.PHONE}
            </Typography>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4 }} sx={footerStyles.title}>
            <Typography variant="h5">Neo-Tiffins</Typography>
            <Typography variant="subtitle1">@{getCurrentYear()}</Typography>
          </Grid2>

          {/* Social Media Links */}
          <Grid2 size={{ xs: 12, md: 4 }} sx={footerStyles.social}>
            <Typography variant="body1" color="white">
              <strong>Follow Us:</strong>
            </Typography>
            <Link
              href={SOCIAL_MEDIA_LINKS.FACEBOOK}
              target="_blank"
              sx={footerStyles.link}
            >
              <Facebook fontSize="large" />
            </Link>
            <Link
              href={SOCIAL_MEDIA_LINKS.TWITTER}
              target="_blank"
              sx={footerStyles.link}
            >
              <Twitter fontSize="large" />
            </Link>
            <Link
              href={SOCIAL_MEDIA_LINKS.INSTAGRAM}
              target="_blank"
              sx={footerStyles.link}
            >
              <Instagram fontSize="large" />
            </Link>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
};

export default Footer;
