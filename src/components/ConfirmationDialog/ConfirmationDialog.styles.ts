import { SxProps, Theme } from '@mui/material';

export const styles: { [key: string]: SxProps<Theme> } = {
  modalContentStyle: {
    variant: "body1",
  },
  modalTitle: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  modalActions: {
    padding: "12px",
  },
  sectionTitle: {
    mt: 3,
    mx: 3,
    fontWeight: "bold",
    fontSize: "1.4rem",
    display: "flex",
    justifyContent: "space-between",
  },
  modalContent: {
    padding: "8px",
    backgroundColor: "#f9f9f9",
    borderRadius: 2,
    fontSize: "1rem",
    color: "text.primary",
    marginX:"25px"
  },
  modalButton: {
    minWidth: "100px",
    fontWeight: "bold", 
  },
  cardMediaStyles: {
    height: 140,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },
};
