"use client";

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ButtonPrintOrder from './PrintOrder';
import OrderDetailsModal from './OrderDetailsModal';
import { formatCurrency, formatOrderDate, getOrderFinalTotal } from '@/util/orderHelpers';

function CardOrder({ data, index }) {
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const { date, hours } = data
  const formattedDate = formatOrderDate(date);
  const formattedTotal = formatCurrency(getOrderFinalTotal(data));

  return (
      <Card sx={{ maxWidth: 300 }}>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {data?.customer || 'Cliente sem nome'}
          </Typography>
          <Typography variant="body2" component="text.secondary">
            {`Pedido N° ${index +1}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Data de entrada: ${formattedDate}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Hora de entrada: ${hours}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Total: R$: ${formattedTotal}`}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Button size="small" onClick={() => setIsDetailsOpen(true)}>Detalhes</Button>
          <ButtonPrintOrder orderData={data} />
        </CardActions>
        <OrderDetailsModal
          orderData={data}
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
        />
      </Card>
  )
}

export default CardOrder
