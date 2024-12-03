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
  searchTiffins,
} from "../../services/Tiffin";
import { Tiffin } from "../../services/Tiffin/Tiffin.types";
import {
  ArrowDownward,
  ArrowUpward,
  Delete,
  Edit,
  Search as SearchIcon,
} from "@mui/icons-material";
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
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [selectedTiffin, setSelectedTiffin] = useState<Tiffin | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const limit = rowsPerPage; // Set limit to 2 items per page
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });
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
  const searchTiffin = async (
    query: string = "",
  ) => {
    try {
      const data = await searchTiffins(
        query
      );
      setTiffins(data || []);
    } catch (error) {
      showSnackbar("Search error", "error");
      setTiffins([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchTiffin(searchTerm);
      } else {
        fetchTiffins(page, limit);
      }
    }, 500);

    return () => clearTimeout(timer); // Cleanup time
  }, [searchTerm, page, limit]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
  const handleSort = (key: string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };
  const sortedOrders = React.useMemo(() => {
    if (sortConfig.key && sortConfig.direction) {
      return [...tiffins].sort((a, b) => {
        const aValue =
          sortConfig.key === "tiffin_price"
            ? Number(a.tiffin_price)
            : sortConfig.key === "tiffin_available_quantity"
            ? Number(a.tiffin_available_quantity)
            : sortConfig.key === "tiffin_rating"
            ? Number(a.tiffin_rating)
            : (a[sortConfig.key as keyof Tiffin] || "")
                .toString()
                .toLowerCase();

        const bValue =
          sortConfig.key === "tiffin_price"
            ? Number(b.tiffin_price)
            : sortConfig.key === "tiffin_available_quantity"
            ? Number(b.tiffin_available_quantity)
            : sortConfig.key === "tiffin_rating"
            ? Number(b.tiffin_rating)
            : (b[sortConfig.key as keyof Tiffin] || "")
                .toString()
                .toLowerCase();

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return tiffins;
  }, [tiffins, sortConfig]);

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
          <TableCell sx={styles.tableCellStyleNormal}>
            {tiffin.tiffin_type}
          </TableCell>
          <TableCell>{tiffin.tiffin_price.toFixed(2)}</TableCell>
          <TableCell>{tiffin.tiffin_available_quantity}</TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            {formatDate(tiffin.tiffin_created_at)}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            {formatDate(tiffin.tiffin_updated_at)}
          </TableCell>
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
    <Paper sx={styles.paperStyle}>
      <Box sx={styles.boxStyle}>
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
      <TableContainer sx={{ maxHeight: 800, marginRight: "20px" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={styles.background}>
            <TableRow>
              <TableCell sx={styles.tableCellStyleFont}>Image</TableCell>
              <TableCell
                onClick={() => handleSort("tiffin_name")}
                sx={styles.fontWeightBold}
              >
                Tiffin Name
                {sortConfig.key === "tiffin_name" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("tiffin_type")}
                sx={styles.tableCellStyleFont}
              >
                Type
                {sortConfig.key === "tiffin_type" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("tiffin_price")}
                sx={styles.fontWeightBold}
              >
                Price
                {sortConfig.key === "tiffin_price" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("tiffin_available_quantity")}
                sx={styles.fontWeightBold}
              >
                Quantity
                {sortConfig.key === "tiffin_available_quantity" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("tiffin_created_at")}
                sx={styles.tableCellStyleFont}
              >
                Created At
                {sortConfig.key === "tiffin_created_at" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("tiffin_updated_at")}
                sx={styles.tableCellStyleFont}
              >
                Updated At
                {sortConfig.key === "tiffin_updated_at" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell
                onClick={() => handleSort("tiffin_rating")}
                sx={styles.tableCellStyleFont}
              >
                Rating
                {sortConfig.key === "tiffin_rating" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell sx={styles.fontWeightBold}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No Data Available
                </TableCell>
              </TableRow>
            ) : (
              sortedOrders.map((tiffin) => (
                <Row key={tiffin._id} tiffin={tiffin} />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
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
        content={
          actionType === "approve"
            ? "Are you sure you want to approve this tiffin?"
            : "Are you sure you want to delete this tiffin?"
        }
        actionType={actionType}
        onClose={closeDialog}
        onConfirm={actionType === "reject" ? handleCancelTiffin : closeDialog}
      />
    </Paper>
  );
}
