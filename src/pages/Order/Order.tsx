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
  cancelOrders,
  confirmOrders,
  getAllOrders,
  searchOrders,
} from "../../services/Retailer";
import { OrderValue } from "../../services/Retailer/Retailer.types";
import { Cancel, CheckCircle } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  TablePagination,
  InputAdornment,
  Button,
} from "@mui/material";
import { ArrowDownward,
  ArrowUpward,Visibility, VisibilityOff } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { formatDate } from "../../utils/formatDate";
import { buttonStyles, getStatusBadgeStyle, styles } from "./Order.styles";
import { useSnackbar } from "../../hook";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

export default function Order() {
  const [page, setPage] = useState(0); // Current page
  const [orders, setOrders] = useState<OrderValue[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const [confirmOpenDialog, setConfirmOpenDialog] = useState(false); //confirmation dialog
  const [selectedOrder, setSelectedOrder] = useState<OrderValue | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(
    null
  );
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });
  const limit = rowsPerPage; // Set limit to 2 items per page
  const { showSnackbar } = useSnackbar();

  const fetchOrders = async (
    page: number,
    limit: number,
    status: string | null = null
  ) => {
    try {
      const { data, totalItems, totalPages } = status
        ? await getAllOrders(page + 1, limit, status)
        : await getAllOrders(page + 1, limit);
      console.log(statusFilter, data);
      setOrders(data || []);
      setTotalItems(totalItems);
      setTotalPages(totalPages);
    } catch (error) {
      showSnackbar("Error fetching orders", "error");
      setOrders([]);
    }
  };
  // Search orders
  const searchOrder = async (
    query: string = "",
    page: number = 0,
    limit: number = 2
  ) => {
    try {
      const { data, totalItems, totalPages } = await searchOrders(
        query,
        page + 1,
        limit
      );
      setOrders(data || []);
      setTotalItems(totalItems);
      setTotalPages(totalPages);
    } catch (error) {
      showSnackbar("Search error", "error");
      setOrders([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        searchOrder(searchTerm, page, limit);
      } else {
        fetchOrders(page, limit, statusFilter);
      }
    }, 500); 

    return () => clearTimeout(timer); // Cleanup time
  }, [searchTerm, page, limit, statusFilter]);

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
  useEffect(() => {
    if (!searchTerm) {
      setOrders([]); // Clear the orders when there's no search term
    }
  }, [searchTerm]);
  const openOrderDetails = (order: OrderValue) => {
    setSelectedOrder(order);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedOrder(null);
  };
  const closeDialogConfirm = () => {
    setConfirmOpenDialog(false);
    setSelectedOrder(null);
  };
  const handleApprove = async (orderId: string) => {
    await confirmOrders(orderId);
    showSnackbar("Order Confirm Sucessfully.", "success");
    await fetchOrders(page, limit);
  };

  const handleReject = async (orderId: string) => {
    await cancelOrders(orderId);
    showSnackbar("Order Rejected Sucessfully.", "success");
    await fetchOrders(page, limit);
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
      return [...orders].sort((a, b) => {
        const aValue =
          sortConfig.key === "cart.customer_contact"
            ? Number(a.cart.customer_contact)
            : sortConfig.key === "cart.total_amount"
            ? Number(a.cart.total_amount)
            : (a[sortConfig.key as keyof OrderValue] || "")
                .toString()
                .toLowerCase();
  
        const bValue =
          sortConfig.key === "cart.customer_contact"
            ? Number(b.cart.customer_contact) // Convert contact number to a number for sorting
            : sortConfig.key === "cart.total_amount"
            ? Number(b.cart.total_amount)
            : (b[sortConfig.key as keyof OrderValue] || "")
                .toString()
                .toLowerCase();
  
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return orders;
  }, [orders, sortConfig]);
  

  const Row = ({ order }: { order: OrderValue }) => {
    const [open, setOpen] = useState(false);

    const handleApproveClick = () => {
      setActionType("approve");
      setSelectedOrder(order);
      setConfirmOpenDialog(true);
    };

    const handleRejectClick = () => {
      setActionType("reject");
      setSelectedOrder(order);
      setConfirmOpenDialog(true);
    };
    const isApproved = order.delivery_status === "delivered";
    const isRejected = order.delivery_status === "cancelled";
    return (
      <>
        <TableRow sx={styles.tableRowStyle}>
          <TableCell sx={styles.tableCellStyleNone}>
            {formatDate(order.created_at)}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            {order.payment_mode}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            {order.cart.total_amount}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            <span
              style={
                getStatusBadgeStyle(order.payment_status) as React.CSSProperties
              }
            >
              {order.payment_status}
            </span>
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            <span
              style={
                getStatusBadgeStyle(
                  order.delivery_status
                ) as React.CSSProperties
              }
            >
              {order.delivery_status}
            </span>
          </TableCell>
          <TableCell sx={styles.tableCellStyleNone}>
            {order.cart.customer_name}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNormal}>
            {order.cart.customer_contact}
          </TableCell>
          <TableCell sx={styles.tableCellStyleNone}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => openOrderDetails(order)}
            >
              {open ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </TableCell>
          <TableCell sx={styles.tableCellStyleNone}>
            <IconButton
              onClick={handleApproveClick}
              // onClick={() => handleApprove(order._id)}
              color="success"
              sx={styles.iconButtonStyle}
              disabled={isApproved || isRejected}
            >
              <CheckCircle />
            </IconButton>
            <IconButton
              onClick={handleRejectClick}
              // onClick={() => handleReject(order._id)}
              color="error"
              sx={styles.iconButtonRejectStyle}
              disabled={isRejected || isApproved}
            >
              <Cancel />
            </IconButton>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <Paper sx={styles.paperStyle}>
      <Box sx={styles.boxStyle}>
      <Box sx={styles.boxStyleButton}>
        <Button
          onClick={() => {
            setStatusFilter("pending");
            setSearchTerm("");
            setPage(0);
            fetchOrders(0, limit, "pending");
          }}
          sx={{
            ...buttonStyles.baseButton,
            ...(statusFilter === "pending"
              ? buttonStyles.activeButton
              : buttonStyles.defaultButton),
          }}
          variant="outlined"
        >
          Pending
        </Button>
        <Button
          onClick={() => {
            setStatusFilter("cancelled");
            setSearchTerm("");
            setPage(0);
            fetchOrders(0, limit, "cancelled");
          }}
          sx={{
            ...buttonStyles.baseButton,
            ...(statusFilter === "cancelled"
              ? buttonStyles.activeButton
              : buttonStyles.defaultButton),
          }}
          variant="outlined"
        >
          Cancelled
        </Button>
        <Button
          onClick={() => {
            setStatusFilter("delivered");
            setSearchTerm("");
            setPage(0);
            fetchOrders(0, limit, "delivered");
          }}
          sx={{
            ...buttonStyles.baseButton,
            ...(statusFilter === "delivered"
              ? buttonStyles.activeButton
              : buttonStyles.defaultButton),
          }}
          variant="outlined"
        >
          Delivered
        </Button>
        <Button
          onClick={() => {
            setStatusFilter(null);
            setPage(0);
            fetchOrders(0, limit);
          }}
          sx={{
            ...buttonStyles.baseButton,
            ...(statusFilter === null
              ? buttonStyles.activeButton
              : buttonStyles.defaultButton),
          }}
          variant="outlined"
        >
          All Orders
        </Button>
        </Box>
        <Box sx={styles.boxStyleSearch}>
        <TextField
          fullWidth
          label="Search by Names & Type"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ width: "auto" }}
          onFocus={() => {
            if (statusFilter !== null) {
              setStatusFilter(null); // Switch to All Orders tab
              setPage(0);
              fetchOrders(0, limit);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      </Box>
      <TableContainer sx={{ maxHeight: 800 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead sx={styles.background}>
            <TableRow>
              <TableCell onClick={() => handleSort("created_at")} sx={styles.fontWeightBold}>Date{sortConfig.key === "created_at" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}</TableCell>
              <TableCell onClick={() => handleSort("payment_mode")} sx={styles.tableCellStyleFont}>Payment Mode{sortConfig.key === "payment_mode" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}</TableCell>
              <TableCell onClick={() => handleSort("cart.total_amount")} sx={styles.tableCellStyleFont}>Total Amount{sortConfig.key === "cart.total_amount" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}</TableCell>
              <TableCell onClick={() => handleSort("payment_status")} sx={styles.tableCellStyleFont}>Payment Status{sortConfig.key === "payment_status" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}</TableCell>
              <TableCell onClick={() => handleSort("delivery_status")} sx={styles.tableCellStyleFont}>Delivery Status{sortConfig.key === "delivery_status" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}</TableCell>
              <TableCell onClick={() => handleSort("cart.customer_name")} sx={styles.fontWeightBold}>
                Customer Name{sortConfig.key === "cart.customer_name" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell onClick={() => handleSort("cart.customer_contact")} sx={styles.tableCellStyleFont}>
                Contact Details{sortConfig.key === "cart.customer_contact" &&
                  (sortConfig.direction === "asc" ? (
                    <ArrowUpward sx={styles.arraowIconSize} />
                  ) : (
                    <ArrowDownward sx={styles.arraowIconSize} />
                  ))}
              </TableCell>
              <TableCell sx={styles.fontWeightBold}>View Items</TableCell>
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
              sortedOrders.map((order) => <Row key={order._id} order={order} />)
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
      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Items in Cart</DialogTitle>
        <DialogContent>
          <Table size="small" aria-label="items">
            <TableHead sx={styles.background}>
              <TableRow>
                <TableCell sx={styles.fontWeightBold}>Tiffin Name</TableCell>
                <TableCell align="right" sx={styles.fontWeightBold}>
                  Quantity
                </TableCell>
                <TableCell align="right" sx={styles.tableCellStyleFont}>
                  Type
                </TableCell>
                <TableCell align="right" sx={styles.fontWeightBold}>
                  Price
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOrder?.cart.items.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.tiffin_name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right" sx={styles.tableCellStyleNormal}>
                    {item.tiffin_type}
                  </TableCell>
                  <TableCell align="right">{item.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
      <ConfirmationDialog
        open={confirmOpenDialog}
        title={actionType === "approve" ? "Approve Order" : "Reject Order"}
        content={
          actionType === "approve"
            ? "Are you sure you want to approve this order?"
            : "Are you sure you want to reject this order?"
        }
        actionType={actionType}
        onClose={closeDialogConfirm}
        onConfirm={
          actionType === "approve"
            ? () => handleApprove(selectedOrder?._id!)
            : () => handleReject(selectedOrder?._id!)
        }
      />
    </Paper>
  );
}
