"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
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
  if (typeof item?._id === 'string') return item._id;
  if (item?._id?.$oid) return item._id.$oid;
  return fallback;
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

  const  router = useRouter();
  const orders = useMemo(() => (Array.isArray(data) ? data : []), [data]);

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

  const handleFilterChange = (field) => (event) => {
    setFilters((currentFilters) => ({
      ...currentFilters,
      [field]: event.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      date: '',
      customer: '',
      phone: '',
      orderNumber: '',
    });
  };

  return (
    <Box>
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
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            width: '90vw',
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
        }}
      >
      {
        orders.length > 0 && filteredOrders.length > 0? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              alignItems: 'center',
              width: '90vw',
            }}
          >
            {
              filteredOrders.map(({ item, originalIndex }) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: '10px',
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
    </Box>
  )
}

export default ListOrders
