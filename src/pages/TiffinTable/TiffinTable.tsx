import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  cancelTiffins,
  getAllTiffins,
  searchTiffins
} from "../../services/Tiffin";
import { Tiffin } from "../../services/Tiffin/Tiffin.types";
import { Delete, Edit, Search as SearchIcon } from "@mui/icons-material";
import {
  TablePagination,
  TextField,
  InputAdornment,
  Rating,
  Avatar,
} from "@mui/material";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGE_TIFFIN } from "../../constants/DEFAULT_IMAGE";
import { styles } from "./TiffinTable.styles";
import { useSnackbar } from "../../hook";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

export default function TiffinTable() {
  const [page, setPage] = useState(0); // Current page
  const [tiffins, setTiffins] = useState<Tiffin[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [confirmOpenDialog, setConfirmOpenDialog] = useState(false); // For confirmation dialog
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);
  const [selectedTiffin, setSelectedTiffin] = useState<Tiffin | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const limit = rowsPerPage; // Set limit to 2 items per page
  const { showSnackbar } = useSnackbar();

  const fetchTiffins = async (page: number, limit: number) => {
    try {
      const { data, totalItems, totalPages } = await getAllTiffins(
        page + 1,
        limit
      ); // 1-based indexing
      setTiffins(data || []);
      setTotalItems(totalItems);
      setTotalPages(totalPages);
    } catch (error) {
      showSnackbar("Error fetching tiffins", "error");
      setTiffins([]);
    }
  };
  const searchTiffin = async (query: string = "", page: number = 0, limit: number = 2) => {
    try {
      const { data, totalItems, totalPages } = await searchTiffins(
        query,
        page + 1,
        limit
      );
      setTiffins(data || []);
      setTotalItems(totalItems);
      setTotalPages(totalPages);
    } catch (error) {
      showSnackbar("Search error", "error");
      setTiffins([]);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchTiffin(searchTerm, page, limit);
    } else {
      fetchTiffins(page, limit);
    }
  }, [searchTerm, page, limit]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page when rows per page change
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const openConfirmationDialog = (action: "reject", tiffin: Tiffin) => {
    setActionType(action);
    setSelectedTiffin(tiffin);
    setConfirmOpenDialog(true);
  };

  const handleCancelTiffin = async () => {
    if (selectedTiffin) {
      await cancelTiffins(selectedTiffin._id);
      showSnackbar("Tiffin cancelled successfully", "success");
      fetchTiffins(page, limit);
      closeDialog();
    }
  };
  const closeDialog = () => {
    setConfirmOpenDialog(false);
    setSelectedTiffin(null);
    setActionType(null);
  };
  const Row = ({ tiffin }: { tiffin: Tiffin }) => {
    const navigate = useNavigate();

    const handleUpdate = async (tiffinId: string) => {
        navigate(`/update-tiffin/${tiffinId}`);
        await fetchTiffins(page, limit);
      };

    return (
      <>
        <TableRow>
        <TableCell sx={styles.tableCellStyleNormal}>
            <Avatar
              alt={tiffin.tiffin_name}
              src={tiffin.tiffin_image_url || DEFAULT_IMAGE_TIFFIN}
              sx={styles.imgStyle}
            />
          </TableCell>
          <TableCell>{tiffin.tiffin_name}</TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>{tiffin.tiffin_type}</TableCell>
          <TableCell>{tiffin.tiffin_price.toFixed(2)}</TableCell>
          <TableCell>{tiffin.tiffin_available_quantity}</TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>{formatDate(tiffin.tiffin_created_at)}</TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>{formatDate(tiffin.tiffin_updated_at)}</TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            <Rating value={tiffin.tiffin_rating} readOnly precision={0.5} />
          </TableCell>
          <TableCell>
            <IconButton
              color="primary"
              aria-label="edit"
              sx={styles.hoverIcon}
              onClick={() => handleUpdate(tiffin._id)}
            >
              <Edit />
            </IconButton>
            <IconButton
              onClick={() => openConfirmationDialog("reject", tiffin)}
              color="error"
              sx={styles.hoverIcon}
            >
              <Delete />
            </IconButton>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <Paper
      sx={styles.paperStyle}
    >
      <Box
        sx={styles.boxStyle}
      >
        <TextField
          fullWidth
          label="Search by Name & Type"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "auto" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <TableContainer sx={{ maxHeight: 440 ,marginRight: "20px"}}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={styles.background}>
            <TableRow>
            <TableCell sx={styles.tableCellStyleFont}>Image</TableCell>
              <TableCell sx={styles.fontWeightBold}>Tiffin Name</TableCell>
              <TableCell sx={styles.tableCellStyleFont}>Type</TableCell>
              <TableCell sx={styles.fontWeightBold}>Price</TableCell>
              <TableCell sx={styles.fontWeightBold}>Quantity</TableCell>
              <TableCell sx={styles.tableCellStyleFont}>Created At</TableCell>
              <TableCell sx={styles.tableCellStyleFont}>Updated At</TableCell>
              <TableCell sx={styles.tableCellStyleFont}>Rating</TableCell>
              <TableCell sx={styles.fontWeightBold}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {tiffins.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            ) : tiffins.map((tiffin) => (
              <Row key={tiffin._id} tiffin={tiffin} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[2, 5, 10]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleRowsPerPageChange}
        sx={{ display: searchTerm ? "none" : "block" }}
      />
      <ConfirmationDialog
        open={confirmOpenDialog}
        title={actionType === "approve" ? "Approve Tiffin" : "Delete Tiffin"}
        content={actionType === "approve" ? "Are you sure you want to approve this tiffin?" : "Are you sure you want to delete this tiffin?"}
        actionType={actionType}
        onClose={closeDialog}
        onConfirm={actionType === "reject" ? handleCancelTiffin : closeDialog}
      />
    </Paper>
  );
}
