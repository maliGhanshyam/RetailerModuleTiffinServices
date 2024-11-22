import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import OrganisationCardStyles from "./OrganisationCardStyles"; // Import the entire styles object

interface CardField {
  label: string;
  value: string | number | undefined;
}

interface OrganisationCardProps {
  title: string;
  description: string;
  fields: CardField[];
  status: string;
  image?: string;
  actions?: {
    label: string;
    color: "primary" | "error";
    onClick: () => void;
  }[];
}

const OrganisationCard: React.FC<OrganisationCardProps> = ({
  title,
  description,
  fields,
  status,
  image,
  actions,
}) => {
  return (
    <Card sx={OrganisationCardStyles.cardStyles}>
      {" "}
      {/* Use the consolidated styles */}
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

        {fields.map((field, index) => (
          <div key={index}>
            <Typography variant="body2" color="text.secondary">
              <strong>{field.label}:</strong> {field.value}
            </Typography>
            {index < fields.length - 1 && <Divider sx={{ my: 1 }} />}
          </div>
        ))}

        <Typography
          variant="body2"
          sx={OrganisationCardStyles.statusStyles(status)}
        >
          Status: {status}
        </Typography>
      </CardContent>
      {actions && (
        <CardActions sx={OrganisationCardStyles.cardActionsStyles}>
          {actions.map((action, index) => (
            <Button
              key={index}
              size="small"
              color={action.color}
              onClick={action.onClick}
              sx={OrganisationCardStyles.buttonStyles(action.color)} // Use the consolidated styles
              variant="outlined"
            >
              {action.label}
            </Button>
          ))}
        </CardActions>
      )}
    </Card>
  );
};

export default OrganisationCard;
