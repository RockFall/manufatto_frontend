const httpStatus = {
  100: 'Continuar',
  101: 'Mudando protocolos',
  102: 'Processamento',
  122: 'Pedido-URI muito longo',
  200: 'OK',
  201: 'Criado',
  202: 'Aceito',
  203: 'Não-autorizado',
  204: 'Nenhum conteúdo',
  205: 'Reset',
  206: 'Conteúdo parcial',
  207: 'Status Multi',
  300: 'Múltipla escolha',
  301: 'Movido',
  302: 'Encontrado',
  303: 'Consulte Outros',
  304: 'Não modificado',
  305: 'Use Proxy',
  306: 'Proxy Switch',
  307: 'Redirecionamento temporário',
  308: 'Redirecionamento permanente',
  400: 'Requisição inválida',
  401: 'Não autorizado',
  402: 'Pagamento necessário',
  403: 'Proibido',
  404: 'Não encontrado',
  405: 'Método não permitido',
  406: 'Não Aceitável',
  407: 'Autenticação de proxy necessária',
  408: 'Timeout',
  409: 'Conflito geral',
  410: 'Gone',
  411: 'comprimento necessário',
  412: 'Pré-condição falhou',
  413: 'Entidade de solicitação muito grande',
  414: 'Pedido-URI Too Long',
  415: 'Tipo de mídia não suportado',
  416: 'Solicitada de Faixa Não Satisfatória',
  417: 'Falha na expectativa',
  418: 'Eu sou um bule de chá',
  422: 'Entidade improcessável',
  423: 'Fechado',
  424: 'Falha de Dependência',
  425: 'coleção não ordenada',
  426: 'Upgrade Obrigatório',
  429: 'Pedidos em excesso',
  450: 'Bloqueados pelo Controle de Pais',
  499: 'cliente fechou Pedido',
  500: 'Erro interno do servidor',
  501: 'Não implementado',
  502: 'Bad Gateway',
  503: 'Serviço indisponível',
  504: 'Gateway Timeout',
  505: 'Versão HTTP não suportada',
  525: 'Handshake SSL falhou'
}

/**
 * Shorten number to thousands, millions, billions, etc.
 *
 * @param {number} num Number to shorten.
 * @param {number} [digits=2] The number of digits to appear after the decimal point.
 * @returns {string|number}
 *
 * @example
 * // returns '12.5k'
 * shortenLargeNumber(12543, 1)
 *
 * @example
 * // returns '-13k'
 * shortenLargeNumber(-12567)
 *
 * @example
 * // returns '51M'
 * shortenLargeNumber(51000000)
 *
 * @example
 * // returns 651
 * shortenLargeNumber(651)
 *
 * @example
 * // returns 0.12345
 * shortenLargeNumber(0.12345)
 */
function shortenLargeNumber(num: number, isCurrency: boolean = false, digits: number = 2): string {
  const units = ['k', 'M', 'B', 'T', 'Q', 'QQ', 'S', 'Y']
  let decimal: number
  let formatted = JSON.parse(JSON.stringify(num))

  for (let i = units.length - 1; i >= 0; i--) {
    decimal = Math.pow(1000, i + 1)

    if (formatted <= -decimal || formatted >= decimal) {
      formatted = +(formatted / decimal).toFixed(digits) + units[i]

      if (!isCurrency) return formatted as string
      return `R$ ${formatted}`
    }
  }

  if (!isCurrency) return formatted as string
  return `R$ ${formatted}`
}


export function formatMoney(value: any, asCents = true) {
  const realValue = (asCents && value / 100) || value
  return parseFloat(realValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function formatMoneyMin(value: any) {
  return shortenLargeNumber(parseFloat(value), true)
}

export function formatValue(value: any) {
  return parseFloat(value).toLocaleString('pt-BR', {})
}

export function formatValueMin(value: any) {
  return shortenLargeNumber(parseFloat(value), false)
}

export function formatHTTPStatus(code: number): string {
  if (!Object.keys(httpStatus).includes(code.toString())) return `${code} - Desconhecido`
  return `${code} - ${httpStatus[code]}`
}
