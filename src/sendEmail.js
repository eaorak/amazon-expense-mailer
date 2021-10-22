const sendInvoice = require('./email')

const invoicePath = process.argv[2]
if (!invoicePath) {
  console.log('No invoice path specified!')
  return
}

if (process.argv[2] === '-h') {
  console.log('Usage:')
  console.log('<script> invoice/path "Mail body" "Subject"')
  console.log('')
  console.log('Only inovice path is mandatory.')
  return
}

const content = process.argv[3] || 'Thanks.'
const subject = process.argv[4] || 'Expense invoice'

console.log('Sending mail...')
console.log('  Path: ', invoicePath)
console.log('  Content: ', content)
console.log('  Subject: ', subject)

sendInvoice([invoicePath], subject, content)