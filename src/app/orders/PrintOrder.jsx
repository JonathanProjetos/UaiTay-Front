import { useContext } from 'react'
import ButtonBase from '@mui/material/ButtonBase';
import PrintIcon from '@mui/icons-material/Print';
import context from '@/context/Context';
import { escapeHtml, formatCurrency, groupProducts } from '@/util/orderHelpers';

function PrintOrder({ orderData }) {
  const {
    priceWithDiscount,
    totalDiscounts,
    checkedDiscount,
    discountPercent
  } = useContext(context)

  const {
    customer,
    phone,
    address,
    district,
    city,
    number,
    payment,
    complement,
    date,
    hours,
    order,
    total,
    checkedDiscount: orderCheckedDiscount,
    discountPercent: orderDiscountPercent,
    totalDiscounts: orderTotalDiscounts,
    priceWithDiscount: orderPriceWithDiscount,
  } = orderData

  const hasDiscount = checkedDiscount || orderCheckedDiscount;
  const resolvedDiscountPercent = hasDiscount ? (discountPercent || orderDiscountPercent || 0) : 0;
  const resolvedDiscounts = hasDiscount ? (totalDiscounts || orderTotalDiscounts || 0) : 0;
  const resolvedTotal = hasDiscount ? (priceWithDiscount || orderPriceWithDiscount || total) : total;

  const generateReceiptHTML = () => {
    return `
      <html>
        <head>
          <title>Conteúdo para Impressão</title>
        </head>
        <body style="margin: 0; font-size: 12px; font-family: Arial, sans-serif;">
          <div>-------- UaiTay Comida Chinesa --------</div><br>
          <div>---------------------------------------</div>
          <div>CNPJ: 40.429.040/0001-78</div><br>
          <div>Endereço: Rua 42 N°358</div><br>
          <div>Bairro: Tropical</div><br>
          <div>Cidade: Contagem</div><br>
          <div>Cep: 32072440</div><br>
          <div>Telefone: (31) 9 9985-6780</div><br>
          <div>Data: ${escapeHtml(date)}</div><br>
          <div>Hora: ${escapeHtml(hours)}</div>
          <div>---------------------------------------</div><br>
          <div>--------Dados do Cliente---------</div><br>
          <div>Nome: ${escapeHtml(customer)}</div><br>
          <div>Telefone: ${escapeHtml(phone)}</div><br>
          <div>Endereço: ${escapeHtml(address)}</div><br>
          <div>Número: ${escapeHtml(number)}</div><br>
          <div>Bairro: ${escapeHtml(district)}</div><br>
          <div>Cidade: ${escapeHtml(city)}</div><br>
          <div>Complemento: ${escapeHtml(complement)}</div><br>
          <div>Forma de pagamento: ${escapeHtml(payment)}</div><br>
          <div>--------Descrição do pedido---------</div><br>
          ${order && order.length > 0 ? groupProducts(order).map((data) => `
            <div>${data.count}X - ${escapeHtml(data.name)} </div><br>
            <div>Valor total: R$: ${formatCurrency(data.totalPrice)}</div><br>
          `).join('') : '<div>Nenhum item no pedido.</div><br>'}
          <div>---------------------------------------</div><br>
          ${hasDiscount ? `
            <div>Soma dos produtos: R$: ${formatCurrency(total)}</div><br>
            <div>Desconto: ${escapeHtml(resolvedDiscountPercent)}%.</div><br>
            <div>Valor descontado: R$: ${formatCurrency(resolvedDiscounts)}</div><br>
            <div>Total: R$: ${formatCurrency(resolvedTotal)}</div><br>
          ` : `
            <div>Soma dos produtos: R$: ${formatCurrency(total)}</div><br>
            <div>Desconto: 0%.</div><br>
            <div>Valor descontado: R$: 00,00</div><br>
            <div>Total: R$: ${formatCurrency(total)}</div><br>
          `}
          <div>---------------------------------------</div><br>
          <div>Este é um cupom para simples conferência e não possui valor legal.</div><br>
          <div>---------------------------------------</div><br>
          <div>Obrigado pela preferência.</div>
        </body>
      </html>
    `;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'width=400');
    if (!printWindow) return alert('Não foi possível abrir a janela de impressão.');
    printWindow.document.open();
    printWindow.document.write(generateReceiptHTML());
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      <ButtonBase 
        size="small"
        sx={{
          backgroundColor: '#1976d2',
          color: '#fff',
          fontWeight: 'bold',
          padding: '10px',
          borderRadius: '5px',
          '&:hover': {
            backgroundColor: '#115293',
          },
        }}
        aria-label="Imprimir recibo"
        onClick={handlePrint}
      >
        <PrintIcon />
      </ButtonBase>
    </div>
  ) 
}

export default PrintOrder
