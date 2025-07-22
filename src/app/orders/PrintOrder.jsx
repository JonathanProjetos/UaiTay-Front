import {useContext} from 'react'
import ButtonBase from '@mui/material/ButtonBase';
import PrintIcon from '@mui/icons-material/Print';
import context from '@/context/Context';

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
  } = orderData

    console.log(priceWithDiscount, "preço com descontos", "PrintOrder");
    console.log(totalDiscounts, "discontos", "PrintOrder");
    console.log(checkedDiscount, "checkbox", "PrintOrder");

  // Função utilitária para formatar valores monetários
  const formatCurrency = (value) => {
    if (typeof value !== 'number') return '00,00';
    return value.toFixed(2).replace('.', ',');
  };

  // Função para gerar o HTML do recibo
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
          <div>Data: ${date || ''}</div><br>
          <div>Hora: ${hours || ''}</div>
          <div>---------------------------------------</div><br>
          <div>--------Dados do Cliente---------</div><br>
          <div>Nome: ${customer || ''}</div><br>
          <div>Telefone: ${phone || ''}</div><br>
          <div>Endereço: ${address || ''}</div><br>
          <div>Número: ${number || ''}</div><br>
          <div>Bairro: ${district || ''}</div><br>
          <div>Cidade: ${city || ''}</div><br>
          <div>Complemento: ${complement || ''}</div><br>
          <div>Forma de pagamento: ${payment || ''}</div><br>
          <div>--------Descrição do pedido---------</div><br>
          ${order && order.length > 0 ? order.map((data) => `
            <div>1X - ${data.name || ''} </div><br>
            <div>Valor: R$: ${formatCurrency(data.price)}</div><br>
          `).join('') : '<div>Nenhum item no pedido.</div><br>'}
          <div>---------------------------------------</div><br>
          ${checkedDiscount ? `
            <div>Soma dos produtos: R$: ${formatCurrency(total)}</div><br>
            <div>Desconto: ${discountPercent ? discountPercent : '0'}%.</div><br>
            <div>Valor descontado: R$: ${formatCurrency(totalDiscounts)}</div><br>
            <div>Total: R$: ${formatCurrency(priceWithDiscount)}</div><br>
          ` : `
            <div>Soma dos produtos: R$: ${formatCurrency(total)}</div><br>
            <div>Desconto: ${discountPercent ? discountPercent : '0'}%.</div><br>
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