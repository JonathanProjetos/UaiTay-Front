"use client";

import React, { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { requestOrder } from '@/api/request';
import {
  formatCurrency,
  formatOrderDate,
  getOrderFinalTotal,
  groupProducts,
  normalizeCurrencyValue,
} from '@/util/orderHelpers';

const knownFields = new Set([
  '_id',
  'customer',
  'phone',
  'address',
  'number',
  'district',
  'city',
  'complement',
  'payment',
  'date',
  'hours',
  'order',
  'total',
  'discount',
  'checkedDiscount',
  'discountPercent',
  'totalDiscounts',
  'priceWithDiscount',
  'taxFee',
  'status',
  '__v',
]);

const getOrderId = (id) => {
  if (!id) return '';
  if (typeof id === 'string') return id;
  if (typeof id === 'object' && id.$oid) return id.$oid;
  return String(id);
};

const hasDetailedData = (orderData) => Boolean(
  orderData?.customer
  && Array.isArray(orderData?.order)
);

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return 'Nao informado';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Nao';
  if (Array.isArray(value)) return value.length ? JSON.stringify(value) : 'Nenhum';
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

function DetailLine({ label, value }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 0.5 }}>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="body2" sx={{ textAlign: 'right', fontWeight: 600 }}>
        {formatValue(value)}
      </Typography>
    </Box>
  );
}

function OrderDetailsModal({ orderData, open, onClose }) {
  const [order, setOrder] = useState(orderData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadOrderDetails = async () => {
      setOrder(orderData);

      if (!open || hasDetailedData(orderData) || !orderData?._id) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const response = await requestOrder(getOrderId(orderData._id));

      if (isMounted && response?._id) {
        setOrder(response);
      }

      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadOrderDetails();

    return () => {
      isMounted = false;
    };
  }, [open, orderData]);

  const groupedItems = useMemo(() => groupProducts(order?.order || []), [order?.order]);
  const hasDiscount = Boolean(order?.checkedDiscount || order?.discount === 'Sim');
  const totalWithDiscount = hasDiscount ? order?.priceWithDiscount : order?.total;
  const taxFee = normalizeCurrencyValue(order?.taxFee);
  const extraFields = Object.entries(order || {}).filter(([key]) => !knownFields.has(key));

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Detalhes do pedido
        {order?._id && (
          <Typography variant="body2" color="text.secondary">
            {getOrderId(order._id)}
          </Typography>
        )}
      </DialogTitle>
      <DialogContent dividers>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'grid', gap: 3 }}>
            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Cliente
              </Typography>
              <DetailLine label="Nome" value={order?.customer} />
              <DetailLine label="Telefone" value={order?.phone} />
              <DetailLine label="Endereco" value={order?.address} />
              <DetailLine label="Numero" value={order?.number} />
              <DetailLine label="Bairro" value={order?.district} />
              <DetailLine label="Cidade" value={order?.city} />
              <DetailLine label="Complemento" value={order?.complement} />
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Pedido
              </Typography>
              <DetailLine label="Data" value={formatOrderDate(order?.date)} />
              <DetailLine label="Hora" value={order?.hours} />
              <DetailLine label="Forma de pagamento" value={order?.payment} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, py: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Status
                </Typography>
                <Chip size="small" label={formatValue(order?.status || 'Pedido realizado')} color="primary" />
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Itens
              </Typography>
              {groupedItems.length > 0 ? (
                <List disablePadding>
                  {groupedItems.map((item) => (
                    <ListItem
                      key={item.name}
                      disableGutters
                      secondaryAction={
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          R$: {formatCurrency(item.totalPrice)}
                        </Typography>
                      }
                    >
                      <ListItemText
                        primary={`${item.count}x ${item.name}`}
                        secondary={`Valor unitario: R$: ${formatCurrency(item.price)}`}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Nenhum item no pedido.
                </Typography>
              )}
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Valores
              </Typography>
              <DetailLine label="Soma dos produtos" value={`R$: ${formatCurrency(order?.total)}`} />
              <DetailLine label="Desconto" value={hasDiscount ? `${formatValue(order?.discountPercent || 0)}%` : '0%'} />
              <DetailLine label="Valor descontado" value={`R$: ${formatCurrency(order?.totalDiscounts)}`} />
              <DetailLine label="Subtotal" value={`R$: ${formatCurrency(normalizeCurrencyValue(totalWithDiscount))}`} />
              <DetailLine label="Taxa de entrega" value={`R$: ${formatCurrency(taxFee)}`} />
              <DetailLine label="Total" value={`R$: ${formatCurrency(getOrderFinalTotal(order))}`} />
            </Box>

            {extraFields.length > 0 && (
              <>
                <Divider />
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Outras informacoes
                  </Typography>
                  {extraFields.map(([key, value]) => (
                    <DetailLine key={key} label={key} value={value} />
                  ))}
                </Box>
              </>
            )}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
}

export default OrderDetailsModal;
