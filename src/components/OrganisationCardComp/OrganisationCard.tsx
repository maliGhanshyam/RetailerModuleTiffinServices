import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { FormControlLabel, Radio, RadioGroup, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { addRetailerRequest } from "../../Service/OrganisationService/OrganizationService";
import OrganisationCardStyles from "./OrganisationCardStyles";

interface CardField {
  label: string;
  value: string | number | undefined;
}

interface OrganisationCardProps {
  orgId: string;
  title: string;
  description: string;
  fields: CardField[];
  status: string;
  image?: string;
  onRequestSuccess?: () => void;
}

interface ReusableRadioCardProps {
  fields: CardField[];
  onSelectionChange?: (selectedValue: string | number | undefined) => void;
  isExpanded: boolean;
  toggleExpand: () => void;
}

const ReusableRadioCard: React.FC<ReusableRadioCardProps> = ({
  fields,
  onSelectionChange,
  isExpanded,
  toggleExpand,
}) => {
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    if (onSelectionChange) {
      onSelectionChange(value);
    }
  };

  return (
    <div>
      <RadioGroup value={selectedValue} onChange={handleRadioChange}>
        {fields.map((field, index) => {
          if (index === 0 || isExpanded) {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                <FormControlLabel
                  value={field.value}
                  control={<Radio />}
                  label={
                    <Typography variant="body2" color="text.secondary">
                      {field.value}
                    </Typography>
                  }
                  sx={{ flexGrow: 1 }}
                />
                {index === 0 && fields.length > 1 && (
                  <IconButton
                    onClick={toggleExpand}
                    size="small"
                    sx={{ position: "absolute", right: 0 }}
                  >
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                )}
                {/* {index < fields.length - 1 && (
                  <Divider sx={{ my: 1, width: "100%" }} />
                )} */}
              </div>
            );
          }
          return null;
        })}
      </RadioGroup>
    </div>
  );
};

const OrganisationCard: React.FC<OrganisationCardProps> = ({
  orgId,
  title,
  description,
  fields,
  status,
  image,
  onRequestSuccess,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<
    string | number | undefined
  >("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleRegisterRequest = async () => {
    if (!selectedLocation) {
      alert("Please select a location");
      return;
    }

    try {
      await addRetailerRequest(orgId, selectedLocation.toString());
      alert("Registration request submitted successfully");

      if (onRequestSuccess) {
        onRequestSuccess();
      }
    } catch (error) {
      console.error("Registration request failed:", error);
      alert("Failed to submit registration request");
    }
  };

  return (
    <Card sx={OrganisationCardStyles.cardStyles}>
      {image && (
        <CardMedia
          sx={OrganisationCardStyles.cardMediaStyles}
          image={image}
          title={title}
        />
      )}
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={OrganisationCardStyles.titleStyles}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <ReusableRadioCard
          fields={fields}
          onSelectionChange={(value) => {
            setSelectedLocation(value);
          }}
          isExpanded={isExpanded}
          toggleExpand={toggleExpand}
        />

        <Typography
          variant="body2"
          sx={OrganisationCardStyles.statusStyles(status)}
        >
          Status: {status}
        </Typography>
      </CardContent>
      <CardActions sx={OrganisationCardStyles.cardActionsStyles}>
        <Button
          size="small"
          color="primary"
          onClick={handleRegisterRequest}
          sx={OrganisationCardStyles.buttonStyles("primary")}
          variant="outlined"
          disabled={!selectedLocation}
        >
          Register
        </Button>
      </CardActions>
    </Card>
  );
};

export default OrganisationCard;
