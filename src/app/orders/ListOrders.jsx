"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import TablePagination from '@mui/material/TablePagination'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ButtonBase from '@mui/material/ButtonBase';
import { requestOrders } from '../../api/request'
import CardOrder from './CardOrder'

const normalizeText = (value) => String(value || '').trim().toLowerCase();
const normalizePhone = (value) => String(value || '').replace(/\D/g, '');

const getPhoneVariants = (value) => {
  const digits = normalizePhone(value);
  const variants = new Set([digits]);

  if (digits.startsWith('55') && digits.length > 11) {
    variants.add(digits.slice(2));
  }

  variants.add(digits.replace(/^0+/, ''));

  Array.from(variants).forEach((variant) => {
    if (variant.startsWith('55') && variant.length > 11) {
      variants.add(variant.slice(2));
    }

    if (variant.length === 11 && variant[2] === '9') {
      variants.add(`${variant.slice(0, 2)}${variant.slice(3)}`);
    }
  });

  return Array.from(variants).filter(Boolean);
};

const phoneMatches = (phone, filter) => {
  const filterVariants = getPhoneVariants(filter);
  if (filterVariants.length === 0) return true;

  const phoneVariants = getPhoneVariants(phone);

  return phoneVariants.some((phoneValue) => (
    filterVariants.some((filterValue) => (
      phoneValue.includes(filterValue) || filterValue.includes(phoneValue)
    ))
  ));
};

const getOrderKey = (item, fallback) => {
  const id = typeof item?._id === 'string' ? item._id : item?._id?.$oid;
  return `${id || 'pedido'}-${fallback}`;
};

const normalizeDate = (value) => {
  if (!value) return '';

  const date = String(value);
  const isoDate = date.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoDate) return `${isoDate[1]}${isoDate[2]}${isoDate[3]}`;

  const brazilianDate = date.match(/^(\d{2})[-/](\d{2})[-/](\d{4})/);
  if (brazilianDate) return `${brazilianDate[3]}${brazilianDate[2]}${brazilianDate[1]}`;

  return date.replace(/\D/g, '');
};

function ListOrders() {
  const [data, setData] = useState([])
  const [filters, setFilters] = useState({
    date: '',
    customer: '',
    phone: '',
    orderNumber: '',
  })
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const  router = useRouter();
  const orders = useMemo(() => (Array.isArray(data) ? data : []), [data]);
  const selectedRowsPerPage = Number(rowsPerPage);

  const getAllOrders = async () => {
    const response = await requestOrders()
    setData(response)
  }

  useEffect(() => {
    getAllOrders()
  },[])

  const ordersWithNumber = useMemo(() => (
    orders.map((item, index) => ({
      item,
      originalIndex: index,
      orderNumber: String(index + 1),
    }))
  ), [orders]);

  const filteredOrders = useMemo(() => {
    const dateFilter = normalizeDate(filters.date);
    const customerFilter = normalizeText(filters.customer);
    const orderNumberFilter = normalizeText(filters.orderNumber);

    return ordersWithNumber.filter(({ item, orderNumber }) => {
      const matchesDate = !dateFilter || normalizeDate(item.date) === dateFilter;
      const matchesCustomer = !customerFilter || normalizeText(item.customer).includes(customerFilter);
      const matchesPhone = phoneMatches(item.phone, filters.phone);
      const matchesOrderNumber = !orderNumberFilter || orderNumber.includes(orderNumberFilter);

      return matchesDate && matchesCustomer && matchesPhone && matchesOrderNumber;
    });
  }, [filters, ordersWithNumber]);

  const paginatedOrders = useMemo(() => {
    const startIndex = page * selectedRowsPerPage;
    return filteredOrders.slice(startIndex, startIndex + selectedRowsPerPage);
  }, [filteredOrders, page, selectedRowsPerPage]);

  useEffect(() => {
    const lastPage = Math.max(0, Math.ceil(filteredOrders.length / selectedRowsPerPage) - 1);

    if (page > lastPage) {
      setPage(lastPage);
    }
  }, [filteredOrders.length, page, selectedRowsPerPage]);

  const handleFilterChange = (field) => (event) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: event.target.value,
    }));
    setPage(0);
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      customer: '',
      phone: '',
      orderNumber: '',
    });
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setPage(0);
  };

  return (
    <Box sx={{ paddingBottom: '80px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          height: '8vh',
          alignItems: 'center',
          color: 'white',
          backgroundColor: '#1976d2',
          marginBottom: '2vh',
        }}
      >
        <Typography 
          sx={{
            fontWeight: 'bold',
            fontSize: '4vh',
          }}
        >
          Lista de pedidos
        </Typography>
        <ButtonBase
          onClick={() => router.push('/')}
        >
          <ExitToAppIcon
            sx={{
            fontSize: '4vh',
            }} 
          />
        </ButtonBase>
        </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '2vh',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            marginTop: '30px',
            marginBottom: '30px',
            //width: '90vw',
          }}
        >
          <TextField
            label="Data"
            type="date"
            size="small"
            value={filters.date}
            onChange={handleFilterChange('date')}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Nome do cliente"
            size="small"
            value={filters.customer}
            onChange={handleFilterChange('customer')}
          />
          <TextField
            label="Telefone"
            size="small"
            value={filters.phone}
            onChange={handleFilterChange('phone')}
          />
          <TextField
            label="Numero do pedido"
            size="small"
            value={filters.orderNumber}
            onChange={handleFilterChange('orderNumber')}
          />
          <Button variant="outlined" onClick={clearFilters}>
            Limpar filtros
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
      {
        orders.length > 0 && filteredOrders.length > 0? (
          <Box
            key={`orders-page-${page}-${selectedRowsPerPage}-${filteredOrders.length}`}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 2,
              width: '100%',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {
              paginatedOrders.map(({ item, originalIndex }) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }} 
                    key={getOrderKey(item, originalIndex)}
                >
                  <CardOrder data={item} index={originalIndex} />
                </Box>
              ))
            }
          </Box>
        ) : (
          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '4vh',
              color:'black',
              fontWeight: 'bold',
              height: '80vh',
            }}
          >
            Nenhum pedido encontrado ...
          </Typography>
        )
      }
       
      </Box>
      {orders.length > 0 && (
        <Box
          sx={{
            position: 'fixed',
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10,
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            backgroundColor:'#1976d2',
            color: 'white',
            boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.18)',
          }}
        >
          <TablePagination
            sx={{
              color: 'white',
              width: '100%',
              '& .MuiTablePagination-toolbar': {
                position: 'relative',
                minHeight: '64px',
                paddingLeft: '24px',
                paddingRight: '24px',
              },
              '& .MuiTablePagination-spacer': {
                display: 'none',
              },
              '& .MuiTablePagination-selectLabel': {
                margin: 0,
              },
              '& .MuiTablePagination-input': {
                marginRight: 'auto',
              },
              '& .MuiTablePagination-displayedRows': {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-120%)',
                margin: 0,
              },
              '& .MuiTablePagination-actions': {
                position: 'absolute',
                left: '50%',
                transform: 'translateX(15%)',
                marginLeft: 0,
              },
              '& .MuiSvgIcon-root': {
                color: 'white',
              },
            }}
            component="div"
            count={filteredOrders.length}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            labelRowsPerPage="Itens por pagina"
            labelDisplayedRows={({ count, page }) => (
              `Pagina ${page + 1} de ${Math.max(1, Math.ceil(count / selectedRowsPerPage))}`
            )}
          />
        </Box>
      )}
    </Box>
  )
}

export default ListOrders
