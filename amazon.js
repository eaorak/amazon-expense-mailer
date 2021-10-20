/**
 * Login to Amazon store, go to orders, download last summary and email to list of recipients.
 * Hard work :)
 */
const puppeteer = require('puppeteer')
const dotenv = require('dotenv')
const sendInvoice = require('./email')

const AMAZON_STORE = 'https://www.amazon.co.uk'
const INVOICE_PATH = './invoice.pdf'
const PUPPETEER_CONFIG = {headless: true}

try {
  (async () => {
    dotenv.config()
    const browser = await puppeteer.launch(PUPPETEER_CONFIG)
    const page = await browser.newPage()
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto(AMAZON_STORE)
    try {
      await page.click('#sp-cc-accept')
    } catch (err) {}
    
    console.log(`Logging in to Amazon with '${process.env.AMAZON_EMAIL}'...`)
    // Login
    await page.click('#nav-link-accountList')
    // email
    await page.waitForSelector('#ap_email')
    await page.type('#ap_email', process.env.AMAZON_EMAIL)
    await page.click('#continue')
    // password
    await page.waitForSelector('#ap_password')
    await page.type('#ap_password', process.env.AMAZON_PASSWORD)
    await page.click('#signInSubmit')
    
    console.log('Navigating to account...')
    // Account
    await page.waitForSelector('#nav-link-accountList')
    await page.click('#nav-link-accountList')

    // orders
    console.log('Navigating to orders...')
    await page.waitForSelector('a[href*="order-history"]')
    await page.click('a[href*="order-history"]')
    
    // Click Invoice
    await page.waitForTimeout(5000);
    await page.waitForXPath("//*[contains(text(),'Invoice')]")
    const invoices = await page.$x("//*[contains(text(),'Invoice')]")
    await invoices[0].click() 
    
    // Click Order Summary
    console.log('Waiting for Invoices...')
    await page.waitForTimeout(5000);
    await page.waitForSelector('#a-popover-content-1 > ul > li:nth-child(1) > span > a')
    await page.click('#a-popover-content-1 > ul > li:nth-child(1) > span > a')
    
    console.log(`Saving invoice to ${INVOICE_PATH}...`)
    await page.waitForXPath("//*[contains(text(),'Final Details for Order')]")
    await page.pdf({ path: INVOICE_PATH, format: 'A4' });
    
    await browser.close()
    
    // Sending invoice
    console.log('Sending invoice..')
    await sendInvoice([INVOICE_PATH])

  })()
} catch (err) {
  console.error('Error occured: ', err)
}